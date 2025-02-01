<template>
  <div class="attendance-page">

  <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading, please wait...</p>
    </div>

     <!-- Sidebar -->
     <!-- Conditional Rendering for Sidebar -->
    <AdminSidebar v-if="isAdmin" />
    <UserSidebar v-else />

    <!-- Main Content Area -->
    <div class="main-content">
      <Navbar />

      <section class="row_view">
        <button class="attendanceButton"  @click="toggleFilters" >Attendance Report</button>
      </section>

      <section class="row_view">
        <button class="memberButton"  @click="toggleMemberFilters" >Member Report</button>
      </section>


      <!-- Attendance Popup Modal -->
    <div v-if="showAttendanceFilters" class="attendancePopUP">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="filterOptionText">Filter Options</h2>

          <button @click="showAttendanceFilters = false" class="cancleButton">&times;</button>
        </div>

        <!-- Filter Options -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label for="date" class="dateFilterLabel">Date</label>
            <input
              v-model="filters.date"
              type="date"
              id="date"
              class="dateFilter"
            />
          </div>

          <div>
            <label for="status" class="statusFilterLabel">Status</label>
            <select
              v-model="filters.status"
              id="status"
              class="statusFilter">
              <option value="">All</option>
              <option value="Present">Attendees</option>
              <option value="Absent">Absentees</option>
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2">
          <button @click="showAttendanceFilters = false" class="cancleButton2">
            Cancel
          </button>
          <button @click="getAttendanceFetch" class="applyFilterButton">
            Apply Filters
          </button>
        </div>
      </div>
    </div>



      <!-- Member Popup Modal -->
    <div v-if="showMembersFilters" class="attendancePopUP">
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="filterOptionText">Filter Options</h2>

          <button @click="showMembersFilters = false" class="cancleButton">&times;</button>
        </div>

        <!-- Filter Options -->
        <div class="grid grid-cols-2 gap-4 mb-4">

          <div>
            <label for="age" class="ageFilterLabel">Age</label>
            <input class = "ageFilter" type="text" v-model="memberFilters.age" placeholder="Enter Name" required  @keydown.enter="checkName" />
            
          </div>


          <div>
            <label for="ageRange" class="ageRangeFilterLabel">Age Range</label>
            <select
              v-model="memberFilters.ageRange"
              id="age"
              class="ageRangeFilter">
              <option value="0,10">0 - 10</option>
              <option value="1,18">10 - 18</option>
              <option value="19,30">19 - 30</option>
              <option value="31,60">31 - 60</option>
              <option value="61">61 - above</option>
            </select>
          </div>


          <div>
            <label for="birthMonth" class="birthMonthFilterLabel">Birth Month</label>
            <select
              v-model="memberFilters.birthMonth"
              id="birthMonth"
              class="birthMonthFilter">
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <div>
            <label for="department" class="departmentFilterLabel">Department</label>
            <select
              v-model="memberFilters.department"
              id="department"
              class="departmentFilter">
              <option value="Music">Music</option>
              <option value="Ushering">Ushering</option>
              <option value="Evangelism">Evangelism</option>
              <option value="Preaching">Preaching</option>
            </select>
          </div>


        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2">
          <button @click="showMembersFilters = false" class="cancleButton2">
            Cancel
          </button>
          <button @click="getMemberFetch" class="applyFilterButton">
            Apply Filters
          </button>
        </div>
      </div>
    </div>

      <!-- general  Table -->
      <div class="table-container">

        <button @click="getAttendanceReport" class="downloadAttendanceButton">
            Download
        </button>

        <table>
          <thead>
            <tr>
              <!-- Dynamically generate table headers based on the keys of the first object -->
              <th v-for="(value, key) in attendanceList[0]" :key="key">
          {{ key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') }}
              </th>
            
            </tr>
          </thead>

          <tbody>

            <!-- Dynamically generate table rows and cells -->
            <tr v-for="(record, index) in attendanceList" :key="index">
              <td v-for="(value, key) in record" :key="key">
                {{ value }}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      


    </div>
  </div>
</template>

<script>
import Navbar from '@/components/GlobalNavbar.vue';
import UserSidebar from '@/components/GlobalSidebar.vue';      // Make sure to import your Navbar component
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import axios from 'axios';

export default {
  components: {
    UserSidebar,
    AdminSidebar,
    Navbar
  },

  data() {
    return {
      loading: false,

      showAttendanceFilters: false,
      filters: {
        date: "",
        status: "",
      },

      showMembersFilters: false,
      memberFilters: {
        age: "",
        ageRange: "",
        birthMonth: "",
        department: "",
      },

      attendanceList: [],

    };
  },

  methods: {

    toggleFilters() {
      this.showAttendanceFilters = true;
    },

    toggleMemberFilters() {
      this.showMembersFilters = true;
    },

    async getAttendanceFetch() {
      this.loading = true;
      console.info('status :', this.filters.status)
      if (this.filters.status == ""){
        this.filters.status = "All";
      }
      
      console.info('getting attendance report fetch')
      console.info('date :', this.filters.date)
      console.info('status :', this.filters.status)

       try {
        const response = await axios.get(`https://churchmsbackend.onrender.com/attendance/report_fetch/${this.filters.date}/${this.filters.status}`,{
          
        });
        
        console.info("Attendance report data : ", response.data)

        if (response.data.detail !== "No attendance data exists with date specified" && response.data.detail !== "No attendance data exists with status specified" ) {

          console.info("Populating Attendance List")
          this.attendanceList = response.data;
          this.showAttendanceFilters = false;

          
          
        } else if (response.data.detail) {
          alert(response.data.detail); 
        }

        else{
          alert("Error getting Attendance Data for preview");
        }

      } catch (error) {
        console.error('Error getting Attendance Data :', error);
      }
      finally {
        this.showAttendanceFilters = false;
        this.loading = false; // Hide loading screen
      }

    },


    async getAttendanceReport() {
      this.loading = true;
      console.info('status :', this.filters.status)
      if (this.filters.status == ""){
        this.filters.status = "All";
      }
      
      console.info('getting attendance report')
      console.info('date :', this.filters.date)
      console.info('status :', this.filters.status)

       try {
        const response = await axios.get(`https://churchmsbackend.onrender.com/attendance/report_download/${this.filters.date}/${this.filters.status}`,{
          responseType: 'blob',
        });
        
        console.info("Attendance report data : ", response)

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
      let fileName = 'attendance_report.xlsx';
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

      console.info("File downloaded");

      // Cleanup
      window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Error getting Downloading Attendance Report :', error);
        }
        finally {

          this.loading = false; // Hide loading screen
        }

    },



    async getMemberFetch() {
      this.loading = true;
      

      console.info('Getting Member filter result')

      console.info('age :', this.memberFilters.age)
      console.info('ageRange :', this.memberFilters.ageRange)
      console.info('birthMonth :', this.memberFilters.birthMonth)
      console.info('department :', this.memberFilters.department)

       try {
    
        const response = await axios.get(`https://churchmsbackend.onrender.com/members/sort_member_data/${this.memberFilters.age}/${this.memberFilters.ageRange}/${this.memberFilters.department}/${this.memberFilters.birthMonth}`,{
          
        });
        
        console.info("Attendance report data : ", response.data)

        if (response.data.detail !== "No attendance data exists with date specified" && response.data.detail !== "No attendance data exists with status specified" ) {

          console.info("Populating Attendance List")
          this.attendanceList = response.data;
          this.showAttendanceFilters = false;

          
          
        } else if (response.data.detail) {
          alert(response.data.detail); 
        }

        else{
          alert("Error getting Attendance Data for preview");
        }

      } catch (error) {
        console.error('Error getting Attendance Data :', error);
      }
      finally {
        this.showMembersFilters = false;
        this.loading = false; // Hide loading screen
      }

    },


  }


};
</script>


<style scoped>

h1{
      position: fixed;
    top: 100px;
    left: 600px;
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





.button4 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1160px;
  top: 100px;

}

.button5 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 1160px;
  top: 150px;

}

.edit {
      padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #92c1c0;
    color: black;
    cursor: pointer;
    margin-right: 7px;
    width: 60px;
}


.delete {
      padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #92c1c0;
    color: black;
    cursor: pointer;
    width: 60px;
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




.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-card {
      background: #05919d;
    padding: 20px;
    border-radius: 5px;
    width: 700px;
    height: 520px;
    position: fixed;
    top: 105px;
    left: 400px;
}

.modal-card h2{
  color: white;
    position: fixed;
    top: 120px;
    left: 450px;
}

.firstN{
  color: white;
    position: fixed;
    top: 170px;
    left: 420px;
    font-size: 20px;
}

.firstN-input{
  background-color: white;
    position: fixed;
        top: 200px;
    left: 450px;
    border-radius: 10px;
    height: 30px;
    border-color: aqua;
}

.lastN{
  color: white;
      position: fixed;
    top: 240px;
    left: 420px;
    font-size: 20px;
}

.lastN-input{
  background-color: white;
    position: fixed;
        top: 270px;
    left: 450px;
    border-radius: 10px;
    height: 30px;
    border-color: aqua;
}

.emailL{
  color: white;
      position: fixed;
    top: 310px;
    left: 420px;
    font-size: 20px;
}

.email-input{
  background-color: white;
    position: fixed;
        top: 340px;
    left: 450px;
    border-radius: 10px;
    height: 30px;
    border-color: aqua;
}

.phoneN{
 color: white;
      position: fixed;
    top: 380px;
    left: 420px;
    font-size: 20px;
}

.phoneN-input{
  background-color: white;
    position: fixed;
        top: 410px;
    left: 450px;
    border-radius: 10px;
    height: 30px;
    border-color: aqua;
    color: #100f0f;
    font-size: large;
    text-align: center;
}




.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;


        top: 480px;
    left: 450px;
    border-radius: 10px;
    height: 30px;
    border-color: aqua;
}

.roleL{
  color: white;
      position: fixed;
    top: 520px;
    left: 420px;
    font-size: 20px;
}

.roleL-input{
  position: fixed;
    left: 450px;
    top: 550px;
    height: 45px;
    width: 260px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
}

.privi{
  color: white;
    position: fixed;
    top: 170px;
    left: 820px;
    font-size: 20px;
}

.privi1{
  background-color: white;
    position: fixed;
    top: 210px;
    left: 840px;
}

.privi1-text{
  color: white;
    position: fixed;
    top: 204px;
    left: 860px;
}

.privi2{
  background-color: white;
    position: fixed;
    top: 240px;
    left: 840px;
}

.privi2-text{
  color: white;
    position: fixed;
    top: 234px;
    left: 860px;
}

.privi3{
  background-color: white;
    position: fixed;
    top: 270px;
    left: 840px;
}

.privi3-text{
  color: white;
    position: fixed;
    top: 264px;
    left: 860px;
}

.privi4{
  background-color: white;
    position: fixed;
    top: 300px;
    left: 840px;
}

.privi4-text{
  color: white;
    position: fixed;
    top: 294px;
    left: 860px;
}

.privi5{
  background-color: white;
    position: fixed;
    top: 330px;
    left: 840px;
}

.privi5-text{
  color: white;
    position: fixed;
    top: 324px;
    left: 860px;
}

.updateb{
  position: fixed;
    left: 870px;
    top: 570px;
    height: 30px;
    width: 110px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
}

.cancelb{
  position: fixed;
    left: 990px;
    top: 570px;
    height: 30px;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
}


form {
  margin-bottom: 20px;
  position: fixed;
      top: 90px;
    left: 300px;
}

input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}






.attendanceButton {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  top: 70px;
  left: 300px;
  position: relative;
}


.attendancePopUP{
    top: 170px;
    left: 500px;
    width: 400px;
    height: 250px;
    position: fixed; /* Use fixed or absolute for proper stacking */
    background-color: #92c1c0;
    z-index: 9999; /* Ensure this value is very high */
    padding: 20px; /* Optional padding for spacing */
    border-radius: 10px; /* Optional styling for a rounded look */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3)
    
}

.filterOptionText{
    top: 172px;
    left: 610px;
    position: fixed;
    /* background-color: #00ffd9 !important; */
    color: black;
    
    
}

.cancleButton{
  top: 150px;
    left: 860px;
    position: fixed;
    background-color: #7ab9b9 !important;
    color: black;
    border-radius: 10px;
    
    
}

.dateFilterLabel{
      top: 220px;
    left: 520px;
    position: fixed;
    color: black;
   
    
    
}

.dateFilter{
    top: 210px;
    left: 570px;
    position: fixed;
    color: black;
   
    
    
}


.statusFilterLabel{
      top: 280px;
    left: 520px;
    position: fixed;
    color: black;
   
    
    
}

.statusFilter{
    top: 272px;
    left: 580px;
    position: fixed;
    color: black;
   
    
    
}


.cancleButton2{
    top: 350px;
    left: 530px;
    position: fixed;
    background-color: #f4f7f7 !important;
    color: black;
    border-radius: 10px;
    
    
}


.applyFilterButton{
    top: 350px;
    left: 630px;
    position: fixed;
    background-color: #f4f7f7 !important;
    color: black;
    border-radius: 10px;
    
    
}


.memberButton {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
      top: 20px;
    left: 470px;
  position: relative;
}

.ageFilterLabel{
      top: 220px;
    left: 520px;
    position: fixed;
    color: black;
     
}

.ageFilter{
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    position: fixed;
    top: 210px;
    left: 560px;
    width: 110px;
   
}

.ageRangeFilterLabel{
    top: 270px;
    left: 775px;
    position: fixed;
    color: black;
     
}

.ageRangeFilter{
    top: 300px;
    left: 765px;
    position: fixed;
    color: black;
   
}


.birthMonthFilterLabel{
      top: 220px;
    left: 685px;
    position: fixed;
    color: black;
     
}

.birthMonthFilter{
    top: 212px;
    left: 780px;
    position: fixed;
    color: black;
   
}


.departmentFilterLabel{
      top: 280px;
    left: 520px;
    position: fixed;
    color: black;
   
    
    
}

.departmentFilter{
    top: 272px;
    left: 630px;
    position: fixed;
    color: black;
   
    
    
}


.downloadAttendanceButton{
        top: 165px;
    left: 310px;
    position: fixed;
    background-color: #92c1c0 !important;
    color: black;
    border-radius: 10px;
    
    
}








.table-container {
    max-height: 450px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    position: fixed;
    top: 170px;
    left: 300px;
    width: 850px;
    padding-top: 50px;
}

table {
  width: 100%; /* Ensure the table takes up the full width of the container */
  border-collapse: collapse; /* Ensure no gaps between table cells */
}

th, td {
  background-color: #f2f2f2;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
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
  z-index: 10000;
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
