import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Fix: Define __dirname for ES modules environment as it is not available by default in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: ["spexpo-lofts.onrender.com"],
      proxy: {
        '/ical-proxy': {
          target: 'https://www.airbnb.com.br',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ical-proxy/, ''),
        },
      },
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    optimizeDeps: {
      include: ['ical.js'],
    }
  }
})
