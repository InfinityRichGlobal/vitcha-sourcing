import React, { useState, useEffect } from 'react';
import { resolveVideoSrc } from '../utils/mediaStorage';

interface VideoPlayerProps {
  src: string;
  className?: string;
  videoClassName?: string;
  onRemove?: () => void;
  badgeLabel?: string;
  autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className = '',
  videoClassName = '',
  onRemove,
  badgeLabel,
  autoPlay = false,
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    resolveVideoSrc(src)
      .then((realUrl) => {
        if (isMounted) {
          if (realUrl) {
            setResolvedSrc(realUrl);
          } else {
            setHasError(true);
          }
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setResolvedSrc(src);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {isLoading ? (
        <div className="w-full h-full min-h-[140px] bg-slate-900 flex flex-col items-center justify-center text-slate-400 text-xs gap-2 p-3">
          <i className="fa-solid fa-circle-notch fa-spin text-purple-400 text-lg" />
          <span>กำลังโหลดวิดีโอ...</span>
        </div>
      ) : hasError ? (
        <div className="w-full h-full min-h-[140px] bg-slate-900 flex flex-col items-center justify-center text-rose-400 text-xs gap-1.5 p-3">
          <i className="fa-solid fa-triangle-exclamation text-base" />
          <span>ไม่สามารถเปิดคลิปวิดีโอนี้ได้</span>
        </div>
      ) : (
        <video
          src={resolvedSrc}
          controls
          playsInline
          autoPlay={autoPlay}
          preload="metadata"
          className={`w-full h-full object-cover bg-black ${videoClassName}`}
        />
      )}

      {badgeLabel && (
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono pointer-events-none z-10">
          {badgeLabel}
        </div>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center shadow-md active:scale-95 transition-all"
          title="ลบคลิปนี้"
        >
          ×
        </button>
      )}
    </div>
  );
};
