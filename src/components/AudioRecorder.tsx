import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, Trash2, Volume2 } from 'lucide-react';

interface AudioRecorderProps {
  initialAudioUrl?: string;
  onAudioSaved: (audioBase64: string, durationSec: number) => void;
  onAudioDeleted?: () => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  initialAudioUrl,
  onAudioSaved,
  onAudioDeleted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(initialAudioUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioUrl(base64data);
          onAudioSaved(base64data, recordingSeconds);
        };
        // Stop audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งานไมโครโฟนในเบราว์เซอร์');
      console.error('Audio recording error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current || !audioUrl) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const deleteAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setAudioUrl(undefined);
    setIsPlaying(false);
    setRecordingSeconds(0);
    if (onAudioDeleted) onAudioDeleted();
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>บันทึกเสียง Voice Memo (กันลืม)</span>
        </span>
        {isRecording && (
          <span className="flex items-center gap-1.5 text-xs text-red-400 font-mono animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            กำลังอัดเสียง {formatTime(recordingSeconds)}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {!audioUrl ? (
          !isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 active:scale-95 transition-all"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>แตะเพื่อเริ่มอัดเสียง</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-500 active:scale-95 transition-all shadow-md shadow-red-950"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>หยุดและบันทึก</span>
            </button>
          )
        ) : (
          <div className="flex items-center gap-2 w-full bg-slate-950 p-2 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={togglePlayback}
              className="p-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <div className="flex-1 text-xs text-slate-300 font-mono">
              {isPlaying ? 'กำลังเล่นไฟล์เสียง...' : 'ไฟล์เสียงพร้อมเปิดฟัง'}
            </div>
            <audio
              ref={audioPlayerRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
            <button
              type="button"
              onClick={deleteAudio}
              className="p-1 text-slate-400 hover:text-red-400 transition-colors"
              title="ลบไฟล์เสียง"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
