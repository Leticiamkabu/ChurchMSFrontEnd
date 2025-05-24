import { createRouter, createWebHashHistory } from 'vue-router';
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
import ReportPage from '../components/report/reportPage.vue';
import SMSNotificationPage from '../components/notification/smsNotificationPage.vue';
import FirstTimersPage from '../components/firstTimers/AddFirstTimersPage.vue';
import EditFirstTimersPage from '../components/firstTimers/EditFirstTimersPage.vue';



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
  { path: '/reportPage', component: ReportPage },
  { path: '/smsNotificationPage', component: SMSNotificationPage },

  // user
  { path: '/home', component: HomePage },
  { path: '/attendance', component: AttendancePage, meta: { requiresMarkAttendancePrivilege: true } },
  { path: '/attendanceOverview', component: AttendanceOverviewPage, meta: { requiresMarkAttendancePrivilege: true } },
  { path: '/members', component: MembersPage },
  { path: '/firstTimers', component: FirstTimersPage },
  { path: '/editFirstTimers', component: EditFirstTimersPage },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('privilage')
  const privileges = user ? user.split(',') : []

  if (to.meta.requiresMarkAttendancePrivilege) {
    if (!privileges || !privileges.includes("Take Attendance")) {
      alert("You do not have permission to access the attendance page.")
      return next(from.fullPath || '/') // Or redirect to an "Access Denied" page
    }
  }

  next()
})


export default router
