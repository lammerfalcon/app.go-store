import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTelegram from 'vue-tg'
import App from './App.vue'
import router from './router'
import '@erfanmola/televue/style.css'
import './index.css'
import { Locale } from 'vant'
import ruRU from 'vant/es/locale/lang/ru-RU'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTelegram)
Locale.use('ru-RU', ruRU)

app.mount('#app')
