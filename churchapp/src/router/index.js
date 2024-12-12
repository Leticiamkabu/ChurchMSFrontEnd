import { createRouter, createWebHistory } from 'vue-router';
// import App from '../App.vue';
import WelcomePage from '../components/WelcomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/admin/AdminPage.vue';
import RegisterationPage from '../components/admin/RegisterationPage.vue';
import AdminEditUserPage from '../components/admin/AdminEditUserPage.vue';
import AdminOverViewPage from '../components/admin/AdminOverviewPage.vue';
import HomePage from '../components/HomePage.vue';
import AttendancePage from '../components/attendance/AttendancePage.vue';
import AttendanceOverviewPage from '../components/attendance/AttendanceOverviewPage.vue';
import MembersPage from '../components/members/AddMembersPage.vue';
import AdminMemberActionPage from '../components/admin/AdminMemberActionPage.vue';
import EditMemberPage from '../components/members/EditMembersPage.vue';


const routes = [
  { path: '/', component: WelcomePage },
  { path: '/login', component: LoginPage },

  // admin
  { path: '/adminDashboard', component: AdminPage },
  { path: '/register', component: RegisterationPage },
  { path: '/editUser', component: AdminEditUserPage },
  { path: '/adminOverView', component: AdminOverViewPage },
  { path: '/adminMemberActionPage', component: AdminMemberActionPage },
  
  { path: '/editMemberPage', component: EditMemberPage },
  // user
  { path: '/home', component: HomePage },
  { path: '/attendance', component: AttendancePage },
  { path: '/attendanceOverview', component: AttendanceOverviewPage },
  { path: '/members', component: MembersPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
