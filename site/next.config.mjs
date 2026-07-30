/** @type {import('next').NextConfig} */

// The site is served from the `cerbenum` repository, so GitHub Pages puts it
// under /cerbenum rather than at the domain root. Swap both values when a
// custom domain is attached.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/cerbenum';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
