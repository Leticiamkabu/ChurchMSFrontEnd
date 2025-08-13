import { createApp } from 'vue'
import App from './App.vue'
//import App from './components/LoginPage.vue'
//import App from './components/WelcomePage.vue'
import router from './router'
import new_router from './router/router';


window.addEventListener('beforeunload', () => {
  localStorage.setItem('likelyRefresh', Date.now().toString());
});

// Get last saved timestamp
const lastTime = parseInt(localStorage.getItem('likelyRefresh')) || 0;
const now = Date.now();

// If no refresh OR the difference is too big, it's likely a fresh tab
if (!lastTime || now - lastTime > 1000) {
  sessionStorage.clear(); // <-- only clear if not a refresh
  console.log('Cleared sessionStorage due to tab close');
}

// Remove the temporary key
localStorage.removeItem('likelyRefresh');


createApp(App)
// .use(router)
.use(new_router)
.mount('#app')


