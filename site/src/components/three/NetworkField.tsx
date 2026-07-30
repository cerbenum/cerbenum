'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { damp, scrollState } from '@/lib/scroll';

/**
 * Shared drift so a node and every line endpoint attached to it resolve to the
 * exact same world position on the GPU. Both shaders must include this verbatim.
 */
const DRIFT = /* glsl */ `
  vec3 drift(vec3 base, float seed, float t) {
    return base + vec3(
      sin(t * 0.21 + seed * 6.2831),
      cos(t * 0.17 + seed * 4.1290),
      sin(t * 0.13 + seed * 7.7710)
    ) * 0.9;
  }
`;

const NODE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  attribute float aScale;
  varying float vSeed;
  ${DRIFT}

  void main() {
    vec3 p = drift(position, aSeed, uTime);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (16.0 / max(0.6, -mv.z));
    vSeed = aSeed;
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float core = smoothstep(0.25, 0.0, d);
    float twinkle = 0.55 + 0.45 * sin(uTime * 1.4 + vSeed * 21.0);
    gl_FragColor = vec4(uColor, core * uOpacity * twinkle);
  }
`;

const LINE_VERTEX = /* glsl */ `
  uniform float uTime;
  attribute float aSeed;
  attribute float aStrength;
  varying float vStrength;
  ${DRIFT}

  void main() {
    vec3 p = drift(position, aSeed, uTime);
    vStrength = aStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const LINE_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  uniform vec3 uColor;
  varying float vStrength;

  void main() {
    gl_FragColor = vec4(uColor, uOpacity * vStrength);
  }
`;

type Props = { reducedMotion: boolean; density: number };

export function NetworkField({ reducedMotion, density }: Props) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);

  const { nodeGeometry, lineGeometry, nodeUniforms, lineUniforms } = useMemo(() => {
    const count = Math.round(130 * density);
    const spread = new THREE.Vector3(34, 15, 16);

    const base: THREE.Vector3[] = [];
    const seeds: number[] = [];
    for (let i = 0; i < count; i += 1) {
      base.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread.x,
          (Math.random() - 0.5) * spread.y,
          (Math.random() - 0.5) * spread.z,
        ),
      );
      seeds.push(Math.random());
    }

    const nodePositions = new Float32Array(count * 3);
    const nodeSeeds = new Float32Array(count);
    const nodeScales = new Float32Array(count);
    base.forEach((v, i) => {
      nodePositions[i * 3] = v.x;
      nodePositions[i * 3 + 1] = v.y;
      nodePositions[i * 3 + 2] = v.z;
      nodeSeeds[i] = seeds[i];
      nodeScales[i] = 0.5 + Math.random() * 1.1;
    });

    const nodes = new THREE.BufferGeometry();
    nodes.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodes.setAttribute('aSeed', new THREE.BufferAttribute(nodeSeeds, 1));
    nodes.setAttribute('aScale', new THREE.BufferAttribute(nodeScales, 1));
    nodes.computeBoundingSphere();

    // Connect each node to its two nearest neighbours, de-duplicated, so the
    // topology is fixed and the GPU can animate it without CPU work per frame.
    const maxDistance = 7.5;
    const edges = new Set<string>();
    for (let i = 0; i < count; i += 1) {
      const ranked = base
        .map((v, j) => ({ j, d: base[i].distanceTo(v) }))
        .filter((entry) => entry.j !== i && entry.d < maxDistance)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      ranked.forEach(({ j }) => {
        edges.add(i < j ? `${i}:${j}` : `${j}:${i}`);
      });
    }

    const edgeList = [...edges].map((key) => key.split(':').map(Number) as [number, number]);
    const linePositions = new Float32Array(edgeList.length * 6);
    const lineSeeds = new Float32Array(edgeList.length * 2);
    const lineStrength = new Float32Array(edgeList.length * 2);

    edgeList.forEach(([a, b], i) => {
      const strength = 1 - base[a].distanceTo(base[b]) / maxDistance;
      linePositions.set([base[a].x, base[a].y, base[a].z], i * 6);
      linePositions.set([base[b].x, base[b].y, base[b].z], i * 6 + 3);
      lineSeeds[i * 2] = seeds[a];
      lineSeeds[i * 2 + 1] = seeds[b];
      lineStrength[i * 2] = strength;
      lineStrength[i * 2 + 1] = strength;
    });

    const lines = new THREE.BufferGeometry();
    lines.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lines.setAttribute('aSeed', new THREE.BufferAttribute(lineSeeds, 1));
    lines.setAttribute('aStrength', new THREE.BufferAttribute(lineStrength, 1));
    lines.computeBoundingSphere();

    return {
      nodeGeometry: nodes,
      lineGeometry: lines,
      nodeUniforms: {
        uTime: { value: 0 },
        uSize: { value: 3.1 },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color('#f4f6f9') },
      },
      lineUniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color('#8b919b') },
      },
    };
  }, [density]);

  useEffect(
    () => () => {
      nodeGeometry.dispose();
      lineGeometry.dispose();
    },
    [nodeGeometry, lineGeometry],
  );

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!reducedMotion) time.current += delta;

    nodeUniforms.uTime.value = time.current;
    lineUniforms.uTime.value = time.current;

    nodeUniforms.uOpacity.value = damp(nodeUniforms.uOpacity.value, 0.4, 1.4, delta);
    lineUniforms.uOpacity.value = damp(lineUniforms.uOpacity.value, 0.11, 1.4, delta);

    if (group.current) {
      group.current.rotation.y = damp(
        group.current.rotation.y,
        scrollState.progress * 0.55 - 0.1,
        1.2,
        delta,
      );
      group.current.position.z = damp(
        group.current.position.z,
        -16 + scrollState.progress * 5,
        1.2,
        delta,
      );
    }
  });

  return (
    <group ref={group} position={[0, 1.5, -16]}>
      <lineSegments frustumCulled={false}>
        <primitive object={lineGeometry} attach="geometry" />
        <shaderMaterial
          vertexShader={LINE_VERTEX}
          fragmentShader={LINE_FRAGMENT}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      <points frustumCulled={false}>
        <primitive object={nodeGeometry} attach="geometry" />
        <shaderMaterial
          vertexShader={NODE_VERTEX}
          fragmentShader={NODE_FRAGMENT}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
