import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true
  },
  plugins: [
    {
      name: 'rewrite-routes-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          // If accessing /properties or /properties/* (like /properties/palm-residence)
          if (url.startsWith('/properties') && !url.includes('.')) {
            req.url = '/properties/index.html';
          } else if (url.startsWith('/invest') && !url.includes('.')) {
            req.url = '/invest/index.html';
          } else if (url.startsWith('/admin') && !url.includes('.')) {
            req.url = '/admin/index.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        properties: resolve(__dirname, 'properties/index.html'),
        invest: resolve(__dirname, 'invest/index.html'),
        admin: resolve(__dirname, 'admin/index.html')
      },
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth']
        }
      }
    },
    chunkSizeWarningLimit: 1200
  }
});
