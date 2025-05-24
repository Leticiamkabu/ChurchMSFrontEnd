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
      <form @submit.prevent >
        <input type="text" v-model="name" placeholder="Enter Name" required  @keydown.enter="checkName" />


        <button type="button" @click.prevent="checkName">Search First Timer</button>
        

      </form>


      <!-- Button Actions -->
      <section class="left_view">
        <button class="button1" @click="getFirstTimers">Get First Timers</button>
      </section>

     <section class="left_view">
        <input  type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
        <button class="button4" @click="openFileDialog">Upload Data</button>
      </section>

      <section class="left_view">
        <button class="button3" @click="downloadSampleData">Download Sample File </button>
      </section>

      <section class="left_view">
        <button class="button2" @click="toggleDownloadDropdown" >Download Data</button>
        <ul v-if="showDownloadDropdown" class="download-dropdown-menu">
          <li @click="downloadFirstTimers('Excel')" >Download as Excel</li>
          
        </ul>
      </section>

      <!-- User Table -->
      <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in FirstTimersList" :key="index" >
            <td>{{ record.name }}</td>
            <td>{{ record.phoneNumber }}</td>
            <td>{{ record.houseLocation }}</td>
             <td>
                <button class = "edit" @click="editFirstTimer(record)">Edit</button>
                <button class = "delete" @click="deleteMember(record)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <!-- Modal to edit member details -->
      <div v-if="showEditModal" @submit.prevent="updateMemberDetails" class="modal-overlay">
        <div class="modal-card">
        
        <div v-if="step === 1" class = "first_info">
            <h2>First Timer Edit Model</h2>

            <label class = "label_name" for="name">Name <span class="required-star">*</span> </label>
            <input class = "name" type="text" v-model="form.name" id="name" placeholder="Name" />

            <label class = "label_popular_name" for="middleName">Popular Name</label>
            <input class = "popular_name" type="text" v-model="form.popularName" id="middleName" placeholder="Middle Name"  />

            <label class = "label_phone_number" for="phoneNumber">Phone Number <span class="required-star">*</span> </label>
            <input  class = "phone_number" type="text" v-model="form.phoneNumber" id="phoneNumber" placeholder="Phone Number"  />

            <label class = "label_whatsapp_number" for="whatAppNumber">WhatsApp Number </label>
            <input  class = "whatsapp_number" type="text" v-model="form.whatAppNumber" id="whatAppNumber" placeholder="WhatApp Number"  />

            <label class = "label_house_location" for="houseLocation">House Location <span class="required-star">*</span> </label>
            <input class = "house_location" type="text" v-model="form.houseLocation" id="houseLocation" placeholder="House Location"  />

            <button  type="button" @click="nextStep">Next</button>
          </div>


          <div v-if="step === 2">

            <label class = "label_purpose_of_coming" for="auw">Purpose Of Coming <span class="required-star">*</span> </label>
            <select class = "purpose_of_coming" v-model="form.purposeOfComing" id="auw"  >
              <option disabled value="">Select Purpose Of Coming</option>
              <option v-for="purpose in purposeOfComing" :key="purpose" :value="purpose">
                {{ purpose }}
              </option>
            </select>

            <label class = "label_contact_hours" for="contactHours"> Contact Hours <span class="required-star">*</span> </label>
            <input class = "contact_hours" type="text" v-model="form.contactHours" id="contactHours" placeholder="Contact Hours"  />

            <label class = "label_special_prayer_or_counseling" for="auw">Special Prayer Or Counseling</label>
            <select class = "special_prayer_or_counseling" v-model="form.specialPrayerOrCounseling" id="auw"  >
              <option disabled value="">Select Special Prayer Or Counseling</option>
              <option v-for="special in specialPrayerOrCounseling" :key="special" :value="special">
                {{ special }}
              </option>
            </select>
            

            <label class = "label_counselor" for="counselor">Counselor</label>
            <input class = "counselor" type="text" v-model="form.counselor" id="counselor" placeholder="Counselor"  />

            <label class = "label_date" for="date">Date</label>
            <input  class = "date" type="date" v-model="form.date" id="institutionName" placeholder="Date"  />

            <button class = "s2preveBut" type="button" @click="prevStep">Previous</button>
            <button class = "s2nextBut" type="button" @click="updateFirstTimersDetails">Submit</button>
          </div>

        </div>
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
      step: 1,
      //image :'',
      imageUrl: { url: "" },
      selectedImage : '',
      showDownloadDropdown: false, 
      selectedFile : null,

      showEditModal: false,
      first_timer_id: '',
      FirstTimersList: [],

      purposeOfComing: ['VISIT', 'MEMBERSHIP', 'REDEDICATION' ] ,
      specialPrayerOrCounseling: ['BUSINESS', 'HEALTH', 'DELIVERANCE', 'MARITAL', 'EDUCATIONAL', 'OTHERS' ], 
      

      form: {
        name: '',
        popularName: '',
        phoneNumber: '',
        whatAppNumber: '',
        houseLocation: '',
        purposeOfComing: '',
        contactHours: '',
        specialPrayerOrCounseling: '',
        counselor: '',
        date: '',
      
      },
    };
  },

  computed: {
    isAdmin() {
      return sessionStorage.getItem("userRole") === 'ADMIN';
    }
  },

  methods: {

    toggleDownloadDropdown() {
      this.showDownloadDropdown = !this.showDownloadDropdown;
      if(this.FirstTimersList){
        this.FirstTimersList = [];
      }
      
    },

    //https://churchmsbackend.onrender.com

    async getFirstTimers() {
        this.loading = true; 
        this.showDownloadDropdown = false
        try {
          const response = await axios.get('https://churchmsbackend.onrender.com/first_timers/get_all_first_timers');
          
          console.info("First timers list", response.data)
          if (response.data !== 'No first timers data exists') {

            

            this.FirstTimersList = response.data.map(firstTimer => ({

            name: firstTimer.name,
            phoneNumber: firstTimer.phoneNumber,
            houseLocation: firstTimer.houseLocation,
            first_timer_id: firstTimer.id,
            }

            ))

            
          } else {

          this.memberList = [];  // Clear the list if no data is found
          
          }
        } catch (error) {
          console.error('Error fetching first timer list:', error);
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
          
          const response = await axios.get(`https://churchmsbackend.onrender.com/first_timers/get_first_timer_by_name/${this.name}`);
          console.info(response); 

          // Check if members were found
          if (response.data.detail !== 'First timers with the given names do not exist') {
            console.info("First timer found");

            if (response.data.length > 0) {
              console.info("Appending First timers");
              
              // Clear current list (if needed)
              this.FirstTimersList = []; 
            
              this.FirstTimersList = response.data.map(firstTimers => ({
                name: firstTimers.name,
                phoneNumber: firstTimers.phoneNumber,
                houseLocation: firstTimers.houseLocation,
                first_timer_id: firstTimers.id,
              
                }));

              this.name = ''; // Clear search input after processing

            }
          } else {
            alert(response.data.detail);
            this.name = '';
          }
        } catch (error) {
          console.error("First Timer search error:", error);
          alert("An error occurred during first timer search processing. Please try again.");
        }
        finally {
              this.loading = false; // Hide loading screen
            }

        // Clear the search flag after search logic completes (if needed)
        //setTimeout(() => {
          //        this.isSearching = false;
            //   }, 10);
    },


  async downloadFirstTimers(documentFormat) {
    this.showDownloadDropdown = false;
    this.FirstTimersList = [];

 if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      this.loading = true;
        console.info("In the download first timers function");

        try {
          // Fetch the file from the backend
          const response = await axios.get(`https://churchmsbackend.onrender.com/first_timers/download_first_timers_data/${documentFormat}`, {
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
          let fileName = 'CTC_First_Timers_data.xlsx';
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
          this.loading = false;
        } catch (error) {
          console.error("Error downloading the file:", error);
          this.loading = false;
        }}
      },


    async downloadSampleData() {
    this.showDownloadDropdown = false;
    this.FirstTimersList = [];

    console.info("In the download sample data function");
        this.loading = true;
        try {
          // Fetch the file from the backend
          const response = await axios.get(`https://churchmsbackend.onrender.com/first_timers/download_sample_upload_data_document`, {
            responseType: 'blob', // Specify response type as blob
          });

          console.info("Response:", response);

          // Create a Blob from the response
          const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          });

          console.info("File response converted:", blob);

          // Create a download link
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;

          // Use the filename provided by the backend or set a default one
          const contentDisposition = response.headers['content-disposition'];
          let fileName = 'CTC_First_Timers_Sample_document.docx';
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
          this.loading = false;
        } catch (error) {
          console.error("Error downloading the file:", error);
          this.loading = false;
        }
        },
    
    openFileDialog() {
      this.showDownloadDropdown = false;
      this.FirstTimersList = [];
      this.$refs.fileInput.click();

    },

    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.uploadFirstTimerData();
    },

    async uploadFirstTimerData() {
      this.showDownloadDropdown = false;
      this.showEditModal = false;
        this.loading = true; 

        if (!this.selectedFile) {
        alert('Please select a file first.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile); 

        try {
          const response = await axios.post('https://churchmsbackend.onrender.com/first_timers/upload-docx', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
          console.info("response from member data upload : " ,response )

          if (response.message == "First Timers added successfully"){
              alert(response.message , ". ", "Total number of users added = ",response.total_first_timers);

              if (response.skipped_first_timers !== []){
                alert("Data has been skipped")
              }

              //CLEAN DATA FUNCTION HERE


          }
          
          else{
            alert(response.detail);
          }
        } catch (error) {
          if (error.response.data.detail == "Error processing document: list index out of range"){
            alert("Document has no data. Please make sure your document contains data");
          }
          else{
            console.error("Uploading first timer data error: ", error);
        alert("An error occurred during first timer data upload. Please try again.");
          }
        
        }

        finally {
          this.loading = false; // Hide loading screen
        }
    },

    

    async editFirstTimer(record) {
       if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
    this.loading = true;
    this.showEditModal = true;
      console.error('getting first timer details to update')

      try {
        const response = await axios.get(`https://churchmsbackend.onrender.com/first_timers/get_first_timers_by_id/${record.first_timer_id}`);
        
        console.info("first timers data", response.data)

        if (response.data){
          const first_timer = response.data;

          // Populate the form with fetched first timer details
          this.form = {
            name: first_timer.name || "",
            popularName: first_timer.popularName || "",
            phoneNumber: first_timer.phoneNumber || "",
            whatAppNumber: first_timer.whatsAppNumber || "",
            houseLocation:first_timer.houseLocation || "",
            purposeOfComing:first_timer.purposeOfComing || "",
            contactHours: first_timer.contactHours || "",
            specialPrayerOrCounseling: first_timer.specialPrayerOrCounseling || "",
            counselor: first_timer.counselor || "",
            date: first_timer.date || "",
           
            
          }

          this.first_timer_id = record.first_timer_id;

        } else {
          alert("Error getting first timer data"); 
        }

      } catch (error) {
        console.error('Error fetching first timer data:', error);
      }

      
      finally {
        this.loading = false; // Hide loading screen
      }}
    }  , 
  



   nextStep() {
      if (this.step < 5) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },


    isFormValid() {
      return (
        this.form.popularName &&
        this.form.phoneNumber &&
        this.form.whatAppNumber &&
        this.form.houseLocation &&
        this.form.purposeOfComing &&
        this.form.contactHours &&
        this.form.gender &&
        this.form.specialPrayerOrCounseling &&
        this.form.counselor &&
        this.form.date
        
        
      );
      
    },


     handleImageUpload(event) {
      const file = event.target.files[0];
      console.info("in image handeler")
      console.info(file)
      if (file) {
        this.imageUrl.url = URL.createObjectURL(file); // Generate a preview URL
        this.selectedImage = file
      }

    },

     async updateFirstTimersDetails() {
 if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      this.loading = true; 

      if (this.isFormValid) {
        console.info("in the update first timers function")
        
        

        // Prepare data payload for backend
        const payload = {
          name: this.form.name,
          popularName: this.form.popularName,
          phoneNumber: this.form.phoneNumber,
          whatsAppNumber: this.form.whatAppNumber,
          houseLocation: this.form.houseLocation,
          purposeOfComing: this.form.purposeOfComing,
          contactHours: this.form.contactHours,
          specialPrayerOrCounseling: this.form.specialPrayerOrCounseling,
          counselor: this.form.counselor,
          date: this.form.date,
          
        };

        console.log("Form is valid. Proceeding with first timer update...", payload);
        console.log("id", this.first_timer_id)

        try {
          const response = await axios.patch(`https://churchmsbackend.onrender.com/first_timers/update_first_timers_by_id/${this.first_timer_id}`, {
            name: this.form.name,
          popularName: this.form.popularName,
          phoneNumber: this.form.phoneNumber,
          whatsAppNumber: this.form.whatAppNumber,
          houseLocation: this.form.houseLocation,
          purposeOfComing: this.form.purposeOfComing,
          contactHours: this.form.contactHours,
          specialPrayerOrCounseling: this.form.specialPrayerOrCounseling,
          counselor: this.form.counselor,
          date: this.form.date,
          });

          
          console.info(response.data)
          
          if (response.data.message === 'First timer details update successful'){
           
            alert("User updated successfully");
            this.step = 1;
            this.showEditModal =  false;
            

          }else{
            alert(response);
            this.step = 1;
            this.showEditModal =  false;
            

          }


        } catch (error) {
              console.error("Member data update error:", error);
              alert("An error occurred during member data update . Please try again.");
              this.showEditModal =  false;
              }
      

        finally {
        this.loading = false;
        this.showEditModal =  false; // Hide loading screen
        }
        
        
      
      } else {
        console.log("Form is invalid");
        alert("Form is invalid. Please try again.");
        this.loading = false;

      }}
    },


    async deleteMember(record) {
       if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      this.loading = true; 
      console.info("this is the current record: ", record)

      try {
        console.info(" First_timer_id: ", record.first_timer_id)
        const confirmDelete = window.confirm(`Are you sure you want to delete the first timer with the name "${record.name}"?`);

        if (confirmDelete) {
          const response = await axios.delete(`https://churchmsbackend.onrender.com/first_timers/delete_first_timers_by_id/${record.first_timer_id}`);
          
          console.info(" delete response ", response)
          if (response.data !== 'First_timer not found') {
            this.FirstTimersList = this.FirstTimersList.filter(user => user.first_timer_id !== record.first_timer_id);
            alert("First Timer deleted successfully."); 

          } else {
            alert("Member with name not found.");
              
          }

        } else {
          // If the user cancels the deletion
          console.info("First Timer deletion cancelled.");
        }

      } catch (error) {
        console.error('Error deleting first timer', error);
      }
      finally {
        this.loading = false; // Hide loading screen
      }}
    },






  }

}
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



.button1 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 90%;
  top: 26%;

}

.button2 {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 90%;
  top: 40%;

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
  left: 90%;
  top: 54%;

}

.button4 {
  padding: 17px;
  border: none;
  border-radius: 4px;
  background-color: #92c1c0;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  position: fixed;
  left: 90%;
  top: 68%;

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
    height: 75%;
    position: fixed;
    top: 20%;
    left: 31.5%;
}

.h2{
  color: white;
    position: fixed;
    top: 110px;
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





/* form for step 1 style*/

.first_info button{
        position: fixed;
    left: 75%;
    top: 87%;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.ha{
    position: fixed;
    left: 431px;
    top: 585px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}
.label_ha{
   position: fixed;
    left: 440px;
    top: 550px;
    font-size: 20px;
    color: aqua;

}


.ht{
        position: fixed;
    left: 790px;
    top: 510px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ht{
   position: fixed;
    left: 800px;
    top: 475px;
    font-size: 20px;
    color: aqua;

}

.ny{
    position: fixed;
    left: 431px;
    top: 510px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ny{
   position: fixed;
    left: 440px;
    top: 475px;
    font-size: 20px;
    color: aqua;

}

.ea{
    position: fixed;
    left: 790px;
    top: 432px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ea{
   position: fixed;
    left: 800px;
    top: 399px;
    font-size: 20px;
    color: aqua;

}

.pn{
    position: fixed;
    left: 431px;
    top: 432px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_pn{
   position: fixed;
    left: 440px;
    top: 399px;
    font-size: 20px;
    color: aqua;

}

.gn{
    position: fixed;
    left: 790px;
    top: 355px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_gn{
   position: fixed;
    left: 800px;
    top: 320px;
    font-size: 20px;
    color: aqua;

}

.dobs{
    position: fixed;
    left: 431px;
    top: 355px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_dobs{
   position: fixed;
    left: 440px;
    top: 320px;
    font-size: 20px;
    color: aqua;

}

.ln{
    position: fixed;
    left: 790px;
    top: 275px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ln{
   position: fixed;
    left: 800px;
    top: 240px;
    font-size: 20px;
    color: aqua;
}

.mn{
    position: fixed;
    left: 431px;
    top: 275px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_mn{
   position: fixed;
    left: 440px;
    top: 240px;
    font-size: 20px;
    color: aqua;

}

.fn{
    position: fixed;
    left: 790px;
    top: 190px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_fn{
   position: fixed;
    left: 800px;
    top: 155px;
    font-size: 20px;
    color: aqua;

}

.tt{
    position: fixed;
    left: 430px;
    top: 190px;
    height: 40px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_tt{
  position: fixed;
    left: 440px;
    top: 155px;
    font-size: 20px;
    color: aqua;

}

.bi{

  position: fixed;
    left: 420px;
    top: 115px;
    height: 10px;
    width: 300px;
    color: #43edd7;
}




/* form for step 2 style*/

.step2_first_h2{
  position: fixed;
    left: 420px;
    top: 115px;
    height: 10px;
    width: 500px;
    color: #43edd7;
}


.in{
    position: fixed;
    left: 780px;
    top: 290px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_in{
   position: fixed;
    left: 800px;
    top: 255px;
    font-size: 20px;
    color: aqua;
}

.qf{
    position: fixed;
    left: 440px;
    top: 290px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_qf{
   position: fixed;
    left: 455px;
    top: 255px;
    font-size: 20px;
    color: aqua;

}

.op{
    position: fixed;
    left: 780px;
    top: 200px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_op{
   position: fixed;
    left: 800px;
    top: 165px;
    font-size: 20px;
    color: aqua;

}

.auw{
    position: fixed;
    left: 440px;
    top: 200px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_auw{
  position: fixed;
    left: 455px;
    top: 165px;
    font-size: 20px;
    color: aqua;

}


.step2_second_h2{
  position: fixed;
    left: 420px;
    top: 360px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}


.nokp{
    position: fixed;
    left: 780px;
    top: 535px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_nokp{
   position: fixed;
    left: 800px;
    top: 500px;
    font-size: 20px;
    color: aqua;

}

.nok{
    position: fixed;
    left: 440px;
    top: 535px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_nok{
   position: fixed;
    left: 435px;
    top: 500px;
    font-size: 20px;
    color: aqua;

}

.fan{
    position: fixed;
    left: 780px;
    top: 447px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_fan{
   position: fixed;
    left: 800px;
    top: 410px;
    font-size: 20px;
    color: aqua;

}


.man{
    position: fixed;
    left: 440px;
    top: 447px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_man{
   position: fixed;
    left: 455px;
    top: 410px;
    font-size: 20px;
    color: aqua;

}


.s2preveBut{
        position: fixed;
    left: 65%;
    top: 86%;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s2nextBut{
        position: fixed;
    left: 75%;
    top: 86%;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}



/* form for step 3 style*/

.step3_first_h2{
  position: fixed;
    left: 420px;
    top: 115px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.mariSta{
    position: fixed;
    left: 440px;
    top: 190px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_mariSta{
  position: fixed;
    left: 455px;
    top: 155px;
    font-size: 20px;
    color: aqua;

}


.spcon{
    position: fixed;
    left: 780px;
    top: 190px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_spcon{
   position: fixed;
    left: 800px;
    top: 155px;
    font-size: 20px;
    color: aqua;

}

.spnam{
    position: fixed;
    left: 440px;
    top: 280px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_spnam{
   position: fixed;
    left: 455px;
    top: 245px;
    font-size: 20px;
    color: aqua;

}


.noch{
    position: fixed;
    left: 780px;
    top: 280px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_noch{
   position: fixed;
    left: 800px;
    top: 245px;
    font-size: 20px;
    color: aqua;
}

.step3_second_h2{
  position: fixed;
    left: 420px;
    top: 340px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.meT{
    position: fixed;
    left: 440px;
    top: 410px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_meT{
   position: fixed;
    left: 455px;
    top: 380px;
    font-size: 20px;
    color: aqua;

}

.zone{
    position: fixed;
    left: 780px;
    top: 410px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_zone{
   position: fixed;
    left: 800px;
    top: 380px;
    font-size: 20px;
    color: aqua;

}

.dapNa{
    position: fixed;
    left: 440px;
    top: 493px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_dapNa{
   position: fixed;
    left: 455px;
    top: 465px;
    font-size: 20px;
    color: aqua;

}


.datJo{
    position: fixed;
    left: 780px;
    top: 493px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_datJo{
   position: fixed;
    left: 800px;
    top: 465px;
    font-size: 20px;
    color: aqua;

}


.claSelec{
    position: fixed;
    left: 440px;
    top: 580px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_claSelec{
   position: fixed;
    left: 455px;
    top: 550px;
    font-size: 20px;
    color: aqua;

}



.s3preveBut{
        position: fixed;
    left: 870px;
    top: 575px;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s3nextBut{
        position: fixed;
    left: 990px;
    top: 575px;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}


/* form for step 4 style*/

.step4_first_h2{
  position: fixed;
    left: 420px;
    top: 155px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.spGi{
    position: fixed;
    left: 440px;
    top: 235px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_spGi{
   position: fixed;
    left: 455px;
    top: 200px;
    font-size: 20px;
    color: aqua;

}

.posi{
    position: fixed;
    left: 800px;
    top: 235px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_posi{
   position: fixed;
    left: 820px;
    top: 200px;
    font-size: 20px;
    color: aqua;

}


.waterBa{
    position: fixed;
    left: 440px;
    top: 310px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_waterBa{
   position: fixed;
    left: 455px;
    top: 280px;
    font-size: 20px;
    color: aqua;

}

.batby{
    position: fixed;
    left: 800px;
    top: 310px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_batby{
   position: fixed;
    left: 820px;
    top: 280px;
    font-size: 20px;
    color: aqua;

}


.dateBapt{
    position: fixed;
    left: 440px;
    top: 390px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_dateBapt{
   position: fixed;
    left: 455px;
    top: 360px;
    font-size: 20px;
    color: aqua;

}


.bbths{
    position: fixed;
    left: 800px;
    top: 390px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_bbths{
   position: fixed;
    left: 820px;
    top: 360px;
    font-size: 20px;
    color: aqua;

}


.memberSta{
    position: fixed;
    left: 440px;
    top: 475px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_memberSta{
   position: fixed;
    left: 455px;
    top: 440px;
    font-size: 20px;
    color: aqua;

}

.s4preveBut{
        position: fixed;
    left: 870px;
    top: 570px;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s4nextBut{
        position: fixed;
    left: 990px;
    top: 570px;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}


/* form for step 5 style*/

.step5_first_h2{
  position: fixed;
    left: 420px;
    top: 135px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}



.datDece{
    position: fixed;
    left: 440px;
    top: 205px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_datDece{
   position: fixed;
    left: 455px;
    top: 175px;
    font-size: 20px;
    color: aqua;

}


.datBur{
    position: fixed;
    left: 800px;
    top: 220px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_datBur{
   position: fixed;
    left: 820px;
    top: 190px;
    font-size: 20px;
    color: aqua;

}


.confirm{
    position: fixed;
    left: 440px;
    top: 285px;
    height: 43px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_confirm{
   position: fixed;
    left: 455px;
    top: 255px;
    font-size: 20px;
    color: aqua;

}


.dateConfir{
    position: fixed;
    left: 800px;
    top: 295px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_dateConfir{
   position: fixed;
    left: 820px;
    top: 265px;
    font-size: 20px;
    color: aqua;

}

.comment{
    position: fixed;
    left: 800px;
    top: 375px;
    height: 100px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_comment{
   position: fixed;
    left: 820px;
    top: 340px;
    font-size: 20px;
    color: aqua;

}

.images{
        position: fixed;
    left: 440px;
    top: 390px;
    max-width: 300px;
    max-height: 230px;
    margin-top: 10px;
    border-radius: 8px;
    border-color: white;
    background-color: white;
    width: 300px;


}


.label_image{
   position: fixed;
    left: 440px;
    top: 345px;
    font-size: 20px;
    color: aqua;
    border: revert;
    

}

.image_container{
    position: fixed;
    left: 440px;
    top: 400px;
    height: 220px;
    width: 300px;
    border-radius: 8px;
    border-color: white;
    background-color: white;
    border-color: aqua;


}

.s5SaveBut{
        position: fixed;
    left: 770px;
    top: 580px;
    color: black;
    height: 30px;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s5resetBut{
        position: fixed;
    left: 880px;
    top: 580px;
    color: black;
    height: 30px;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s5nextBut{
        position: fixed;
    left: 990px;
    top: 580px;
    height: 30px;
    color: black;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

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

download-dropdown-menu

.dropdown {
  position: relative;
  display: inline-block;
}
.download-dropdown-menu{
  position: absolute;
  background-color: #92c1c0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  z-index: 1000;
      left: 78%;
    top: 47%;
}
.download-dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.download-dropdown-menu li:hover {
  background-color:rgb(88, 189, 187);
}

.step2_first_h2{
  position: fixed;
    left: 420px;
    top: 145px;
    height: 10px;
    width: 500px;
    color: #43edd7;
}

.date{
    position: fixed;
    left: 33%;
    top: 80%;
    height: 45px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_date{
   position: fixed;
    left: 34%;
    top: 73%;
    font-size: 20px;
    color: aqua;

}

.counselor{
    position: fixed;
    left: 60%;
    top: 60%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_counselor{
   position: fixed;
    left: 62%;
    top: 53%;
    font-size: 20px;
    color: aqua;
}

.special_prayer_or_counseling{
    position: fixed;
    left: 33%;
    top: 60%;
    height: 45px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_special_prayer_or_counseling{
   position: fixed;
    left: 34%;
    top: 53%;
    font-size: 20px;
    color: aqua;
    

}

.contact_hours{
    position: fixed;
    left: 60%;
    top: 41.2%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_contact_hours{
   position: fixed;
    left: 62%;
    top: 33%;
    font-size: 20px;
    color: aqua;

}

.purpose_of_coming{
    position: fixed;
    left: 33%;
    top: 40%;
    height: 45px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_purpose_of_coming{
  position: fixed;
    left: 34%;
    top: 33%;
    font-size: 20px;
    color: aqua;

}

.house_location{
    position: fixed;
    left: 33%;
    top: 82%;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_house_location{
   position: fixed;
    left: 34%;
    top: 76%;
    font-size: 20px;
    color: aqua;

}

.whatsapp_number{
    position: fixed;
    left: 60%;
    top: 64%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_whatsapp_number{
   position: fixed;
    left: 62%;
    top: 58%;
    font-size: 20px;
    color: aqua;

}

.phone_number{
    position: fixed;
    left: 33%;
    top: 64%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_phone_number{
   position: fixed;
    left: 34%;
    top: 58%;
    font-size: 20px;
    color: aqua;
}

.popular_name{
    position: fixed;
    left: 60%;
    top: 45%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_popular_name{
   position: fixed;
    left: 62%;
    top: 39%;
    font-size: 20px;
    color: aqua;

}

.name{
    position: fixed;
    left: 33%;
    top: 45%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_name{
   position: fixed;
    left: 34%;
    top: 39%;
    font-size: 20px;
    color: aqua;

}

h2{

  position: fixed;
        left: 49%;
    top: 27%;
    height: 10px;
    width: 300px;
    color: #43edd7;
    font-size:20px;
}



</style>
