'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

import { observeScroll } from '@/lib/scroll';
import { ChromeMark } from './ChromeMark';
import { NetworkField } from './NetworkField';
import { ParticleWave } from './ParticleWave';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

/** Studio softbox rig built entirely in-scene — no external HDRI to fetch. */
function StudioRig() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#171a20']} />
      <Lightformer
        form="rect"
        intensity={9}
        color="#ffffff"
        position={[0, 5, -7]}
        scale={[14, 5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={5}
        color="#dfe4ea"
        position={[-7, 2, 3]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[11, 7, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.6}
        color="#6f757e"
        position={[7, -1.5, 3]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[11, 7, 1]}
      />
      <Lightformer form="ring" intensity={4} color="#ffffff" position={[3, 3.5, 5]} scale={3.2} />
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#2b2e33"
        position={[0, -6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[14, 14, 1]}
      />
    </Environment>
  );
}

export default function BackgroundScene() {
  const reducedMotion = usePrefersReducedMotion();
  const [density, setDensity] = useState(1);

  useEffect(() => observeScroll(), []);

  useEffect(() => {
    // Coarse pointers and small viewports get a lighter field up front.
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse || window.innerWidth < 768) setDensity(0.55);
  }, []);

  return (
    <Canvas
      className="!fixed inset-0"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 120 }}
      dpr={[1, 1.75]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor
        onDecline={() => setDensity((current) => Math.max(0.4, current - 0.25))}
      />
      <AdaptiveDpr pixelated />

      <fog attach="fog" args={['#0e0f13', 16, 68]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={18} color="#b6bdc7" distance={22} />

      <Suspense fallback={null}>
        <StudioRig />
        <ChromeMark reducedMotion={reducedMotion} />
      </Suspense>

      <NetworkField reducedMotion={reducedMotion} density={density} />
      <ParticleWave reducedMotion={reducedMotion} density={density} />
    </Canvas>
  );
}
