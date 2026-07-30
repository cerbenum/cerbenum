/**
 * Generates every static brand asset the site references.
 *
 *   src/app/icon.png            browser tab icon (Next file convention)
 *   src/app/apple-icon.png      iOS home-screen icon
 *   src/app/favicon.ico         legacy /favicon.ico for crawlers
 *   public/og.png               1200x630 social card, cut from the brand banner
 *   public/brand/*.png          logo referenced by structured data and manifest
 *
 * Icons are rasterised from the same chevron geometry the site renders, so the
 * flat, 3D and icon marks never drift apart. Run: npm run assets
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const brandSource = resolve(root, 'assets', 'brand');
const bannerSource = join(brandSource, 'cerbenum-banner.png');

const RIBBON =
  'M0.4728 -0.637 L-0.2368 -0.2407 L-0.2368 0.2407 L0.4728 0.637 ' +
  'L0.3577 0.843 L-0.4728 0.3793 L-0.4728 -0.3793 L0.3577 -0.843 Z';

const LAYERS = [
  { scale: 1, x: -0.11, from: '#8f959e', via: '#e8ebef', to: '#5c6169' },
  { scale: 0.855, x: 0.03, from: '#b8bec7', via: '#ffffff', to: '#7a8089' },
  { scale: 0.71, x: 0.16, from: '#d9dde3', via: '#ffffff', to: '#949aa3' },
];

function markSvg(size, { background = '#12141a', padding = 0.16 } = {}) {
  // The mark spans 1.18 x 1.8 user units; fit it into the padded square.
  const span = 1.8 / (1 - padding * 2);
  const half = span / 2;

  const gradients = LAYERS.map(
    (layer, index) => `
      <linearGradient id="g${index}" x1="0" y1="${-half}" x2="0.6" y2="${half}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${layer.from}"/>
        <stop offset="42%" stop-color="${layer.via}"/>
        <stop offset="72%" stop-color="${layer.from}"/>
        <stop offset="100%" stop-color="${layer.to}"/>
      </linearGradient>`,
  ).join('');

  const paths = LAYERS.map(
    (layer, index) =>
      `<g transform="translate(${layer.x} 0) scale(${layer.scale})"><path d="${RIBBON}" fill="url(#g${index})" stroke="#0b0d11" stroke-width="${0.032 / layer.scale}" stroke-linejoin="round"/></g>`,
  ).join('');

  const bg = background
    ? `<rect x="${-half}" y="${-half}" width="${span}" height="${span}" fill="${background}"/>
       <ellipse cx="-0.05" cy="-0.15" rx="${half}" ry="${half}" fill="url(#glow)"/>`
    : '';

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-half + -0.045} ${-half} ${span} ${span}">
      <defs>
        ${gradients}
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#12141a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      ${bg}
      ${paths}
    </svg>`,
  );
}

/** ICO container holding a single PNG-encoded 32x32 entry. */
function icoFromPng(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

async function main() {
  await mkdir(join(root, 'public', 'brand'), { recursive: true });

  const png = (size, options) => sharp(markSvg(size, options)).png({ compressionLevel: 9 }).toBuffer();

  const icon512 = await png(512);
  const icon180 = await png(180);
  const icon32 = await png(32, { padding: 0.1 });
  const markTransparent = await png(512, { background: null, padding: 0.06 });

  await writeFile(join(root, 'src', 'app', 'icon.png'), icon512);
  await writeFile(join(root, 'src', 'app', 'apple-icon.png'), icon180);
  await writeFile(join(root, 'src', 'app', 'favicon.ico'), icoFromPng(icon32));
  await writeFile(join(root, 'public', 'brand', 'cerbenum-mark.png'), icon512);
  await writeFile(join(root, 'public', 'brand', 'cerbenum-mark-180.png'), icon180);
  await writeFile(join(root, 'public', 'brand', 'cerbenum-mark-transparent.png'), markTransparent);

  // Social card: scale the brand banner to the OG height, then cut the panel
  // that holds the full lockup.
  const banner = sharp(bannerSource);
  const { width = 0, height = 0 } = await banner.metadata();
  const scale = 630 / height;
  const scaledWidth = Math.round(width * scale);

  const og = await sharp(bannerSource)
    .resize(scaledWidth, 630)
    .extract({ left: Math.min(60, Math.max(0, scaledWidth - 1200)), top: 0, width: 1200, height: 630 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(join(root, 'public', 'og.png'), og);

  const banner1600 = await sharp(bannerSource)
    .resize(1600)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(root, 'public', 'brand', 'cerbenum-banner.png'), banner1600);

  console.log('assets written');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
