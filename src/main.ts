import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTelegram from 'vue-tg'
import App from './App.vue'
import router from './router'
import '@erfanmola/televue/style.css';
import './index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTelegram)

app.mount('#app')
