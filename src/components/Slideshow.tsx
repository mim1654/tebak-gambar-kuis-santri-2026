import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

type Props = { count: number; urlFor: (index: number) => string; pdfUrl: string };

// Geser mendatar untuk pindah slide; geser yang dominan vertikal diabaikan (itu menggulir halaman).
function useSwipe(onNext: () => void, onPrev: () => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  return {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.target instanceof Element && event.target.closest('button, a')) return;
      start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    },
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
      const from = start.current;
      start.current = null;
      if (!from || from.id !== event.pointerId) return;
      const dx = event.clientX - from.x;
      const dy = event.clientY - from.y;
      const threshold = Math.max(60, event.currentTarget.clientWidth * 0.06);
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      (dx < 0 ? onNext : onPrev)();
    },
    onPointerCancel: () => { start.current = null; },
  };
}

const exitNative = () => { if (document.fullscreenElement) Promise.resolve(document.exitFullscreen?.()).catch(() => undefined); };

export default function Slideshow({ count, urlFor, pdfUrl }: Props) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const nativeFullscreen = useRef(false);
  const overlay = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);

  const go = useCallback((delta: number) => setIndex((current) => Math.min(count - 1, Math.max(0, current + delta))), [count]);
  const swipe = useSwipe(() => go(1), () => go(-1));
  const alt = `Slide ${index + 1} dari ${count}: Presentasi Hari Santri Nasional`;

  const openFull = () => {
    setFull(true);
    const root = document.documentElement;
    if (!document.fullscreenElement && typeof root.requestFullscreen === 'function') {
      nativeFullscreen.current = true;
      Promise.resolve(root.requestFullscreen()).catch(() => { nativeFullscreen.current = false; });
    }
  };
  const closeFull = useCallback(() => {
    setFull(false);
    if (nativeFullscreen.current) exitNative();
    nativeFullscreen.current = false;
    opener.current?.focus();
  }, []);

  // Muat slide sebelum dan sesudahnya agar tidak berkedip saat digeser.
  useEffect(() => {
    [index - 1, index + 1].forEach((target) => { if (target >= 0 && target < count) new Image().src = urlFor(target); });
  }, [index, count, urlFor]);

  useEffect(() => {
    if (!full) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closer.current?.focus();
    const onFullscreenChange = () => { if (nativeFullscreen.current && !document.fullscreenElement) closeFull(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const buttons = [...(overlay.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])];
        if (buttons.length === 0) return;
        const active = document.activeElement;
        const outside = !overlay.current?.contains(active);
        if (event.shiftKey && (active === buttons[0] || outside)) { event.preventDefault(); buttons[buttons.length - 1].focus(); }
        else if (!event.shiftKey && (active === buttons[buttons.length - 1] || outside)) { event.preventDefault(); buttons[0].focus(); }
        return;
      }
      if ((event.key === ' ' || event.key === 'Enter') && event.target instanceof HTMLButtonElement) return;
      const actions: Record<string, () => void> = {
        ArrowRight: () => go(1), PageDown: () => go(1), ' ': () => go(1),
        ArrowLeft: () => go(-1), PageUp: () => go(-1),
        Home: () => setIndex(0), End: () => setIndex(count - 1), Escape: closeFull,
      };
      const action = actions[event.key];
      if (!action) return;
      event.preventDefault();
      action();
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKey);
    };
  }, [full, count, go, closeFull]);

  useEffect(() => () => { if (nativeFullscreen.current) exitNative(); }, []);

  return (
    <div className="presentation-viewer">
      <div className="slide-frame" {...swipe}><img className="presentation-slide" src={urlFor(index)} alt={alt} draggable={false} /></div>
      <div className="presentation-controls">
        <button className="button secondary" onClick={() => go(-1)} disabled={index === 0}>Sebelumnya</button>
        <p aria-live="polite">Slide {index + 1} dari {count}</p>
        <button className="button secondary" onClick={() => go(1)} disabled={index === count - 1}>Berikutnya</button>
      </div>
      <div className="presentation-actions">
        <button ref={opener} className="button primary" onClick={openFull}>Slide layar penuh</button>
        <a className="button secondary" href={pdfUrl} download="PPT_Hari_Santri_Nasional.pdf">Unduh PDF</a>
      </div>
      <p className="slide-hint">Geser gambar ke kiri atau kanan untuk pindah slide.</p>
      {full && (
        <div ref={overlay} className="slide-overlay" role="dialog" aria-modal="true" aria-label="Presentasi Hari Santri Nasional">
          <div className="slide-stage" {...swipe}>
            <img className="slide-full" src={urlFor(index)} alt={alt} draggable={false} />
            <p className="slide-rotate">Putar layar mendatar agar slide lebih besar.</p>
          </div>
          <div className="slide-bar">
            <button className="slide-btn" onClick={() => go(-1)} disabled={index === 0}>Sebelumnya</button>
            <p aria-live="polite">Slide {index + 1} dari {count}</p>
            <button className="slide-btn" onClick={() => go(1)} disabled={index === count - 1}>Berikutnya</button>
            <button ref={closer} className="slide-btn slide-close" onClick={closeFull}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
