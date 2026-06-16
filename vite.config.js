import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // This entirely bypasses the lightningcss Vercel bug
    cssMinify: 'esbuild',
    // Ensures large files don't trip up the compiler
    chunkSizeWarningLimit: 2000, 
  }
});