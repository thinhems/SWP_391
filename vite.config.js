import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@fortawesome') || id.includes('yet-another-react-lightbox')) {
              return 'vendor-ui';
            }
            if (id.includes('formik') || id.includes('yup')) {
              return 'vendor-forms';
            }
            if (id.includes('axios') || id.includes('@tanstack')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
          
          // Page chunks based on directory structure
          if (id.includes('src/pages/HomeTemplate')) {
            return 'home-pages';
          }
          if (id.includes('src/pages/StaffTemplate')) {
            return 'staff-pages';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/contexts')) {
            return 'contexts';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
