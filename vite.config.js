import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,   // Use process.env.PORT provided by Render
    host: '0.0.0.0',                  // Ensure it's listening on all interfaces
  },
  preview: {
    allowedHosts: ['req-quote-v2.onrender.com'], // Add the Render host to the allowed hosts list
  },
});
