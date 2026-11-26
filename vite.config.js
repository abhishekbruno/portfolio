import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/three/') || id.includes('\\three\\')) {
              return 'three-vendor';
            }
            if (id.includes('/framer-motion/') || id.includes('\\framer-motion\\')) {
              return 'motion-vendor';
            }
            if (id.includes('/lucide-react/') || id.includes('\\lucide-react\\')) {
              return 'icons-vendor';
            }
            if (
              id.includes('/react/') ||
              id.includes('\\react\\') ||
              id.includes('/react-dom/') ||
              id.includes('\\react-dom\\') ||
              id.includes('/scheduler/') ||
              id.includes('\\scheduler\\')
            ) {
              return 'react-vendor';
            }
          }
          return undefined;
        }
      }
    }
  }
});
