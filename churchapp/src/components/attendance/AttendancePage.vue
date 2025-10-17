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
              <th>Marked By</th>
              <th>Time Marked</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in attendanceList" :key="index" @click="populateName(record.name, record.membersId, record.attendanceStatus, record.attendanceIDS, record.members_Id, record.attendanceID)">
              <td>{{ record.name }}</td>
              <td>{{ record.date }}</td>
              <td>{{ record.attendanceStatus }}</td>
              <td>{{ record.serviceType }}</td>
              <td>{{ record.markedBy }}</td>
              <td>{{ record.timeMarked }}</td>
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
      activeUser: sessionStorage.getItem("username")
,
      services: ['First Service', 'Second Service', 'Third Service'],
      selectedService : '',
      name: '',
      isSearching: false,
      isMarkingAttendance: false,
      isEditingAttendance: false,
      attendanceList: [],
      members_ID : '',
      membersID : '',
      currentStatus : '',
      attendanceIDS : '',
    };
  },

  computed: {
    isAdmin() {
      return sessionStorage.getItem("userRole") === 'ADMIN' ||sessionStorage.getItem("userRole") === 'ADMINISTRATOR' ;
    }
  },

  methods: {
    // https://churchmsbackend.onrender.com

    async checkName() {
      this.loading = true; 

  console.info("About to check name");
  // If marking attendance is in progress, skip search
  if (this.isMarkingAttendance) return;

  this.isSearching = true;  // Set search flag
  this.name = this.name.replace(/\s+/g, ' ');
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
            console.info('Not Marked >>>>',member.memberID);
            const attendanceResponse = await axios.get(`https://churchmsbackend.onrender.com/attendance/get_attendance_by_member_id/${member.memberID}`);
            console.info(attendanceResponse);

            let attendance = 'Not Marked'; // Default to 'ABSENT'
            let attendanceId = '';
            let service_type = '';
            let markedBy = '';
            let timeMarked = '';

            if (attendanceResponse.data.detail !== 'Attendance with the given member ID does not exist') {
              console.info('member attendance found')
              attendance = attendanceResponse.data.status;
              attendanceId = attendanceResponse.data.id;
              this.attendanceIDS = attendanceResponse.data.id;
              service_type = attendanceResponse.data.serviceType;
              markedBy = attendanceResponse.data.markedBy;
              timeMarked = attendanceResponse.data.createdOn;
            }
            else{
              console.info('member attendance not found')
              attendance = 'Not Marked';
              service_type = 'Not Indicated';
              markedBy = 'Not Indicated';
              timeMarked = 'Not Indicated';
            }

            let firstname = member.firstName || "";
            let othername = member.middleName || "";
            let lastname = member.lastName || "";

            const today = new Date().toLocaleDateString();
            const name = `${firstname} ${othername} ${lastname}`;
            this.attendanceList.push({ name: name, date: today, attendanceStatus: attendance, membersId : member.id, members_Id : member.memberID, attendanceIDS : attendanceId, serviceType: service_type, markedBy:markedBy,timeMarked: timeMarked});
          } catch (attendanceError) {
            console.error("Error fetching attendance:", attendanceError);
          }
        }

        // this.name = ''; // Clear search input after processing
      }
    } 
  } catch (error) {
    console.error("Member data query error:", error);
    alert("An error occurred during member data query process. Please try again.");
  }
  finally {
        this.loading = false; // Hide loading screen
      }



    try {
          // https://churchmsbackend.onrender.com
          const response = await axios.get(`https://churchmsbackend.onrender.com/first_timers/get_first_timer_by_name/${this.name}`);
          console.info(response); 

          if (response.data.detail !== 'First timers with the given names do not exist') {
            console.info("First timer found");

            if (response.data.length > 0) {
              console.info("Appending First Timer");
              
              // Clear current list (if needed)
            //this.attendanceList = []; 

              // Using for...of to handle asynchronous requests within loop
              for (const firstTimer of response.data) {
                
                try {
                  console.info('Not Marked >>>>',firstTimer.id);
                  const attendanceResponse = await axios.get(`https://churchmsbackend.onrender.com/attendance/get_attendance_by_member_id/${firstTimer.id}`);
                  console.info('attendance response for first timers',attendanceResponse);

                  let attendance = 'Not Marked'; // Default to 'ABSENT'
                  let attendanceId = '';
                  let service_type = '';
                  let markedBy = '';
                  let timeMarked = '';

                  if (attendanceResponse.data.detail !== 'Attendance with the given member ID does not exist') {
                    console.info('First Timer attendance found')

                    attendance = attendanceResponse.data.status;
                    attendanceId = attendanceResponse.data.id;
                    this.attendanceIDS = attendanceResponse.data.id;
                    service_type = attendanceResponse.data.serviceType;
                    markedBy = attendanceResponse.data.markedBy;
                    timeMarked = attendanceResponse.data.createdOn;
                  }
                  else{
                    console.info('first timer attendance not found')
                    attendance = 'Not Marked';
                    service_type = 'Not Indicated';
                    markedBy = 'Not Indicated';
                    timeMarked = 'Not Indicated';
                  }

                  
                  const today = new Date().toLocaleDateString();
                  
                  this.attendanceList.push({ name: firstTimer.name, date: today, attendanceStatus: attendance, membersId : firstTimer.id, attendanceIDS : attendanceId, serviceType: service_type, markedBy:markedBy,timeMarked: timeMarked});
                } catch (attendanceError) {
                  console.error("Error fetching attendance for first timers:", attendanceError);
                }
              }

              this.name = ''; // Clear search input after processing
                    
            }

          }
        }

        catch (error) {
          console.error("First timer data query error:", error);
          alert("An error occurred during first timer data query process. Please try again.");
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

    
      if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      console.info("YES")
      if (this.isSearching) {
      console.info("its searching")
      return;
      }

      if (this.isEditingAttendance ) {
        console.info("YES editing")
        return;
        }

      if(this.name == ''){
        alert('Please click on the name before you start an action');
        return;
      }

      if (this.currentStatus == "ABSENT" || this.currentStatus == "PRESENT" ) {
        console.info("YESSSS")
        alert('Attendance marked for this member.')
        this.name = "";
        this.attendanceList = [];
        return;
      }

      this.isMarkingAttendance = true; 

      console.info("you are in markAttendance")
      console.info("member id", this.members_ID) 
      console.info("testing", this.membersID) 

      
      console.info("name", this.name)
      console.info("attendance Status", this.currentStatus)
      console.info("attendance Id", this.attendanceIDS)

      this.loading = true;
      

      console.log("Sending Data:", {
    memberID: this.members_ID || "",
    name : this.name,
    status: 'PRESENT',
    serviceType: this.selectedService || "",
    markedBy : this.activeUser,
      }
      );

    if (this.members_ID !== ""){
      try {
          const response = await axios.post('https://churchmsbackend.onrender.com/attendance/create_attendance',{
            memberID: this.membersID,
            name : this.name,
            status: 'PRESENT',
            serviceType : this.selectedService || "Not Indicated",
            markedBy : this.activeUser,
          
      });

      console.info(response)
        if (response.data.message === 'Attendance creation successful') {

          console.info("Attendance list is being updated")
          
         // this.attendanceList = [];
         this.attendanceList = this.attendanceList.filter(item => item.membersId !== this.members_ID );
          this.attendanceList.push({ name: response.data.Attendance.fullName, 
            date: response.data.Attendance.date , 
            attendanceStatus: response.data.Attendance.status, 
            serviceType: response.data.Attendance.serviceType || "Not Indicated", 
            attendanceIDS : response.data.Attendance.id, 
            markedBy : response.data.Attendance.markedBy,
            timeMarked : response.data.Attendance.createdOn});
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
          this.attendanceList = []

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
    }else{
      alert("Member not found. Please press Enter to search for the name before marking attendance.");
      this.loading = false;
      this.name = '';
      this.attendanceList = []
      this.isMarkingAttendance = false;
    }
  
      
  }},

    async editAttendance() {

       if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{

      if (this.isSearching) return;

      if(this.isMarkingAttendance) return; 

      this.isEditingAttendance = true; 
      if(this.name == ''){
        alert('Please click on the name before you start an action');
        return;
      }

      if(this.attendanceList[0].attendanceStatus == 'Not Marked'){
        alert('Please mark attendance first before you edit it.');
        this.name = '';
        this.attendanceList = [];
        this.isEditingAttendance = false;
        return;
      }

      console.info("Editing Attendance")
      console.info("Edittendance : ", this.attendanceList)

if (this.attendanceIDS !== ""){
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
          console.info("id : ", this.attendanceIDS )
          const response = await axios.patch(`https://churchmsbackend.onrender.com/attendance/update_individual_attendance_fields/${this.attendanceIDS}`, {
            // Include the fields and new values you want to update
            status: nowStatus,
            serviceType : this.selectedService,
            markedBy : this.activeUser,
            
          });
      

      console.info("this is me",response)
      console.info("dghjk ",response.data)
        if (response.data ) {
          console.info("pass the if")
          console.info("Attendance list is being updated")
          this.attendanceList = this.attendanceList.filter(item => item.membersId !== this.members_ID );
          this.attendanceList.push({ name: response.data.fullName, date: response.data.date , attendanceStatus: response.data.status, serviceType: response.data.serviceType, attendanceID : response.data.id, markedBy:response.data.markedBy,timeMarked:response.data.updatedOn });
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
}else{
  alert("Attendance for this Member not found. Please check if attendance is marked before selecting Edit Attendance");
      this.loading = false;
      this.name = '';
      this.isEditingAttendance = false;
}
  
    }},

   


    populateName(selectedName, member_ids,status, attendanceId, membersID, attendanceIds) {

      console.info("am here too paste")
      console.info("attendance list : ",this.attendanceList )
      this.name = selectedName;
      this.members_ID = member_ids;
      console.info("Member_ID: ",this.members_ID )
      this.currentStatus = status;
      this.membersID = membersID
      this.attendanceIDS = attendanceId ?? attendanceIds;
      console.info("ID: ",this.attendanceIDS )
    }


  },

   mounted() {
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
