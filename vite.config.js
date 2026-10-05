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
        invest: resolve(__dirname, 'invest/index.html')
      }
    }
  }
});
