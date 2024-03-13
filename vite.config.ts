import { URL, fileURLToPath } from 'node:url'
import * as fs from 'node:fs'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      VueDevTools(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    server: {
      port: 443,
      host: '0.0.0.0',
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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
