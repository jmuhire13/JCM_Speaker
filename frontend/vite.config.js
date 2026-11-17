import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
// The image optimizer only runs for the site itself, not for the second, "server" build used to
// pre-render pages (src/entry-server.jsx), which needs no images of its own.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), !isSsrBuild && ViteImageOptimizer()].filter(Boolean),
  // The server build needs no copy of public/ (favicon, admin, share image...).
  build: isSsrBuild ? { copyPublicDir: false } : {},
}))
