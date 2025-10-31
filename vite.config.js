import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-select',
      'react-select/async',
      'react-select/async-creatable',
      'react-select/creatable',
      'hoist-non-react-statics'
    ],
    esbuildOptions: {
      // Enable esbuild's handling of React
      jsx: 'automatic',
      // This is needed to handle some packages that don't support ESM
      target: 'es2020',
      supported: {
        'top-level-await': true
      }
    }
  },
  resolve: {
    alias: {
      // Fix for hoist-non-react-statics
      'hoist-non-react-statics': 'hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js'
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Add any other CommonJS modules that need to be transformed
      include: [/node_modules/],
    },
  },
})
