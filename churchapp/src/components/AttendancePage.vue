<template>
  <div class="attendance-page">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="main-content">
      <Navbar />

      <h1>Attendance Management</h1>
      
      <!-- Form to Mark Attendance -->
      <form @submit.prevent="markAttendance" >
        <input type="text" v-model="name" placeholder="Enter Name" required  @keydown.enter="checkName" />
        <button type="submit"  >Mark Attendance</button>
      </form>

      <!-- Attendance List -->
      <h2>Attendance List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendanceList" :key="index" @click="populateName(record.name, record.membersId, record.attendanceStatus, record.attendanceID)">
            <td>{{ record.name }}</td>
            <td>{{ record.date }}</td>
            <td>{{ record.attendanceStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/GlobalNavbar.vue';  // Make sure to import your Sidebar component
import Navbar from '@/components/GlobalSidebar.vue';      // Make sure to import your Navbar component
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      name: '',
      isSearching: false,
      isMarkingAttendance: false,
      attendanceList: [],
      members_ID : '',
      currentStatus : '',
      attendanceIDS : '',
    };
  },
  methods: {
    async checkName() {
  console.info("About to check name");
  // If marking attendance is in progress, skip search
  if (this.isMarkingAttendance) return;

  this.isSearching = true;  // Set search flag
  console.log("Searching for:", this.name);

  try {
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

            let attendance = 'NotMarked'; // Default to 'ABSENT'
            let attendanceId = '';

            if (attendanceResponse.data.detail !== 'Attendance with the given member ID does not exist') {
              console.info('member attendance found')
              attendance = attendanceResponse.data.status;
              attendanceId = attendanceResponse.data.id
            }
            else{
              console.info('member attendance notfound')
              attendance = 'NotMarked';
            }

            const today = new Date().toLocaleDateString();
            const name = `${member.firstname} ${member.othername} ${member.lastname}`;
            this.attendanceList.push({ name: name, date: today, attendanceStatus: attendance, membersId : member.id, attendanceID : attendanceId });
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

  // Clear the search flag after search logic completes (if needed)
  setTimeout(() => {
    this.isSearching = false;
  }, 500); 
},




  async markAttendance() {
      if (this.isSearching) return;

      this.isMarkingAttendance = true; 

      console.info("you are in markAttendance")
      console.info("member id", this.members_ID)

      const names = this.name.split(" ");
      const firstnames = names[0] || '';       // First name
      const othernames = names[1] || '';       // Middle name (if available)
      const lastnames = names[2] || '';   

      console.info("firstname", firstnames)
      console.info("lastname", othernames)
      console.info("othername", lastnames)
      console.info("attendance Status", this.currentStatus)
      console.info("attendance Id", this.attendanceIDS)

      let nowStatus = '' ;
      if (this.currentStatus !== 'NotMarked'){

          if (this.currentStatus === 'PRESENT') {
        nowStatus = 'ABSENT';
            } else if (this.currentStatus === 'ABSENT') {
                nowStatus = 'PRESENT'; // Change this if you want a different logic
            }

        try {
          const response = await axios.patch(`https://churchmsbackend.onrender.com/attendance/update_individual_attendance_fields/${this.attendanceIDS}`, {
            // Include the fields and new values you want to update
            status: nowStatus,
            
          });
      

      console.info("this is me",response)
      console.info("dghjk ",response.data)
        if (response.data ) {
          console.info("pass the if")
          console.info("Attendance list is being updated")
          this.attendanceList = [];
          this.attendanceList.push({ name: response.data.fullname, date: response.data.date , attendanceStatus: response.data.status});
          this.name = '';

          setTimeout(() => {
            this.isMarkingAttendance = false;
          }, 500);

        } else {
          alert('Invalid Attendance details');
        }

      }
      catch{
          
          console.info("Attendance not created, Try again");
      }


      }

      else{

      try {
          const response = await axios.post('https://churchmsbackend.onrender.com/attendance/create_attendance',{
            memberID: this.members_ID,
            firstname: firstnames,
            lastname: lastnames,
            othername: othernames,
            status: 'PRESENT',


          
      });

      console.info(response)
        if (response.data.message === 'Attendance creation successful') {

          console.info("Attendance list is being updated")
          this.attendanceList = [];
          this.attendanceList.push({ name: response.data.Attendance.fullname, date: response.data.Attendance.date , attendanceStatus: response.data.Attendance.status});
          this.name = '';

          setTimeout(() => {
            this.isMarkingAttendance = false;
          }, 500);

        } else {
          alert('Invalid Attendance details');
        }

      }
      catch{
          
          console.info("Attendance not created, Try again");
      }
      }
      
    },

   


    populateName(selectedName, member_ids,status, attendanceId ) {
      console.info("am here too")
      this.name = selectedName;
      this.members_ID = member_ids;
      this.currentStatus = status;
      this.attendanceIDS = attendanceId;
    }
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
    top: 270px;
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

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4070f4;
  color: white;
  cursor: pointer;
}

table {
  width: 40%;
  border-collapse: collapse;
  position: fixed;
  top: 300px;
  left:450px;
}

table, th, td {
  border: 1px solid #ccc;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
