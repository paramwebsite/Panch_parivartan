import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Enable local network access
    port: 5185, // Optional: Specify a custom port
    strictPort: true, // Optional: Ensure the port is not occupied
  },
});
