'use client';

/**
 * Single passive scroll observer shared by every WebGL frame.
 *
 * The render loop must not read layout every frame (that forces reflow), so the
 * listener writes plain numbers here and `useFrame` only reads them.
 */
export const scrollState = {
  /** Normalised document progress, 0 at the top and 1 at the bottom. */
  progress: 0,
  /** Pixels scrolled. */
  y: 0,
  /** Normalised pointer position, -1..1 on both axes. */
  pointerX: 0,
  pointerY: 0,
};

let subscribers = 0;
let detach: (() => void) | null = null;

function readScroll() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  scrollState.y = window.scrollY;
  scrollState.progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
}

function readPointer(event: PointerEvent) {
  scrollState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
  scrollState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
}

/**
 * Attaches the shared listeners on first use and detaches them when the last
 * consumer unmounts. Returns the teardown for that consumer.
 */
export function observeScroll(): () => void {
  subscribers += 1;

  if (subscribers === 1) {
    readScroll();
    const onScroll = () => readScroll();
    const onResize = () => readScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', readPointer, { passive: true });
    detach = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', readPointer);
    };
  }

  return () => {
    subscribers -= 1;
    if (subscribers === 0 && detach) {
      detach();
      detach = null;
    }
  };
}

export type TrackKey = {
  at: number;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  opacity: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Linearly samples a keyframe track at normalised progress `p`. */
export function sampleTrack(
  track: TrackKey[],
  p: number,
  out: { pos: [number, number, number]; rot: [number, number, number]; scale: number; opacity: number },
) {
  let i = 0;
  while (i < track.length - 2 && p > track[i + 1].at) i += 1;

  const a = track[i];
  const b = track[i + 1] ?? a;
  const span = b.at - a.at;
  const t = span > 0 ? Math.min(1, Math.max(0, (p - a.at) / span)) : 0;
  // Smoothstep keeps the hand-off between keys from reading as a hinge.
  const e = t * t * (3 - 2 * t);

  for (let axis = 0; axis < 3; axis += 1) {
    out.pos[axis] = lerp(a.pos[axis], b.pos[axis], e);
    out.rot[axis] = lerp(a.rot[axis], b.rot[axis], e);
  }
  out.scale = lerp(a.scale, b.scale, e);
  out.opacity = lerp(a.opacity, b.opacity, e);
  return out;
}

/** Frame-rate independent damping. */
export function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
