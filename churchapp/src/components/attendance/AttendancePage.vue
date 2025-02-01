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

      <h1>Attendance Management</h1>
      
      <!-- Form to Mark Attendance -->
      <form @submit.prevent >
        <input type="text" v-model="name" placeholder="Enter Name" required  @keydown.enter="checkName" />

        <select v-model="selectedService" >
          <option disabled value="">Select service Type</option>
          <option v-for="service in services" :key="service" :value="service">
            {{ service }}
          </option>
        </select>


        <button type="button" @click.prevent="markAttendance">Mark Attendance</button>
        <button type="button" @click.prevent="editAttendance">Edit Attendance</button>

      </form>

      <!-- Attendance List -->
      <h2>Attendance List</h2>

      <div class="table-container" >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Attendance Status</th>
              <th>Service Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in attendanceList" :key="index" @click="populateName(record.name, record.membersId, record.attendanceStatus, record.attendanceID)">
              <td>{{ record.name }}</td>
              <td>{{ record.date }}</td>
              <td>{{ record.attendanceStatus }}</td>
              <td>{{ record.serviceType }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar  from '@/components/GlobalNavbar.vue';  // Make sure to import your Sidebar component
import UserSidebar from '@/components/GlobalSidebar.vue';      // Make sure to import your Navbar component
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

      services: ['First Service', 'Second Service', 'Third Service'],
      selectedService : '',
      name: '',
      isSearching: false,
      isMarkingAttendance: false,
      isEditingAttendance: false,
      attendanceList: [],
      members_ID : '',
      currentStatus : '',
      attendanceIDS : '',
    };
  },

  computed: {
    isAdmin() {
      return localStorage.getItem("userRole") === 'ADMIN';
    }
  },

  methods: {

    async checkName() {
      this.loading = true; 

  console.info("About to check name");
  // If marking attendance is in progress, skip search
  if (this.isMarkingAttendance) return;

  this.isSearching = true;  // Set search flag
  console.log("Searching for:", this.name);

  try {
    // https://churchmsbackend.onrender.com
    const response = await axios.get(`https://churchmsbackend.onrender.com/members/get_member_by_words/${this.name}`);
    console.info(response); 

    // Check if members were found
    if (response.data.detail !== 'Members with the given names do not exist') {
      console.info("Member found");

      if (response.data.length > 0) {
        console.info("Appending members");
        
        // Clear current list (if needed)
        this.attendanceList = []; 
      
        // Using for...of to handle asynchronous requests within loop
        for (const member of response.data) {
          try {
            const attendanceResponse = await axios.get(`https://churchmsbackend.onrender.com/attendance/get_attendance_by_member_id/${member.id}`);
            console.info(attendanceResponse);

            let attendance = 'Not Marked'; // Default to 'ABSENT'
            let attendanceId = '';
            let service_type = '';

            if (attendanceResponse.data.detail !== 'Attendance with the given member ID does not exist') {
              console.info('member attendance found')
              attendance = attendanceResponse.data.status;
              attendanceId = attendanceResponse.data.id
              service_type = attendanceResponse.data.serviceType
            }
            else{
              console.info('member attendance notfound')
              attendance = 'Not Marked';
              service_type = 'Not Indicated'
            }

            let firstname = member.firstname || "";
            let othername = member.othername || "";
            let lastname = member.lastname || "";

            const today = new Date().toLocaleDateString();
            const name = `${firstname} ${othername} ${lastname}`;
            this.attendanceList.push({ name: name, date: today, attendanceStatus: attendance, membersId : member.id, attendanceID : attendanceId, serviceType: service_type});
          } catch (attendanceError) {
            console.error("Error fetching attendance:", attendanceError);
          }
        }

        this.name = ''; // Clear search input after processing
      }
    } else {
      alert(response.data.detail);
    }
  } catch (error) {
    console.error("Attendance error:", error);
    alert("An error occurred during attendance processing. Please try again.");
  }
  finally {
        this.loading = false; // Hide loading screen
      }

  // Clear the search flag after search logic completes (if needed)
  setTimeout(() => {
            this.isSearching = false;
          }, 10);
},




  async markAttendance() {
    
      if (this.isSearching) {
      console.info("its searching")
      return;}
      if (this.isEditingAttendance) return;

      this.isMarkingAttendance = true; 

      console.info("you are in markAttendance")
      console.info("member id", this.members_ID) 

      
      console.info("name", this.name)
      console.info("attendance Status", this.currentStatus)
      console.info("attendance Id", this.attendanceIDS)

      this.loading = true;
      

      console.log("Sending Data:", {
    memberID: this.members_ID || "",
    name : this.name,
    status: 'PRESENT',
    serviceType: this.selectedService || "",
});

      try {
          const response = await axios.post('https://churchmsbackend.onrender.com/attendance/create_attendance',{
            memberID: this.members_ID,
            name : this.name,
            status: 'PRESENT',
            serviceType : this.selectedService || "",
            


          
      });

      console.info(response)
        if (response.data.message === 'Attendance creation successful') {

          console.info("Attendance list is being updated")
          this.attendanceList = [];
          this.attendanceList.push({ name: response.data.Attendance.fullname, date: response.data.Attendance.date , attendanceStatus: response.data.Attendance.status, serviceType: response.data.Attendance.serviceType, attendanceID : response.data.Attendance.id});
          this.name = '';

          setTimeout(() => {
            this.isMarkingAttendance = false;
          }, 10);

        } 

        else if (response.data ==='Attendance marked for this member'){
          alert('Attendance marked for this member.');

          this.name = '';
          
          setTimeout(() => {
            this.isMarkingAttendance = false;
          }, 10);
          return;
          
        }

        else {
          console.info("current response ", response.data)
          alert('Invalid Attendance details');
          this.name = '';

          setTimeout(() => {
            this.isMarkingAttendance = false;
          }, 10);

          return;
        }

        console.info("still in marking")

      }
      catch{
          
          console.info("Attendance not created, Try again");
      }
      finally {
        this.loading = false; // Hide loading screen
      }
      
      
    },

    async editAttendance() {

      if (this.isSearching) return;

      if(this.isMarkingAttendance) return; 

      this.isEditingAttendance = true; 

      console.info("Editing Attendance")

      let nowStatus = '' ;
      if (this.currentStatus !== 'NotMarked'){
          console.info("in if ")
          if (this.currentStatus === 'PRESENT') {
        nowStatus = 'ABSENT';
            } else if (this.currentStatus === 'ABSENT') {
                nowStatus = 'PRESENT'; // Change this if you want a different logic
            }

      this.loading = true;
        try {
          console.info("with editing endpoint")
          const response = await axios.patch(`https://churchmsbackend.onrender.com/attendance/update_individual_attendance_fields/${this.attendanceIDS}`, {
            // Include the fields and new values you want to update
            status: nowStatus,
            serviceType : this.selectedService,
            
          });
      

      console.info("this is me",response)
      console.info("dghjk ",response.data)
        if (response.data ) {
          console.info("pass the if")
          console.info("Attendance list is being updated")
          this.attendanceList = [];
          this.attendanceList.push({ name: response.data.fullname, date: response.data.date , attendanceStatus: response.data.status, serviceType: response.data.serviceType, attendanceID : response.data.id});
          console.info("this is now the new id", this.attendanceIDS), 
          this.name = '';

          setTimeout(() => {
            this.isEditingAttendance = false;
          }, 10);

        } else {
          alert('Invalid Attendance details');
        }

      }
      catch{
          
          console.info("Attendance not updated, Try again");
      }
      finally {
        this.loading = false; // Hide loading screen
      }


      }
  
    },

   


    populateName(selectedName, member_ids,status, attendanceId ) {
      console.info("am here too paste")
      this.name = selectedName;
      this.members_ID = member_ids;
      this.currentStatus = status;
      this.attendanceIDS = attendanceId;
    }


  },

   mounted() {
    // Clear local storage when the tab or window is closed
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
  }


};



</script>

<style scoped>

h1{
      position: fixed;
    top: 130px;
    left: 450px;
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

form {
  margin-bottom: 20px;
  position: fixed;
  top: 200px;
  left:450px;
}

input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select{
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
}

.table-container {
  max-height: 320px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    position: fixed;
    top: 300px;
    left: 300px;
    width: 850px;
}

table {
  width: 100%; /* Ensure the table takes up the full width of the container */
  border-collapse: collapse; /* Ensure no gaps between table cells */
}

th, td {
  background-color: #f2f2f2;
  padding: 10px;
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
th {
  width: 800px;
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
