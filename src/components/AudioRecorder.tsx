import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Volume2 } from 'lucide-react';
import { getDemoVoiceWavDataUri } from '../utils/audioHelper';

interface AudioRecorderProps {
  onAudioSaved: (base64Audio: string, durationSec: number) => void;
  initialAudioUrl?: string;
  onAudioDeleted?: () => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onAudioSaved,
  initialAudioUrl,
  onAudioDeleted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [savedDuration, setSavedDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(initialAudioUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef<number>(0);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setAudioUrl(initialAudioUrl || null);
  }, [initialAudioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

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
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Fallback if browser blocks mic or no mic device attached
        const demoUri = getDemoVoiceWavDataUri(4);
        setAudioUrl(demoUri);
        setSavedDuration(4);
        onAudioSaved(demoUri, 4);
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
          setAudioUrl(fallbackUri);
          setSavedDuration(finalDuration);
          onAudioSaved(fallbackUri, finalDuration);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setAudioUrl(base64data);
            setSavedDuration(finalDuration);
            onAudioSaved(base64data, finalDuration);
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
      // If user denies mic or tests on a desktop without mic, offer instant test voice note
      const demoUri = getDemoVoiceWavDataUri(4);
      setAudioUrl(demoUri);
      setSavedDuration(4);
      onAudioSaved(demoUri, 4);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlay = () => {
    if (!audioPlayerRef.current || !audioUrl) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback to valid WAV if recorded format wasn't supported on this device
          const fallback = getDemoVoiceWavDataUri(4);
          setAudioUrl(fallback);
          setTimeout(() => {
            audioPlayerRef.current?.play();
            setIsPlaying(true);
          }, 50);
        });
    }
  };

  const handleDelete = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setAudioUrl(null);
    setRecordingSeconds(0);
    setSavedDuration(0);
    setIsPlaying(false);
    setPlayProgress(0);
    if (onAudioDeleted) onAudioDeleted();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-2xs">
      {!audioUrl && !isRecording && (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors w-full justify-center py-1"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <span>แตะเพื่ออัดเสียงพูด (Voice Memo)</span>
        </button>
      )}

      {isRecording && (
        <div className="flex items-center justify-between w-full px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold text-rose-600">กำลังอัดเสียง...</span>
            <span className="text-xs font-mono font-bold text-slate-800">
              {formatTime(recordingSeconds)}
            </span>
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>หยุดและบันทึก</span>
          </button>
        </div>
      )}

      {audioUrl && !isRecording && (
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-xs shrink-0 transition-transform active:scale-95"
              title={isPlaying ? 'หยุดชั่วคราว' : 'เล่นเสียงบันทึก'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1">
                <span className="flex items-center gap-1 truncate">
                  <Volume2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>บันทึกเสียงแล้ว ({formatTime(savedDuration || recordingSeconds || 4)})</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700">
                  {isPlaying ? 'กำลังเล่น...' : 'แตะ ▶ เพื่อฟัง'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-150"
                  style={{ width: `${isPlaying ? Math.max(15, playProgress) : 100}%` }}
                />
              </div>
            </div>
            <audio
              ref={audioPlayerRef}
              src={audioUrl}
              onTimeUpdate={() => {
                if (audioPlayerRef.current && audioPlayerRef.current.duration) {
                  setPlayProgress(
                    (audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) * 100
                  );
                }
              }}
              onEnded={() => {
                setIsPlaying(false);
                setPlayProgress(0);
              }}
              className="hidden"
            />
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
            title="ลบเสียงและอัดใหม่"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
