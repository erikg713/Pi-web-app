import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // Set the root directory for the project
  root: 'src',
  
  // Base public path when serving or building the project
  base: '/',
  
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  
  build: {
    // Output directory for the build
    outDir: '../dist',
    // Directory to nest generated assets under
    assetsDir: 'assets',
    // Minification method
    minify: 'esbuild',
  },
  
  server: {
    // Development server port
    port: 3000,
    // Automatically open the browser on server start
    open: true,
    // Proxy configuration for API calls
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000', // Use environment variable for API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
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
