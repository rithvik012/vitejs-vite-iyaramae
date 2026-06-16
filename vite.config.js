import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Completely turns off the CSS compressor so Vercel stops crashing!
    cssMinify: false,
    chunkSizeWarningLimit: 2000, 
  }
});