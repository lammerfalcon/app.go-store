import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type ServerOptions } from 'vite';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const dir = dirname(fileURLToPath(import.meta.url));

  return {
    plugins: [
      vue(),
      VueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
})
