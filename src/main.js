import { createApp } from 'vue'
import App from './App.vue'
import './registerFireBase'
import router from './router'
import store from './store'
import './theme.css'

createApp(App).use(store).use(router).mount('#app')
