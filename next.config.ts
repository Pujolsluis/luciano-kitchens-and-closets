import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Export without redirecting the prerenderer's slashless requests.
  // finalize.mjs converts these HTML files to GitHub Pages directory indexes.
  trailingSlash: false,
  // Public URLs use lib/site.ts and Vite's asset base. Keeping the export
  // router at / avoids the starter's basePath prerender 404s.
  images: { unoptimized: true },
};

export default nextConfig;
