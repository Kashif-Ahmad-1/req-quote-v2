import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use process.env.PORT for dynamic port or default to 3000 for local dev
    host: '0.0.0.0',                // Ensure the server is accessible on all IPs
  },
});
