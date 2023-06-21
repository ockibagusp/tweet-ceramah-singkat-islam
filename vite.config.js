import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tweet-ceramah-singkat-islam/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }, // options...
  
  // $ npm install cors
  // https://expressjs.com/en/resources/middleware/cors.html

  // heroku!
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
