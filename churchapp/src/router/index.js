import { createRouter, createWebHistory } from 'vue-router';
// import App from '../App.vue';
// import WelcomePage from '../components/WelcomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterationPage from '../components/RegisterationPage.vue';
import HomePage from '../components/HomePage.vue';
import AttendancePage from '../components/AttendancePage.vue';
import MembersPage from '../components/MembersPage.vue';


const routes = [
  // { path: '/', component: WelcomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterationPage },
  { path: '/home', component: HomePage },
  { path: '/attendance', component: AttendancePage },
  { path: '/members', component: MembersPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
