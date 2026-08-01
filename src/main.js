import { createPinia } from "pinia"

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/main.css'
import router from './router/index'
import axios from 'axios'
import "@fortawesome/fontawesome-free/css/all.min.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')