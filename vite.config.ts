import * as fs from 'node:fs'
import * as path from 'node:path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig(() => {
  // eslint-disable-next-line node/prefer-global/process
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [
      vue(),
      VueDevTools(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    server: isProduction
      ? {}
      : {
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
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
