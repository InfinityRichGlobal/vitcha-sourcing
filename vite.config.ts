import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxy = Object.fromEntries(['/api', '/uploads', '/media'].map(route => [route, { target: process.env.VITCHA_DEV_API || 'http://127.0.0.1:3001', changeOrigin: true }]));

export default defineConfig({
  base: './',
  plugins: [react()],
  preview: { proxy },
  server: {
    port: 3000,
    host: true,
    proxy,
  },
});
