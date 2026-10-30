import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, RotateCcw, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PullToRefresh: React.FC = () => {
  const { refreshCentralData, isMockLoading } = useApp();
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
      if (document.querySelector('dialog[open], [role="dialog"], [data-no-pull-refresh]')) return;
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

  useEffect(() => {
    if (!feedback || !feedback.startsWith('อัปเดต')) return;
    const timer = setTimeout(() => setFeedback(''), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  return <>
    {(distance > 0 || busy || feedback || updateAvailable) && <div data-testid="refresh-feedback" role="status" className={`fixed left-1/2 ${feedback ? 'bottom-6' : 'top-16'} z-[260] flex w-max max-w-[90vw] -translate-x-1/2 items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-xs shadow-lg`}>
      {busy ? <RotateCcw className="h-4 w-4 shrink-0 animate-spin" /> : <ArrowDown className="h-4 w-4 shrink-0" />}
      <span>{busy ? 'กำลังอัปเดตข้อมูล…' : feedback || (distance >= 55 ? 'ปล่อยเพื่อรีเฟรช' : 'ดึงลงเพื่อรีเฟรช')}</span>
      {updateAvailable && <button onClick={() => window.location.reload()}>มีเวอร์ชันใหม่ — โหลดหน้าใหม่</button>}
      {!busy && !distance && <button aria-label="ปิดผลรีเฟรช" onClick={() => { setFeedback(''); setUpdateAvailable(false); }} className="p-2"><X className="h-4 w-4" /></button>}
    </div>}
  </>;
};
