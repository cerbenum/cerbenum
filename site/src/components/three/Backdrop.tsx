'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BackgroundScene = dynamic(() => import('./BackgroundScene'), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

/**
 * Site-wide 3D backdrop.
 *
 * Decorative only: it never takes pointer events, mounts after first paint and
 * is skipped entirely without WebGL — the lit CSS layers below carry the room
 * on their own, so the page never falls back to flat black.
 */
export function Backdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-base" />

      {/* Key light above the fold, so the first screen reads as a lit room. */}
      <div className="animate-drift absolute -top-[38%] left-1/2 h-[85vmax] w-[85vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,231,238,0.16),rgba(14,15,19,0)_58%)] blur-3xl" />
      {/* Cool fill from the right. */}
      <div className="absolute -right-[18%] top-[18%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(circle,rgba(160,170,185,0.13),rgba(14,15,19,0)_62%)] blur-3xl" />
      {/* Floor bounce. */}
      <div className="absolute -bottom-[28%] left-[-12%] h-[58vmax] w-[58vmax] rounded-full bg-[radial-gradient(circle,rgba(140,150,166,0.11),rgba(14,15,19,0)_64%)] blur-3xl" />

      {/* Faint engineering grid gives the void a scale reference. */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 5%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 5%, transparent 72%)',
        }}
      />

      {ready ? <BackgroundScene /> : null}

      {/* Gentle edge falloff — deliberately light so nothing crushes to black. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,15,19,0)_52%,rgba(9,10,13,0.55)_100%)]" />
    </div>
  );
}
