<template>

  <div class="attendance-page">

  <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading, please wait...</p>
    </div>


    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content Area -->
    <div class="main-content">
      <Navbar />
      

      <section class="section1">

      <div class="total_Users">
      <p>Users</p>
      <h5>{{ totalUsers }}</h5>
      </div>
      
      <div class="total_Dataclerk">
      <p>DATA CLERK</p>
      <h5>{{ totalDataclerk }}</h5>
      </div>

      <div class="total_Accounts">
      <p>ACCOUNTS</p>
      <h5>{{ totalAccounts }}</h5>
      </div>

      <div class="total_Administrators">
      <p>ADMINISTRATOR</p>
      <h5>{{ totalAdministrators }}</h5>
      </div>

      <div class="total_DepartmentalLeaders">
      <p>DEPARTMENTAL LEADERS</p>
      <h5>{{ totalDepartmentalLeaders }}</h5>
      </div>

      <div class="total_Admin">
      <p>ADMIN</p>
      <h5>{{ totalAdmin }}</h5>
      </div>
         

      </section>

      <section class="section2">

        <div class="table-container" >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
                <th>LoginTime</th>
                <th>LogOutTime</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in trackerList" :key="index" @click="populateName(record.name, record.membersId, record.attendanceStatus, record.attendanceIDS )">
                <td>{{ record.name }}</td>
                <td>{{ record.status }}</td>
                <td>{{ record.role }}</td>
                <td>{{ record.logInTime }}</td>
                <td>{{ record.logOutTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      

      <!-- Summary Data Display -->
      <div class="total_attendance">
        <p>Total Attendance </p>
        <h5>{{ totalAttendance }}</h5>
      </div>
      <div class="total_present">
        <p>Present</p>
        <h5>{{ totalPresent }}</h5>
      </div>
      <div class="total_absent">
        <p>Absent</p>
        <h5>{{ totalAbsent }}</h5>
      </div>

      <div class="total_members">
        <p>Total Members </p>
        <h5>{{ totalMembers }}</h5>
      </div>
  </div>
    
  </div>
</template>

<script>
import Navbar from '@/components/GlobalNavbar.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import axios from 'axios';

export default {
  components: {
    AdminSidebar,
    Navbar
  },
  data() {
    return {
      loading: false,

      totalAttendance: 0,
      totalPresent: 0,
      totalAbsent: 0,
      
      intervalId: null,
      
      totalUsers: 0,
      totalDataclerk: 0,
      totalAccounts: 0,
      totalAdministrators: 0,
      totalDepartmentalLeaders: 0,
      totalAdmin: 0,


      totalMembers: 0,

     trackerList : [],

    };
  },


  methods: {

    //https://churchmsbackend.onrender.com

    async fetchAttendanceSummaryData() {
      this.loading = true; 
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/attendance/get_attendance_for_the_current_day');
        this.totalAttendance = response.data.total_attendance;
        this.totalPresent = response.data.present_attendance;
        this.totalAbsent = response.data.absent_attendance;



        
      } catch (error) {
        console.error('Error fetching Attendance summary data:', error);
      }
      finally {
        //this.loading = false; // Hide loading screen
      }
    },

    async fetchUsersSummaryData() {
      //this.loading = true;
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/auth/get_user_count');
        this.totalUsers = response.data.total_users;
        this.totalDataclerk = response.data.data_clerk;
        this.totalAccounts = response.data.accounts;
        this.totalAdministrators = response.data.administrator;
        this.totalDepartmentalLeaders = response.data.departmentLeaders;
        this.totalAdmin = response.data.admin;


      } catch (error) {
        console.error('Error fetching user summary data:', error);
      }
      finally {
        //this.loading = false; // Hide loading screen
      }
    },


    async fetchMembersSummaryData() {
     // this.loading = true;
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/members/get_total_number_of_members');
        this.totalMembers = response.data.total_members;
        

      } catch (error) {
        console.error('Error fetching Member summary data:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }
    },

     async fetchUserTrackerData() {
      this.loading = true; 


        try {
        const feedBack = await axios.get('https://churchmsbackend.onrender.com/auth/get_all_user_tracking');

        console.info('Users tracking data:',feedBack.data );

        this.trackerList = feedBack.data.map(user => ({
              name: user.firstName + " " + user.lastName,
              status: user.status,
              role: user.role,
              logInTime: user.logInTime,
              logOutTime: user.logOutTime,
          }));


        if(feedBack.data.detail === 'User tracker with id does not exist'){
            console.error(feedBack.data.detail);
        }

        

        } catch (error) {
        console.error('Error fetching user tracker data:', error);
      }
        this.loading = false; 
      
      }


    

    
  },
  mounted() {
    this.loading = true; 
    // Automatically fetch summary data when the component is mounted
    this.fetchAttendanceSummaryData();
    this.fetchUsersSummaryData();
    this.fetchMembersSummaryData();
    this.fetchUserTrackerData();
    this.loading = false; 

    console.info('Loading user tracker data:');
    this.intervalId = setInterval(() => {
      this.fetchUserTrackerData();
    }, 3600000);
//3600000 for 1 hour
    // Clear local storage when the tab or window is closed
   // window.addEventListener("beforeunload", () => {
   //   localStorage.clear();
   // });

    
  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed (Vue 3)
    clearInterval(this.intervalId);
  }
};
</script>


<style scoped>

.attendance-page {
  display: flex; /* Flex to align sidebar and main content */
  flex-direction: row;
  gap: 1.25rem; /* 20px */
  flex-wrap: wrap;
  width: 100%;
}

/* Loading Screen Styles */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-screen .spinner {
   width: 3rem;
  height: 3rem;
  border: 0.3rem solid #f3f3f3;
  border-top: 0.3rem solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-screen p {
  color: #fff;
  font-size: 1.1rem;
  margin-top: 0.75rem;
}

/* Spinner Animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.main-content {
  flex: 1; /* Take remaining space */
  padding: 1.25rem; /* 20px */
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
}

.section1 {
      width: 200px;
    height: 500px;
    position: fixed;
    left: 300px;
    top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border-color: #d1cfcd;
    border-style: solid;
    background-color: white;
    padding-top: 150px;
}

.total_Users {
  width: 180px;
    height: 100px;
    position: fixed;
    top: 120px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_Users p{
      position: fixed;
    top: 145px;
    left: 375px;
    color: #100f0f;
    font-size: large;
}

.total_Users h5{
      position: fixed;
        top: 185px;
    left: 393px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}



.total_Dataclerk {
  width: 50px;
    height: 5px;
    position: fixed;
    top: 260px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_Dataclerk p{
      position: fixed;
    top: 240px;
    left: 320px;
    color: #100f0f;
    font-size: 15px;
}

.total_Dataclerk h5{
      position: fixed;
          top: 265px;
    left: 363px;
    color: #100f0f;
    font-size: 15px;
    text-align: center;
}



.total_Accounts {
  width: 50px;
    height: 5px;
    position: fixed;
    top: 315px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_Accounts p{
      position: fixed;
    top: 295px;
    left: 325px;
    color: #100f0f;
    font-size: 15px;
}

.total_Accounts h5{
      position: fixed;
        top: 325px;
    left: 363px;
    color: #100f0f;
    font-size: 15px;
    text-align: center;
}


.total_Administrators {
   width: 50px;
    height: 5px;
    position: fixed;
    top: 375px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_Administrators p{
      position: fixed;
    top: 355px;
    left: 325px;
    color: #100f0f;
    font-size: 15px;
}

.total_Administrators h5{
      position: fixed;
       top: 385px;
    left: 363px;
    color: #100f0f;
    font-size: 15px;
    text-align: center;
}



.total_DepartmentalLeaders {
   width: 50px;
    height: 5px;
    position: fixed;
    top: 435px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
}

.total_DepartmentalLeaders p{
      position: fixed;
    top: 415px;
    left: 325px;
    color: #100f0f;
    font-size: 14.5px;
}

.total_DepartmentalLeaders h5{
        position: fixed;
    top: 445px;
    left: 363px;
    color: #100f0f;
    font-size: 15px;
    text-align: center;

}



.total_Admin {
   width: 50px;
    height: 5px;
    position: fixed;
    top: 495px;
    left: 310px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_Admin p{
      position: fixed;
    top: 475px;
    left: 329px;
    color: #100f0f;
    font-size: 15px;
}

.total_Admin h5{
      position: fixed;
    top: 505px;
    left: 363px;
    color: #100f0f;
    font-size: 15px;
    text-align: center;
}


.section2 {
        width: 600px;
    height: 200px;
    position: fixed;
    left: 550px;
    top: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border-color: #d1cfcd;
    border-style: solid;
    background-color: white;
    padding-top: 150px;
}

.table-container {
  max-height: 190px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    position: fixed;
    top: 360px;
    left: 560px;
    width: 580px;
    height: 180px;
    background-color: #d7e6e7;
}

table {
  width: 100%; /* Ensure the table takes up the full width of the container */
  border-collapse: collapse; /* Ensure no gaps between table cells */
  top: 365px;
  left : 565px;
  background-color: #d7e6e7;
  table-layout: fixed;
  display: block; 

}
   

th, td {
  background-color: #f2f2f2;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  width :60px;
  
}

/* Optional: Style the scrollbar */
.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
th {
  width: 800px;
}


.total_attendance {
  width: 180px;
    height: 100px;
    position: fixed;
    top: 120px;
    left: 550px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_attendance p{
      position: fixed;
    top: 145px;
    left: 565px;
    color: #100f0f;
    font-size: large;
}

.total_attendance h5{
      position: fixed;
        top: 185px;
    left: 630px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}

.total_present{
  width: 90px;
    height: 70px;
    position: fixed;
    left: 550px;
    top: 230px;
    border-radius: 10px;
    background-color: #d7e6e7;
    
}

.total_present p{
  position: fixed;
    top: 243px;
    left: 567px;
    color: #100f0f;
    justify-content: center;
}

.total_present h5{
      position: fixed;
    top: 269px;
    left: 590px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}

.total_absent{
  width: 85px;
    height: 70px;
    position: fixed;
    left: 645px;
    top: 230px;
    border-radius: 10px;
    background-color: #d7e6e7;
}

.total_absent p{
  position: fixed;
    top: 243px;
    left: 660px;
    color: #100f0f;
    justify-content: center;
}

.total_absent h5{
      position: fixed;
    top: 269px;
        left: 680px;

    color: #100f0f;
    font-size: large;
    text-align: center;
}


.total_members {
  width: 180px;
    height: 100px;
    position: fixed;
    top: 120px;
    left: 770px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_members p{
      position: fixed;
    top: 145px;
    left: 797px;
    color: #100f0f;
    font-size: large;
}

.total_members h5{
      position: fixed;
        top: 185px;
    left: 855px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}


table, th, td {
  
  border: 1px solid #ccc;
}

th, td {
  
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  width: 700px;
}



/* Main Content Styles */
.content {
  padding: 20px;
}



</style>
