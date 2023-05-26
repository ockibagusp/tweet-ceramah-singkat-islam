import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, // options...
  server: {
    proxy: {
      '/video': {
        target: 'https://www.youtube.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/video/, '')
      },
    }
  }
})
