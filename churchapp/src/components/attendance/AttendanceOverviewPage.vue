<template>
  <div class="attendance-page">

  <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading, please wait...</p>
    </div>

    <!-- <div v-if="noData" class="no-data-card">
      <div class="card">
        <h3>No Data for Today</h3>
        <h4>Please check back later.</h4>
      </div>
    </div>
    -->

<div v-if="instra" class="no-data-card">
      <div class="card">
        <h3>To view data for Today</h3>
        <h4>Please click the buttons provided.</h4>
      </div>
    </div>

    <!-- Sidebar -->
     <!-- Conditional Rendering for Sidebar -->
    <AdminSidebar v-if="isAdmin" />
    <UserSidebar v-else />
   

    <!-- Main Content Area -->
    <div class="main-content">
      <Navbar />
      <h1>Attendance Overview</h1>

      <!-- Button Actions -->
      <section class="left_view">
        <button class="button1" @click="attendance">Attendance</button>
        <button class="button2" @click="presentAttendance"> Attendees</button>
        <button class="button3" @click="absentAttendance">Absentees</button>
        <button class="button4" @click="downloadAttendance">Download Attendance</button>
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

      <!-- Attendance Table -->
      <div class="table-container" >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Attendance Status</th>
              <th>Service Type</th>
              <th>Marked By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in attendanceList" :key="index" @click="populateName(record)">
              <td>{{ record.name }}</td>
              <td>{{ record.date }}</td>
              <td>{{ record.attendanceStatus }}</td>
              <td>{{ record.serviceType }}</td>
              <td>{{ record.markedBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar  from '@/components/GlobalNavbar.vue';
import UserSidebar from '@/components/GlobalSidebar.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import axios from 'axios';

export default {
  components: {
    AdminSidebar,
    UserSidebar,
    Navbar
  },
  data() {
    return {
      loading: false,
      noData: false,
      instra: false,

      totalAttendance: 0,
      totalPresent: 0,
      totalAbsent: 0,
      attendanceList: []
    };
  },

  computed: {
    isAdmin() {
      return sessionStorage.getItem("userRole") === 'ADMIN' ||sessionStorage.getItem("userRole") === 'ADMINISTRATOR' ;
    }
  },

  methods: {
    // https://churchmsbackend.onrender.com

    async fetchSummaryData() {
      this.loading = true; 
      this.instra = true;

      
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/attendance/get_attendance_for_the_current_day');
        this.totalAttendance = response.data.total_attendance;
        this.totalPresent = response.data.present_attendance;
        this.totalAbsent = response.data.absent_attendance;
        
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }
    },

    async attendance() {
      this.loading = true; 
      this.instra = false;
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/attendance/get_attendance_data');
        this.attendanceList = response.data;

        console.info("attendance list", response.data)
        if (response.data !== 'No data found') {
          this.attendanceList = response.data.map(attendant => ({
              name: attendant.fullName,
              date: attendant.date,
              attendanceStatus: attendant.status,
              serviceType: attendant.serviceType,
              markedBy: attendant.markedBy,
              
          }));
          } else {
              this.attendanceList = [];  // Clear the list if no data is found
              this.noData = true;
          }

      } catch (error) {
        console.error('Error fetching attendance list:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }
    },


    async presentAttendance() {
      this.loading = true; 
      this.instra = false;
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/attendance/get_present_attendance_data');
        this.attendanceList = response.data;

        console.info("present attendance list", response.data)
        if (response.data !== 'No data found') {
          this.attendanceList = response.data.map(attendant => ({
              name: attendant.fullName,
              date: attendant.date,
              attendanceStatus: attendant.status,
              serviceType: attendant.serviceType,
              markedBy: attendant.markedBy,
          }));
        } else {
            this.attendanceList = [];  // Clear the list if no data is found
            this.noData = true;
            
        }


      } catch (error) {
        console.error('Error fetching attendance list:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
        //this.noData = true;
      }
    },


    async absentAttendance() {
      this.loading = true; 
      this.instra = false;
      try {
        const response = await axios.get('https://churchmsbackend.onrender.com/attendance/get_absent_attendance_data');
        this.attendanceList = response.data;

        console.info("present attendance list", response.data)
        if (response.data !== 'No data found') {
    this.attendanceList = response.data.map(attendant => ({
        name: attendant.fullName,
        date: attendant.date,
        attendanceStatus: attendant.status,
        serviceType: attendant.serviceType,
        markedBy: attendant.markedBy,
    }));
    } else {
        this.attendanceList = [];  // Clear the list if no data is found
    }

      } catch (error) {
        console.error('Error fetching attendance list:', error);
      }

      finally {
        this.loading = false; // Hide loading screen
      }
    },


    async downloadAttendance() {
      this.instra = false;
  console.info("In the download attendance function");

   if(sessionStorage.getItem('privilege') == "GUEST PRIVILEGES" || sessionStorage.getItem('privilege') == "DATA CLERK PRIVILEGES"){
      alert("You are not allowed to perform this action"); 
    }else{

  try {
    // Fetch the file from the backend
    const response = await axios.get('https://churchmsbackend.onrender.com/attendance/download_current_attendance_data', {
      responseType: 'blob', // Specify response type as blob
    });

    console.info("Response:", response);

    // Create a Blob from the response
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    console.info("File response converted:", blob);

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Use the filename provided by the backend or set a default one
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'CTC_Attendance_data.xlsx';
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }

    a.download = fileName;
    document.body.appendChild(a); // Append the link to the body
    a.click();
    document.body.removeChild(a); // Remove the link after clicking

    console.info("File is downloaded");

    // Cleanup
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }}
},
  

    
  },
  mounted() {
    // Automatically fetch summary data when the component is mounted
    this.fetchSummaryData();

    // Clear local storage when the tab or window is closed
    //window.addEventListener("beforeunload", () => {
     // localStorage.clear();
   // });
  }
};
</script>


<style scoped>

h1{
      position: fixed;
    top: 100px;
    left: 500px;
}

h2{
      position: fixed;
    top: 260px;
    left: 550px;
}


.attendance-page {
  display: flex; /* Flex to align sidebar and main content */
}

.main-content {
  flex: 1; /* Take remaining space */
  padding: 20px;
}


select{
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button1 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color:black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1173px;
    top: 395px;
}

.button2 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color:black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1090px;
    top: 445px;
}

.table-container {
 max-height: 320px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    position: fixed;
    top: 155px;
    left: 275px;
    width: 790px;
}

.button3 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1180px;
    top: 490px;

}

.button4 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1090px;
    top: 540px;

}
table {
  width: 100%; /* Ensure the table takes up the full width of the container */
  border-collapse: collapse; /* Ensure no gaps between table cells */
}

.left_view {
  width: 200px;
  height: 500px;
  position: fixed;  /* Fixes .left_view at specific screen coordinates */
  left: 1080px;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
      border-color: #d1cfcd;
    border-style: solid;
  background-color: white;
  padding-top: 150px; /* Space for .total_attendance at the top */
}


.total_attendance {
  width: 180px;
    height: 100px;
    position: fixed;
    top: 120px;
    left: 1090px;
    border-radius: 10px;
    background-color: #d7e6e7;
    color: #100f0f;
    display: flex;
    
}

.total_attendance p{
      position: fixed;
    top: 145px;
    left: 1102px;
    color: #100f0f;
    font-size: large;
}

.total_attendance h5{
      position: fixed;
        top: 185px;
    left: 1172px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}

.total_present{
  width: 90px;
    height: 70px;
    position: fixed;
    left: 1087px;
    top: 230px;
    border-radius: 10px;
    background-color: #d7e6e7;
    
}

.total_present p{
  position: fixed;
    top: 243px;
    left: 1100px;
    color: #100f0f;
    justify-content: center;
}

.total_present h5{
      position: fixed;
    top: 269px;
    left: 1125px;
    color: #100f0f;
    font-size: large;
    text-align: center;
}

.total_absent{
  width: 90px;
    height: 70px;
    position: fixed;
    left: 1185px;
    top: 230px;
    border-radius: 10px;
    background-color: #d7e6e7;
}

.total_absent p{
  position: fixed;
    top: 243px;
    left: 1205px;
    color: #100f0f;
    justify-content: center;
}

.total_absent h5{
      position: fixed;
    top: 269px;
        left: 1225px;

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

.no-data-card{
  background:rgb(178, 212, 214);
    height: 100px;
    position: fixed;
    top: 300px;
    left: 500px;
    width: 300px;
    border-radius: 40px;
}

.no-data-card h4{
    position: relative;
    top: 30px;
    left: 5%;
}

.no-data-card h3{
    position: relative;
    top: 22px;
    left: 14%;
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
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-screen p {
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
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

/* Main Content Styles */
.content {
  padding: 20px;
}
</style>
