import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/main.css'
import router from './router/index'
import axios from 'axios'

const app = createApp(App)
// axios.interceptors.request.use(config => {
//   const token = localStorage.getItem("access_token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
app.use(router)
app.mount('#app')