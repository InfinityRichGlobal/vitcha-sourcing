import { useEffect, useRef } from 'react';

let openDialogs = 0;
let originalOverflow = '';
export function useDialog(open: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (openDialogs++ === 0) { originalOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; }
    const container = ref.current;
    const focusables = () => Array.from(container?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled):not([type="file"]), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]') || []).filter(x => x.getClientRects().length > 0);
    focusables()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = focusables();
      const first = elements[0], last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !container?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !container?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    container?.addEventListener('keydown', trap);
    return () => {
      container?.removeEventListener('keydown', trap);
      if (--openDialogs === 0) document.body.style.overflow = originalOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);
  return ref;
}
