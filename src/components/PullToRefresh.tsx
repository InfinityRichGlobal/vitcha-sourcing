import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PullToRefresh: React.FC = () => {
  const { refreshCentralData, lastRefreshedAt, renderStatus, isMockLoading } = useApp();
  const [distance, setDistance] = useState(0);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const running = useRef(false);
  const mounted = useRef(true);
  const pull = useRef({ active: false, startY: 0, distance: 0 });
  const checkController = useRef<AbortController | null>(null);
  const latest = useRef({ refreshCentralData, isMockLoading });
  latest.current = { refreshCentralData, isMockLoading };

  const checkVersion = async () => {
    checkController.current?.abort();
    const controller = new AbortController(); checkController.current = controller;
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const current = document.querySelector('script[src*="assets/index-"]')?.getAttribute('src')?.split('/').pop();
      const response = await fetch('./index.html?_t=' + Date.now(), { cache: 'no-store', signal: controller.signal });
      if (!response.ok) return;
      const next = (await response.text()).match(/assets\/(index-[A-Za-z0-9_-]+\.js)/)?.[1];
      if (mounted.current && current && next && current !== next) setUpdateAvailable(true);
    } catch { /* Checking the build must not prevent refreshing user data. */ }
    finally { clearTimeout(timer); }
  };

  const refresh = async () => {
    if (running.current || latest.current.isMockLoading) return;
    running.current = true; setBusy(true); setFeedback('');
    try {
      const ok = await latest.current.refreshCentralData();
      if (!mounted.current) return;
      setFeedback(ok ? 'อัปเดตข้อมูลสำเร็จ' : 'รีเฟรชไม่สำเร็จ กรุณาตรวจการเชื่อมต่อแล้วลองใหม่');
      if (ok) void checkVersion();
    } catch {
      if (mounted.current) setFeedback('รีเฟรชไม่สำเร็จ กรุณาลองใหม่');
    } finally {
      running.current = false; pull.current = { active: false, startY: 0, distance: 0 };
      if (mounted.current) { setBusy(false); setDistance(0); }
    }
  };
  const refreshRef = useRef(refresh); refreshRef.current = refresh;

  useEffect(() => {
    mounted.current = true;
    const reset = () => { pull.current.active = false; pull.current.distance = 0; setDistance(0); };
    const start = (e: TouchEvent) => {
      reset();
      if (e.touches.length !== 1 || window.scrollY > 5 || running.current || latest.current.isMockLoading) return;
      if (document.querySelector('[role="dialog"], [data-no-pull-refresh]')) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('input, textarea, select, button, a, .leaflet-container')) return;
      pull.current = { active: true, startY: e.touches[0].clientY, distance: 0 };
    };
    const move = (e: TouchEvent) => {
      if (!pull.current.active) return;
      if (e.touches.length !== 1 || window.scrollY > 5) { reset(); return; }
      const diff = e.touches[0].clientY - pull.current.startY;
      const next = diff > 0 ? Math.min(Math.pow(diff, 0.85) * 1.5, 90) : 0;
      pull.current.distance = next; setDistance(next);
      if (next > 0 && e.cancelable) e.preventDefault();
    };
    const end = () => {
      const shouldRefresh = pull.current.active && pull.current.distance >= 55;
      reset(); if (shouldRefresh) void refreshRef.current();
    };
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    window.addEventListener('touchcancel', reset);
    return () => {
      mounted.current = false; checkController.current?.abort();
      window.removeEventListener('touchstart', start); window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end); window.removeEventListener('touchcancel', reset);
    };
  }, []);

  return <>
    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-slate-600" data-testid="refresh-controls">
      <div role="status" aria-live="polite" className="min-w-0">
        <div>{busy ? 'กำลังอัปเดตข้อมูล…' : feedback || (renderStatus === 'connected' ? 'เชื่อมต่อข้อมูลแล้ว' : 'ยังเชื่อมต่อข้อมูลไม่ได้')}</div>
        <div className="text-[11px] text-slate-500">{lastRefreshedAt ? `อัปเดตล่าสุด ${new Date(lastRefreshedAt).toLocaleTimeString('th-TH')}` : 'ยังไม่ได้รับข้อมูลล่าสุด'}</div>
      </div>
      <button type="button" disabled={busy || isMockLoading} onClick={() => void refresh()} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 font-bold disabled:opacity-50">
        <RotateCcw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} />รีเฟรชข้อมูล
      </button>
      {updateAvailable && <button type="button" onClick={() => window.location.reload()} className="text-emerald-700 underline">มีเวอร์ชันใหม่ — โหลดหน้าใหม่</button>}
    </div>
    {distance > 0 && <div role="status" className="pointer-events-none fixed left-1/2 top-14 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs shadow-lg">
      <ArrowDown className="h-4 w-4" />{distance >= 55 ? 'ปล่อยเพื่อรีเฟรช' : 'ดึงลงเพื่อรีเฟรช'}
    </div>}
  </>;
};
