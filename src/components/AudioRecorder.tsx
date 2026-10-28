import React, { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2, Upload, RefreshCw } from "lucide-react";
import { VoiceNoteEntry } from "../types";
import { uploadMediaToServer } from "../services/api";

interface AudioRecorderProps {
  voiceNotes?: VoiceNoteEntry[];
  onVoiceNotesChange?: (notes: VoiceNoteEntry[]) => void;
  onAudioSaved?: (url: string, durationSec: number) => void;
  initialAudioUrl?: string;
  initialDurationSec?: number;
  onAudioDeleted?: () => void;
  onBusyChange?: (busy: boolean) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = (props) => {
  const initial =
    props.voiceNotes ||
    (props.initialAudioUrl
      ? [
          {
            id: "legacy-audio",
            url: props.initialAudioUrl,
            durationSec: props.initialDurationSec || 0,
          },
        ]
      : []);
  const [clips, setClips] = useState<VoiceNoteEntry[]>(initial);
  const clipsRef = useRef(clips);
  const callbacks = useRef(props);
  callbacks.current = props;
  const recorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const startedAt = useRef(0);
  const mounted = useRef(true);
  const busyRef = useRef(false);
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const failed = useRef<{ file: File; duration: number } | null>(null);
  useEffect(() => {
    const next =
      props.voiceNotes ||
      (props.initialAudioUrl
        ? [
            {
              id: "legacy-audio",
              url: props.initialAudioUrl,
              durationSec: props.initialDurationSec || 0,
            },
          ]
        : []);
    clipsRef.current = next;
    setClips(next);
  }, [props.voiceNotes, props.initialAudioUrl, props.initialDurationSec]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearInterval(timer.current);
      if (recorder.current?.state === "recording") recorder.current.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      callbacks.current.onBusyChange?.(false);
    };
  }, []);
  const busy = (value: boolean) => {
    busyRef.current = value;
    callbacks.current.onBusyChange?.(value);
  };
  const sync = (next: VoiceNoteEntry[]) => {
    clipsRef.current = next;
    setClips(next);
    if (callbacks.current.onVoiceNotesChange) {
      callbacks.current.onVoiceNotesChange(next);
      return;
    }
    if (next[0])
      callbacks.current.onAudioSaved?.(next[0].url, next[0].durationSec);
    else callbacks.current.onAudioDeleted?.();
  };
  const upload = async (file: File, duration = 0) => {
    busy(true);
    setUploading(true);
    setError("");
    failed.current = { file, duration };
    try {
      const url = await uploadMediaToServer(file);
      if (!mounted.current) return;
      sync([
        ...clipsRef.current,
        {
          id: crypto.randomUUID(),
          url,
          durationSec: duration,
          label: file.name,
          createdAt: new Date().toISOString(),
        },
      ]);
      failed.current = null;
      busy(false);
    } catch (e) {
      if (mounted.current)
        setError(e instanceof Error ? e.message : "อัปโหลดเสียงไม่สำเร็จ");
    } finally {
      if (mounted.current) setUploading(false);
    }
  };
  const start = async () => {
    if (busyRef.current) return;
    busy(true);
    setError("");
    try {
      if (
        !navigator.mediaDevices?.getUserMedia ||
        typeof MediaRecorder === "undefined"
      )
        throw new Error(
          "เบราว์เซอร์นี้อัดเสียงไม่ได้ กรุณาเลือกอัปโหลดไฟล์เสียง",
        );
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const mime = [
        "audio/mp4",
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg",
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const media = new MediaRecorder(
        stream,
        mime ? { mimeType: mime } : undefined,
      );
      recorder.current = media;
      const chunks: Blob[] = [];
      let recordingFailed = false;
      media.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      media.onstop = () => {
        clearInterval(timer.current);
        stream.getTracks().forEach((track) => track.stop());
        if (!mounted.current) return;
        setRecording(false);
        if (recordingFailed) {
          busy(false);
          return;
        }
        const type = media.mimeType.split(";")[0] || "audio/webm";
        const blob = new Blob(chunks, { type });
        if (!blob.size) {
          setError("ไม่พบเสียงที่บันทึก กรุณาลองอีกครั้ง");
          busy(false);
          return;
        }
        const extension = type.includes("mp4")
          ? "m4a"
          : type.includes("ogg")
            ? "ogg"
            : "webm";
        void upload(
          new File([blob], `เสียงบันทึก-${Date.now()}.${extension}`, { type }),
          Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)),
        );
      };
      media.onerror = () => {
        recordingFailed = true;
        setError("อัดเสียงไม่สำเร็จ กรุณาลองใหม่");
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(timer.current);
        setRecording(false);
        busy(false);
      };
      startedAt.current = Date.now();
      setSeconds(0);
      setRecording(true);
      media.start(250);
      timer.current = setInterval(
        () => setSeconds(Math.round((Date.now() - startedAt.current) / 1000)),
        1000,
      );
    } catch (e) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (mounted.current) {
        setError(e instanceof Error ? e.message : "ไม่ได้รับสิทธิ์ใช้ไมโครโฟน");
        busy(false);
      }
    }
  };
  return (
    <div className="space-y-3">
      {clips.map((clip) => (
        <div
          key={clip.id}
          className="space-y-2 rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="flex items-center gap-2">
            <input
              aria-label="ชื่อคลิปเสียง"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs"
              value={clip.label || ""}
              onChange={(e) =>
                sync(
                  clipsRef.current.map((item) =>
                    item.id === clip.id
                      ? { ...item, label: e.target.value }
                      : item,
                  ),
                )
              }
            />
            <button
              type="button"
              title="ลบคลิปเสียง"
              onClick={() =>
                sync(clipsRef.current.filter((item) => item.id !== clip.id))
              }
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <audio
            controls
            preload="metadata"
            src={clip.url}
            className="h-10 w-full"
          />
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        {recording ? (
          <button
            type="button"
            onClick={() => recorder.current?.stop()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-rose-600 px-3 text-sm text-white"
          >
            <Square size={16} />
            หยุดอัด · {seconds} วินาที
          </button>
        ) : (
          <button
            type="button"
            disabled={busyRef.current}
            onClick={() => void start()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-3 text-sm text-white disabled:opacity-50"
          >
            <Mic size={16} />
            อัดเสียง
          </button>
        )}
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm">
          <Upload size={16} />
          อัปโหลดเสียง
          <input
            type="file"
            accept="audio/*"
            disabled={busyRef.current}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {uploading && (
        <p role="status" className="text-xs text-emerald-700">
          กำลังส่งไฟล์เสียงขึ้นเซิร์ฟเวอร์…
        </p>
      )}
      {error && (
        <div
          role="alert"
          className="rounded-xl bg-rose-50 p-3 text-xs text-rose-800"
        >
          {error}
          {failed.current && (
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                disabled={uploading}
                onClick={() => {
                  const pending = failed.current;
                  if (pending) void upload(pending.file, pending.duration);
                }}
                className="inline-flex min-h-10 items-center gap-1 font-semibold"
              >
                <RefreshCw size={14} />
                ลองส่งอีกครั้ง
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={() => {
                  failed.current = null;
                  setError("");
                  busy(false);
                }}
              >
                ยกเลิกคลิปนี้
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
