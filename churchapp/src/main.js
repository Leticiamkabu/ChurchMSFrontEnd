import { createApp } from 'vue'
import App from './App.vue'
//import App from './components/LoginPage.vue'
//import App from './components/WelcomePage.vue'
import router from './router'

createApp(App)
.use(router) 
.mount('#app')