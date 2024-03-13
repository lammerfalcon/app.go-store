import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    plugins: [
      vue(),
      VueDevTools(),
    ],
    server: {
      port: 443,
      host: "0.0.0.0",
      hmr: {
        host: 'tg-mini-app.local',
        port: 443,
      },
      https: {
        key: fs.readFileSync('./.cert/localhost-key.pem'),
        cert: fs.readFileSync('./.cert/localhost.pem'),
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
})
