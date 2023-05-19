import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AppProvider } from './modules/core/providers/AppProvider'

import './assets/stylesheets/app.scss'
import 'vue-tel-input/vue-tel-input.css'

const app = createApp(App)
const appProvider = new AppProvider(app)
appProvider.setupDI()
appProvider.setupPlugin()

app.use(createPinia())
app.use(router)

app.mount('#app')
