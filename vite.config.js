import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate the large Three.js ecosystem into one cacheable vendor chunk.
          // Shared between Home (3D island) and Contact (Fox) — browser caches it once.
          'three-vendor': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            '@react-spring/three',
          ],
          // React core + router in its own chunk for maximum cache reuse
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          // Animation library separate — only loaded by pages that import it
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
})
