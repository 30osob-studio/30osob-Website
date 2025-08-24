import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/about': {
        target: 'https://api-ix11.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/about', '/about')
      }
    }
  }
})
