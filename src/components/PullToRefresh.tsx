import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PullToRefresh: React.FC = () => {
  const { refreshCentralData } = useApp();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if at top of page and no modal is open
      if (window.scrollY > 5) return;
      if (document.querySelector('[role="dialog"]')) return;

      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPullingRef.current || isRefreshing) return;
      if (window.scrollY > 5) {
        isPullingRef.current = false;
        setPullDistance(0);
        return;
      }

      const currentY = e.touches[0].clientY;
      const diff = currentY - startYRef.current;

      if (diff > 0) {
        // Apply rubber-band damping
        const damped = Math.min(Math.pow(diff, 0.85) * 1.5, 90);
        setPullDistance(damped);
      } else {
        setPullDistance(0);
      }
    };

    const handleTouchEnd = async () => {
      if (!isPullingRef.current || isRefreshing) return;
      isPullingRef.current = false;

      if (pullDistance >= 55) {
        setIsRefreshing(true);
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate(15);
          } catch {}
        }

        try {
          // 1. Check if newer build exists on server
          const currentBundle = document
            .querySelector('script[src*="assets/index-"]')
            ?.getAttribute('src')
            ?.split('/')
            .pop();

          let needReload = false;
          try {
            const res = await fetch('./index.html?_t=' + Date.now(), { cache: 'no-store' });
            if (res.ok) {
              const html = await res.text();
              const match = html.match(/assets\/(index-[A-Za-z0-9_-]+\.js)/);
              if (match && match[1] && currentBundle && match[1] !== currentBundle) {
                needReload = true;
              }
            }
          } catch {}

          if (needReload) {
            if ('caches' in window) {
              const keys = await caches.keys();
              await Promise.all(keys.map((k) => caches.delete(k)));
            }
            if ('serviceWorker' in navigator) {
              const regs = await navigator.serviceWorker.getRegistrations();
              for (const reg of regs) {
                await reg.update().catch(() => {});
              }
            }
            window.location.reload();
            return;
          }

          // 2. Otherwise refresh central data
          await refreshCentralData();
        } catch {
          // Fallback refresh
          await refreshCentralData();
        } finally {
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
          }, 400);
        }
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, refreshCentralData]);

  if (pullDistance === 0 && !isRefreshing) return null;

  const isTriggered = pullDistance >= 55;

  return (
    <div
      style={{
        transform: `translate(-50%, ${Math.min(pullDistance * 0.8, 65)}px)`,
      }}
      className="fixed top-12 left-1/2 z-50 transition-transform duration-100 ease-out pointer-events-none select-none"
    >
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-300/80 shadow-lg backdrop-blur-md text-slate-800">
        {isRefreshing ? (
          <>
            <RotateCcw className="w-4 h-4 text-emerald-600 animate-spin" />
            <span className="text-xs font-bold text-slate-800">กำลังอัปเดตข้อมูล...</span>
          </>
        ) : isTriggered ? (
          <>
            <RotateCcw className="w-4 h-4 text-emerald-600 rotate-180 transition-transform duration-200" />
            <span className="text-xs font-bold text-emerald-700">ปล่อยเพื่อรีเฟรช</span>
          </>
        ) : (
          <>
            <ArrowDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">ดึงลงเพื่อรีเฟรช</span>
          </>
        )}
      </div>
    </div>
  );
};
