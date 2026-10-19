import { defineConfig } from 'vite';
import { resolve } from 'path';
import enquiriesHandler from './api/enquiries.js';
import propertiesHandler from './api/properties.js';
import authHandler from './api/auth.js';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true
  },
  plugins: [
    {
      name: 'api-and-routes-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url || '';

          // 1. API Endpoints
          if (url.startsWith('/api/')) {
            let body = {};
            if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
              try {
                const chunks = [];
                for await (const chunk of req) chunks.push(chunk);
                const raw = Buffer.concat(chunks).toString('utf-8');
                body = raw ? JSON.parse(raw) : {};
              } catch (e) {
                body = {};
              }
            }
            req.body = body;

            res.status = function(code) {
              res.statusCode = code;
              return this;
            };
            res.json = function(data) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return this;
            };

            if (url.startsWith('/api/enquiries')) {
              return enquiriesHandler(req, res);
            }
            if (url.startsWith('/api/properties')) {
              return propertiesHandler(req, res);
            }
            if (url.startsWith('/api/auth')) {
              return authHandler(req, res);
            }
          }

          // 2. Clean Route Rewrites
          if (url.startsWith('/properties') && !url.includes('.')) {
            req.url = '/properties/index.html';
          } else if (url.startsWith('/invest') && !url.includes('.')) {
            req.url = '/invest/index.html';
          } else if (url.startsWith('/admin') && !url.includes('.')) {
            req.url = '/admin/index.html';
          } else if (url.startsWith('/privacy') && !url.includes('.')) {
            req.url = '/privacy/index.html';
          } else if ((url.startsWith('/terms') || url.startsWith('/terms-and-conditions')) && !url.includes('.')) {
            req.url = '/terms/index.html';
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
        admin: resolve(__dirname, 'admin/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html')
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
