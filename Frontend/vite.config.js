import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'src',
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
