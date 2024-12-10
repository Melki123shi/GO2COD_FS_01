import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    fs: {
      allow: [
        './', 
        path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free'), 
      ],
    },

  },
  plugins: [react()],

});
