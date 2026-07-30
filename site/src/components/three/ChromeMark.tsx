'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { chevronGeometry, MARK_LAYERS } from '@/lib/chevron';
import { damp, sampleTrack, scrollState, type TrackKey } from '@/lib/scroll';

/**
 * Path the mark travels as the document scrolls. Positions are in world units
 * at the reference viewport width; `fit` scales them down on narrow screens.
 */
const TRACK: TrackKey[] = [
  // Hero: the mark owns the right half of the first screen.
  { at: 0.0, pos: [1.78, -0.05, 0], rot: [0.14, -0.5, 0.05], scale: 1.42, opacity: 1 },
  { at: 0.07, pos: [2.15, 0.5, -0.7], rot: [0.11, -1.05, 0.02], scale: 1.08, opacity: 0.86 },
  // Then it docks low-right and stays there, clear of the copy and the header.
  { at: 0.2, pos: [2.72, -1.45, -1.5], rot: [0.06, -2.05, -0.02], scale: 0.6, opacity: 0.55 },
  { at: 1.0, pos: [2.78, -1.5, -1.5], rot: [0.05, -7.4, 0], scale: 0.58, opacity: 0.5 },
];

type Props = { reducedMotion: boolean };

export function ChromeMark({ reducedMotion }: Props) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const viewportWidth = useThree((state) => state.viewport.width);

  const geometry = useMemo(() => chevronGeometry(), []);
  const materials = useMemo(
    () =>
      MARK_LAYERS.map(
        (layer) =>
          new THREE.MeshPhysicalMaterial({
            color: '#e9ecf1',
            metalness: 1,
            roughness: layer.roughness,
            envMapIntensity: 2.1,
            clearcoat: 0.6,
            clearcoatRoughness: 0.12,
            transparent: true,
            opacity: 1,
            depthWrite: true,
          }),
      ),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((material) => material.dispose());
    },
    [geometry, materials],
  );

  const sampled = useRef({
    pos: [0, 0, 0] as [number, number, number],
    rot: [0, 0, 0] as [number, number, number],
    scale: 1,
    opacity: 1,
  });

  useFrame((state, rawDelta) => {
    const node = group.current;
    if (!node) return;

    const delta = Math.min(rawDelta, 0.05);
    // Narrow viewports get a tighter orbit so the mark never leaves the frame.
    const fit = THREE.MathUtils.clamp(viewportWidth / 9.5, 0.42, 1);

    const key = sampleTrack(TRACK, reducedMotion ? 0 : scrollState.progress, sampled.current);

    const parallaxX = reducedMotion ? 0 : scrollState.pointerX * 0.22;
    const parallaxY = reducedMotion ? 0 : -scrollState.pointerY * 0.16;

    node.position.x = damp(node.position.x, key.pos[0] * fit + parallaxX, 3.2, delta);
    node.position.y = damp(node.position.y, key.pos[1] * fit + parallaxY, 3.2, delta);
    node.position.z = damp(node.position.z, key.pos[2], 3.2, delta);

    const s = key.scale * fit;
    node.scale.setScalar(damp(node.scale.x, s, 3.6, delta));

    node.rotation.x = damp(node.rotation.x, key.rot[0] + parallaxY * 0.5, 3, delta);
    node.rotation.y = damp(node.rotation.y, key.rot[1] + parallaxX * 0.5, 3, delta);
    node.rotation.z = damp(node.rotation.z, key.rot[2], 3, delta);

    if (spin.current && !reducedMotion) {
      const t = state.clock.elapsedTime;
      spin.current.rotation.y = Math.sin(t * 0.28) * 0.18;
      spin.current.rotation.x = Math.cos(t * 0.22) * 0.1;
      spin.current.position.y = Math.sin(t * 0.5) * 0.045;
    }

    materials.forEach((material) => {
      material.opacity = damp(material.opacity, key.opacity, 3, delta);
    });
  });

  return (
    <group ref={group}>
      <group ref={spin}>
        {MARK_LAYERS.map((layer, index) => (
          <mesh
            key={index}
            geometry={geometry}
            material={materials[index]}
            scale={layer.scale}
            position={layer.offset as unknown as [number, number, number]}
          />
        ))}
      </group>
    </group>
  );
}
