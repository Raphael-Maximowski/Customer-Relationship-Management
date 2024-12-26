import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import VueTheMask from 'vue-the-mask'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import money from 'v-money3'
import 'vue3-toastify/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/styles.css'
import 'bootstrap'


import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(VueTheMask)
app.use(money)
app.use(pinia)
app.use(router)
app.use(Vue3Toastify)

app.mount('#app')

