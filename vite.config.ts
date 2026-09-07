import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
export default defineConfig({
  base: (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/',
  css: { postcss: { plugins: [tailwindcss()] } },
  server: { watch: { useFsEvents: false, usePolling: true } },
  plugins: [vinext()],
});
