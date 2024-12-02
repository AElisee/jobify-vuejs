import './assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
