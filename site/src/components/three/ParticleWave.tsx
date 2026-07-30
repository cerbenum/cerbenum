'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { damp, scrollState } from '@/lib/scroll';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uAmplitude;
  attribute float aScale;
  varying float vFade;
  varying float vRidge;

  void main() {
    vec3 p = position;

    float ridge =
      sin(p.x * 0.34 + uTime * 0.30) * cos(p.z * 0.26 - uTime * 0.21) * 0.85 +
      sin((p.x + p.z) * 0.15 + uTime * 0.17) * 1.25 +
      sin(p.z * 0.52 - uTime * 0.11) * 0.28;

    p.y += ridge * uAmplitude;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (14.0 / max(0.6, -mv.z));

    vRidge = ridge;
    // Fade the far edge of the field into the black so it has no visible border.
    vFade = smoothstep(46.0, 8.0, length(p.xz));
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  varying float vFade;
  varying float vRidge;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float alpha = smoothstep(0.25, 0.02, d);
    float lift = clamp(vRidge * 0.42 + 0.5, 0.0, 1.0);
    vec3 color = mix(uColorLow, uColorHigh, lift);

    gl_FragColor = vec4(color, alpha * uOpacity * vFade * (0.3 + lift * 0.8));
  }
`;

type Props = { reducedMotion: boolean; density: number };

export function ParticleWave({ reducedMotion, density }: Props) {
  const points = useRef<THREE.Points>(null);
  const time = useRef(0);
  const targetOpacity = useRef(0);

  const { geometry, uniforms } = useMemo(() => {
    const cols = Math.round(150 * density);
    const rows = Math.round(96 * density);
    const spreadX = 78;
    const spreadZ = 52;

    const positions = new Float32Array(cols * rows * 3);
    const scales = new Float32Array(cols * rows);

    let i = 0;
    for (let x = 0; x < cols; x += 1) {
      for (let z = 0; z < rows; z += 1) {
        positions[i * 3] = (x / (cols - 1) - 0.5) * spreadX;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z / (rows - 1) - 0.5) * spreadZ;
        scales[i] = 0.55 + Math.random() * 0.85;
        i += 1;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.computeBoundingSphere();

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 2.6 },
        uAmplitude: { value: 1 },
        uOpacity: { value: 0 },
        uColorLow: { value: new THREE.Color('#4a505b') },
        uColorHigh: { value: new THREE.Color('#dfe4ea') },
      },
    };
  }, [density]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!reducedMotion) time.current += delta;
    uniforms.uTime.value = time.current;

    // Held well under the type so copy always wins the contrast contest.
    targetOpacity.current = 0.5 - scrollState.progress * 0.16;
    uniforms.uOpacity.value = damp(uniforms.uOpacity.value, targetOpacity.current, 1.6, delta);

    if (points.current) {
      points.current.position.y = damp(
        points.current.position.y,
        -7.5 + scrollState.progress * 3.4,
        1.8,
        delta,
      );
      points.current.rotation.y = damp(
        points.current.rotation.y,
        -0.18 + scrollState.progress * 0.5,
        1.4,
        delta,
      );
    }
  });

  return (
    <points ref={points} position={[0, -7.5, -12]} rotation={[0, -0.18, 0]} frustumCulled={false}>
      <primitive object={geometry} attach="geometry" />
      <shaderMaterial
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
