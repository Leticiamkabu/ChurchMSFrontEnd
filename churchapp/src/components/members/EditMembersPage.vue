<template>
  <div class="attendance-page">

  <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading, please wait...</p>
    </div>

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="main-content">
      <Navbar />
      <form @submit.prevent >
        <input type="text" v-model="name" placeholder="Enter Name" required  @keydown.enter="checkName" />


        <button type="button" @click.prevent="checkName">Search Member</button>
        

      </form>


      <!-- Button Actions -->
      <section class="left_view">
        <button class="button4" @click="getMembers">Get Members</button>
      </section>

      <!-- User Table -->
      <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Member Status</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in memberList" :key="index" >
            <td>{{ record.name }}</td>
            <td>{{ record.phoneNumber }}</td>
            <td>{{ record.memberStatus }}</td>
             <td>
                <button class = "edit" @click="editUser(record)">Edit</button>
                <button class = "delete" @click="deleteUser(record)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <!-- Modal to edit user details -->
      <div v-if="showEditModal" @submit.prevent="updateUserDetails" class="modal-overlay">
        <div class="modal-card">
          <h2>Update User </h2>
          
          <label class = "firstN" >First Name</label>
          <input class = "firstN-input" v-model="form.firstname" type="text" />

          <label class = "lastN" >Last Name</label>
          <input class = "lastN-input" v-model="form.lastname" type="text" />

          <label class = "emailL" >Email</label>
          <input class = "email-input" v-model="form.email" type="email" />

          <label class = "phoneN" >Phone Number</label>
          <input class = "phoneN-input" v-model="form.phoneNumber" type="text" />

          <label class = "passwordL" >Password</label>
          <input class = "passwordL-input" v-model="form.password" type="password" />

          <label class = "roleL" >Role</label>
          <select class = "roleL-input" v-model="form.role">
            <option disabled value="">Select Role</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>

          <label class = "privi">Privileges</label>
          <div>
            <label>
              <input class = "privi1" type="checkbox" v-model="form.privileges" value="Add members" />
              <span class="privi1-text">Add Members</span> 
            </label>
            <label>
              <input class = "privi2" type="checkbox" v-model="form.privileges" value="Take Attendance" />
              <span class="privi2-text">Take Attendance</span>
            </label>
            <label>
              <input class = "privi3" type="checkbox" v-model="form.privileges" value="Create Users" /> 
              <span class="privi3-text">Create Users</span>
            </label>
            <label>
              <input class = "privi4" type="checkbox" v-model="form.privileges" value="Get Attendance Overview" /> 
              <span class="privi4-text">Get Attendance Overview</span>
            </label>
            <label>
              <input class = "privi5" type="checkbox" v-model="form.privileges" value="Get Member Details" /> <!-- Get Member Details -->
              <span class="privi5-text">Get Member Details</span>
            </label>
          </div>

          <button class = "updateb"  @click="updateUserDetails">Save Changes</button>
          <button class = "cancelb"  @click="showEditModal = false">Cancel</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/GlobalNavbar.vue';
import Navbar from '@/components/admin/AdminSidebar.vue';
import axios from 'axios';

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      loading: false,

      showEditModal: false,
      user_id: '',
      memberList: [],
      roles :['ADMIN', 'DATA CLERK', 'ADMINISTRATOR'],
      form: {
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: '',
      privileges: [],
      },
    };
  },

  methods: {

    async fetchSummaryData() {
      this.loading = true; 
      try {
        const response = await axios.get('http://localhost:5000/attendance/get_attendance_for_the_current_day');
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

    async getMembers() {
      this.loading = true; 
      try {
        const response = await axios.get('http://localhost:5000/members/get_all_members');
        
        console.info("member list", response.data)
        if (response.data !== 'No user data exists') {
          this.memberList = response.data.map(members => ({
          name: members.firstname + ' ' + members.lastname ,
          phoneNumber: members.phoneNumber,
          memberStatus: members.memberStatus,
          member_id: members.id,
        
    }));
    } else {this.attendanceList = response.data;
        this.memberList = [];  // Clear the list if no data is found
    }

      } catch (error) {
        console.error('Error fetching user list:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }
    },

  async editUser(record) {
    this.loading = true;
      console.error('getting details to update')

       try {
        const response = await axios.get(`http://localhost:5000/auth/get_user_by_id/${record.user_id}`);
        
        console.info("user data", response.data)

        if (response.data) {
          const user = response.data;

          // Populate the form with fetched user details
          this.form = {
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            password:user.password || "", // Leave password empty for security reasons
            role: user.role || "",
            privileges: user.privileges ? user.privileges.split(",") : []
          }
        
        // Mask the password for display
        this.maskedPassword = "*****";
        this.user_id = user.id
        this.showEditModal = true;

        } else {
          alert("Error getting user data"); 
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }

      

      
    },

    isFormValid() {
      return (
        this.form.firstname &&
        this.form.lastname &&
        this.form.email &&
        this.form.phoneNumber &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.role &&
        this.form.privileges
      );
      
    },

    async updateUserDetails() {
      this.loading = true; 
      if (this.isFormValid) {
        console.info("in the registeration function")
        
        

        // Prepare data payload for backend
        const payload = {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          phoneNumber: this.form.phoneNumber,
          password: this.form.password,
          role: this.form.role,
          privileges: this.form.privileges,
        };

        console.log("Form is valid. Proceeding with user update...", payload);

        try {
          const response = await axios.patch(`http://localhost:5000/auth/update_individual_user_fields/${this.user_id}`, {
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            email: this.form.email,
            phoneNumber: this.form.phoneNumber,
            password: this.form.password,
            role: this.form.role,
            privileges: this.form.privileges,
          });

          console.info(response)
          if (response.data ) {
           
            alert("User updated successfully");
            this.showEditModal = true;

          } else {
            console.info("error response for registeration ",response)
            alert("User details update failed");
          }
        } catch (error) {
        console.error("Registeration error:", error);
        alert("An error occurred during registeration. Please try again.");
        }
        finally {
        this.loading = false; // Hide loading screen
      }
        
        

      } else {
        console.log("Form is invalid");
        alert("Form is invalid. Please try again.");
      }
    },

    

    

    
    async deleteUser(record) {
      this.loading = true; 
      console.info("this is the current record: ", record)

      try {
        console.info("user_id: ", record.user_id)
        const confirmDelete = window.confirm(`Are you sure you want to delete the user with the name "${record.email}"?`);

        if (confirmDelete) {
          const response = await axios.delete(`http://localhost:5000/auth/delete_user_by_id/${record.user_id}`);
          
          console.info(" delete response ", response)
          if (response.data !== 'User not found') {
            this.memberList = this.memberList.filter(user => user.user_id !== record.user_id);
            alert("User deleted successfully."); 

          } else {
            alert("User with name {} not found.");
              
          }

        } else {
          // If the user cancels the deletion
          console.info("User deletion cancelled.");
        }

      } catch (error) {
        console.error('Error deleting user', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }
    },


    async checkName() {
  console.info("About to check name");
  // If marking attendance is in progress, skip search
  //if (this.isMarkingAttendance) return;

  //this.isSearching = true;  // Set search flag
  //console.log("Searching for:", this.name);
this.loading = true; 
  try {
    // https://churchmsbackend.onrender.com
    const response = await axios.get(`http://localhost:5000/members/get_member_by_words/${this.name}`);
    console.info(response); 

    // Check if members were found
    if (response.data.detail !== 'Members with the given names do not exist') {
      console.info("Member found");

      if (response.data.length > 0) {
        console.info("Appending members");
        
        // Clear current list (if needed)
        this.memberList = []; 
      
        this.memberList = response.data.map(members => ({
          name: members.firstname + ' ' + members.lastname ,
          phoneNumber: members.phoneNumber,
          memberStatus: members.memberStatus,
          member_id: members.id,
        
          }));

        this.name = ''; // Clear search input after processing

      }
    } else {
      alert(response.data.detail);
    }
  } catch (error) {
    console.error("Member search error:", error);
    alert("An error occurred during member search processing. Please try again.");
  }
  finally {
        this.loading = false; // Hide loading screen
      }

  // Clear the search flag after search logic completes (if needed)
  //setTimeout(() => {
    //        this.isSearching = false;
       //   }, 10);
},

    
  },


  mounted() {
    // Automatically fetch summary data when the component is mounted
    this.fetchSummaryData();


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
}

.passwordL{
  color: white;
      position: fixed;
    top: 450px;
    left: 420px;
    font-size: 20px;
}

.passwordL-input{
  background-color: white;
    position: fixed;
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
  max-height: 500px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    position: fixed;
    top: 170px;
    left: 300px;
    width: 850px;
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
