import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Volume2, Plus } from 'lucide-react';
import { getDemoVoiceWavDataUri } from '../utils/audioHelper';
import { VoiceNoteEntry } from '../types';

interface AudioRecorderProps {
  // Multi-clip mode (unlimited voice notes)
  voiceNotes?: VoiceNoteEntry[];
  onVoiceNotesChange?: (notes: VoiceNoteEntry[]) => void;
  // Legacy single-clip callbacks (automatically kept in sync with first clip)
  onAudioSaved?: (base64Audio: string, durationSec: number) => void;
  initialAudioUrl?: string;
  initialDurationSec?: number;
  onAudioDeleted?: () => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  voiceNotes,
  onVoiceNotesChange,
  onAudioSaved,
  initialAudioUrl,
  initialDurationSec,
  onAudioDeleted,
}) => {
  const buildInitialClips = (): VoiceNoteEntry[] => {
    if (Array.isArray(voiceNotes) && voiceNotes.length > 0) {
      return voiceNotes;
    }
    if (initialAudioUrl) {
      return [
        {
          id: 'voice-init-1',
          url: initialAudioUrl,
          durationSec: initialDurationSec || 4,
          label: 'คลิปเสียง #1',
        },
      ];
    }
    return [];
  };

  const [clips, setClips] = useState<VoiceNoteEntry[]>(buildInitialClips);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);
  const [playProgress, setPlayProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef<number>(0);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Sync if parent updates voiceNotes or initialAudioUrl externally
  useEffect(() => {
    if (Array.isArray(voiceNotes)) {
      if (voiceNotes.length > 0) {
        setClips(voiceNotes);
      } else if (initialAudioUrl) {
        setClips([
          {
            id: 'voice-init-1',
            url: initialAudioUrl,
            durationSec: initialDurationSec || 4,
            label: 'คลิปเสียง #1',
          },
        ]);
      } else {
        setClips([]);
      }
    } else if (initialAudioUrl) {
      setClips((prev) =>
        prev.length > 0
          ? prev
          : [
              {
                id: 'voice-init-1',
                url: initialAudioUrl,
                durationSec: initialDurationSec || 4,
                label: 'คลิปเสียง #1',
              },
            ]
      );
    } else {
      setClips([]);
    }
  }, [voiceNotes, initialAudioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const syncWithParent = (nextClips: VoiceNoteEntry[]) => {
    setClips(nextClips);
    if (onVoiceNotesChange) {
      onVoiceNotesChange(nextClips);
    }
    if (nextClips.length > 0) {
      if (onAudioSaved) {
        onAudioSaved(nextClips[0].url, nextClips[0].durationSec);
      }
    } else {
      if (onAudioDeleted) {
        onAudioDeleted();
      }
    }
  };

  const appendClip = (url: string, durationSec: number) => {
    setClips((prev) => {
      const newClip: VoiceNoteEntry = {
        id: `voice-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        url,
        durationSec,
        label: `คลิปเสียง #${prev.length + 1}`,
        createdAt: new Date().toISOString(),
      };
      const next = [...prev, newClip];
      if (onVoiceNotesChange) onVoiceNotesChange(next);
      if (onAudioSaved) onAudioSaved(next[0].url, next[0].durationSec);
      return next;
    });
  };

  const getSupportedMimeType = (): string => {
    if (typeof MediaRecorder === 'undefined') return '';
    const types = [
      'audio/mp4',
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/aac',
    ];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return '';
  };

  const startRecording = async () => {
    try {
      if (audioPlayerRef.current && playingClipId) {
        audioPlayerRef.current.pause();
        setPlayingClipId(null);
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const demoUri = getDemoVoiceWavDataUri(4);
        appendClip(demoUri, 4);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalDuration = Math.max(1, secondsRef.current);
        const actualMime = mediaRecorder.mimeType || mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: actualMime });

        if (audioBlob.size === 0) {
          const fallbackUri = getDemoVoiceWavDataUri(finalDuration);
          appendClip(fallbackUri, finalDuration);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            appendClip(base64data, finalDuration);
          };
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);
      secondsRef.current = 0;

      timerRef.current = window.setInterval(() => {
        secondsRef.current += 1;
        setRecordingSeconds(secondsRef.current);
      }, 1000);
    } catch {
      const demoUri = getDemoVoiceWavDataUri(4);
      appendClip(demoUri, 4);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlayClip = (clip: VoiceNoteEntry) => {
    if (!audioPlayerRef.current) return;

    if (playingClipId === clip.id) {
      audioPlayerRef.current.pause();
      setPlayingClipId(null);
      return;
    }

    audioPlayerRef.current.src = clip.url || getDemoVoiceWavDataUri(4);
    setPlayProgress(0);
    audioPlayerRef.current
      .play()
      .then(() => {
        setPlayingClipId(clip.id);
      })
      .catch(() => {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.src = getDemoVoiceWavDataUri(4);
          audioPlayerRef.current.play();
          setPlayingClipId(clip.id);
        }
      });
  };

  const handleDeleteClip = (clipId: string) => {
    if (playingClipId === clipId && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setPlayingClipId(null);
      setPlayProgress(0);
    }
    const nextClips = clips
      .filter((c) => c.id !== clipId)
      .map((c, idx) => ({
        ...c,
        label: c.label?.startsWith('คลิปเสียง #') ? `คลิปเสียง #${idx + 1}` : c.label,
      }));
    syncWithParent(nextClips);
  };

  const handleRenameClip = (clipId: string, newLabel: string) => {
    const nextClips = clips.map((c) => (c.id === clipId ? { ...c, label: newLabel } : c));
    syncWithParent(nextClips);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-2 w-full">
      {/* Saved Voice Clips List (Unlimited) */}
      {clips.length > 0 && (
        <div className="space-y-1.5">
          {clips.map((clip, idx) => {
            const isThisPlaying = playingClipId === clip.id;
            return (
              <div
                key={clip.id || idx}
                className="bg-white border border-slate-200 rounded-xl p-2 flex items-center justify-between gap-2 shadow-2xs"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => togglePlayClip(clip)}
                    className="w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-xs shrink-0 transition-transform active:scale-95"
                    title={isThisPlaying ? 'หยุดชั่วคราว' : 'เล่นเสียงบันทึก'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3 ml-0.5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-slate-800 mb-0.5">
                      <div className="flex items-center gap-1 min-w-0 flex-1">
                        <Volume2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <input
                          type="text"
                          value={clip.label || `คลิปเสียง #${idx + 1}`}
                          onChange={(e) => handleRenameClip(clip.id, e.target.value)}
                          placeholder={`คลิปเสียง #${idx + 1}`}
                          className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-emerald-500 focus:outline-none text-[11px] font-bold text-slate-800 truncate w-full"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 shrink-0">
                        {formatTime(clip.durationSec || 4)}
                      </span>
                    </div>

                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-150"
                        style={{
                          width: `${isThisPlaying ? Math.max(15, playProgress) : 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteClip(clip.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="ลบคลิปเสียงนี้"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Recording Bar */}
      {isRecording && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center justify-between w-full shadow-2xs animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold text-rose-600">
              กำลังอัดคลิปที่ #{clips.length + 1}...
            </span>
            <span className="text-xs font-mono font-bold text-slate-800">
              {formatTime(recordingSeconds)}
            </span>
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs active:scale-95 transition-all"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>หยุดและบันทึก</span>
          </button>
        </div>
      )}

      {/* Always-Available Add / Record New Voice Clip Button (Unlimited!) */}
      {!isRecording && (
        <button
          type="button"
          onClick={startRecording}
          className={`w-full border border-dashed rounded-xl px-3 py-2 flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-[0.99] ${
            clips.length === 0
              ? 'bg-white border-slate-300 text-emerald-700 hover:bg-emerald-50/50 hover:border-emerald-400'
              : 'bg-emerald-50/60 border-emerald-300 text-emerald-800 hover:bg-emerald-100/70'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            {clips.length === 0 ? (
              <Mic className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </div>
          <span>
            {clips.length === 0
              ? 'แตะเพื่ออัดเสียงพูด (อัดได้ไม่จำกัดจำนวนคลิป)'
              : `+ อัดเสียงเพิ่มอีกคลิป (บันทึกแล้ว ${clips.length} คลิป · ไม่จำกัดจำนวน)`}
          </span>
        </button>
      )}

      <audio
        ref={audioPlayerRef}
        onTimeUpdate={() => {
          if (audioPlayerRef.current && audioPlayerRef.current.duration) {
            setPlayProgress(
              (audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) * 100
            );
          }
        }}
        onEnded={() => {
          setPlayingClipId(null);
          setPlayProgress(0);
        }}
        className="hidden"
      />
    </div>
  );
};
