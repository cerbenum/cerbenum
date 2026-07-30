import * as THREE from 'three';

type Pt = [number, number];

/**
 * Centre-line of one chevron ribbon of the Cerbenum mark: a bracket that opens
 * to the right, with a straight spine and two arms swept back at an angle.
 */
const CENTRE_LINE: Pt[] = [
  [0.86, 0.74],
  [0.09, 0.31],
  [0.09, -0.31],
  [0.86, -0.74],
];

/**
 * Offsets a polyline by `halfWidth` on both sides using miter joins and returns
 * the closed outline. This reproduces the constant-thickness ribbon of the mark
 * rather than approximating it with boxes.
 */
function ribbonOutline(line: Pt[], halfWidth: number): THREE.Vector2[] {
  const normals: Pt[] = [];
  for (let i = 0; i < line.length - 1; i += 1) {
    const dx = line[i + 1][0] - line[i][0];
    const dy = line[i + 1][1] - line[i][1];
    const len = Math.hypot(dx, dy) || 1;
    normals.push([-dy / len, dx / len]);
  }

  const left: THREE.Vector2[] = [];
  const right: THREE.Vector2[] = [];

  for (let i = 0; i < line.length; i += 1) {
    const prev = normals[i - 1];
    const next = normals[i];
    let nx: number;
    let ny: number;
    let scale = 1;

    if (!prev) {
      [nx, ny] = next;
    } else if (!next) {
      [nx, ny] = prev;
    } else {
      const mx = prev[0] + next[0];
      const my = prev[1] + next[1];
      const mlen = Math.hypot(mx, my) || 1;
      nx = mx / mlen;
      ny = my / mlen;
      // Miter length grows as the joint gets sharper; clamp so the spine
      // corners stay machined instead of spiking.
      const dot = nx * next[0] + ny * next[1];
      scale = Math.min(2.6, 1 / Math.max(0.0001, dot));
    }

    const ox = nx * halfWidth * scale;
    const oy = ny * halfWidth * scale;
    left.push(new THREE.Vector2(line[i][0] + ox, line[i][1] + oy));
    right.push(new THREE.Vector2(line[i][0] - ox, line[i][1] - oy));
  }

  return [...left, ...right.reverse()];
}

export function chevronShape(halfWidth = 0.118): THREE.Shape {
  return new THREE.Shape(ribbonOutline(CENTRE_LINE, halfWidth));
}

export function chevronGeometry(halfWidth = 0.118, depth = 0.1): THREE.ExtrudeGeometry {
  const geometry = new THREE.ExtrudeGeometry(chevronShape(halfWidth), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelOffset: 0,
    bevelSegments: 4,
    curveSegments: 2,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * The mark is three nested ribbons, each stepped inward and forward so the
 * chrome catches a different reflection band.
 */
export const MARK_LAYERS = [
  { scale: 1.0, offset: [-0.11, 0, -0.11] as const, roughness: 0.14 },
  { scale: 0.855, offset: [0.03, 0, 0.02] as const, roughness: 0.1 },
  { scale: 0.71, offset: [0.16, 0, 0.15] as const, roughness: 0.07 },
];
