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


        <button type="button" @click.prevent="checkName">Search Member</button>
        

      </form>


      <!-- Button Actions -->
      <section class="left_view">
        <button class="button4" @click="getMembers">Get Members</button>
      </section>
      <section class="left_view">
        <button class="button5" @click="downloadMembers">Download Members</button>
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
                <button class = "edit" @click="editMember(record)">Edit</button>
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
          <h2 class = "bi">Basic Information</h2>

          <label class = "label_tt" for="title">Title</label>
          <select class = "tt" v-model="form.title" id="title"  >
            <option disabled value="">Select Title</option>
            <option v-for="title in titles" :key="title" :value="title">
              {{ title }}
            </option>
          </select>

          <label class = "label_fn" for="firstName">First Name</label>
          <input class = "fn" type="text" v-model="form.firstname" id="firstName" placeholder="First Name" />

          <label class = "label_mn" for="middleName">Middle Name</label>
          <input class = "mn" type="text" v-model="form.middlename" id="middleName" placeholder="Middle Name"  />

          <label class = "label_ln" for="lastName">Last Name</label>
          <input  class = "ln" type="text" v-model="form.lastname" id="lastName" placeholder="Last Name"  />

          <label class = "label_dobs" for="dob">Date of Birth</label>
          <input class = "dobs" type="date" v-model="form.dateOfBirth" id="dob" placeholder="Date of Birth"  />

          <label class = "label_gn" for="gender">Gender</label>
          <select class = "gn" v-model="form.gender" id="gender" >
            <option disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label class = "label_pn" for="phoneNumber">Phone Number</label>
          <input class = "pn" type="text" v-model="form.phoneNumber" id="phoneNumber" placeholder="Phone Number"  />

          <label class = "label_ea" for="email">Email</label>
          <input class = "ea" type="email" v-model="form.email" id="email" placeholder="Email" />

          <label class = "label_ny" for="nationality">Nationality</label>
          <input class = "ny" type="text" v-model="form.nationality" id="nationality" placeholder="Nationality"  />

          <label class = "label_ht" for="homeTown">Home Town</label>
          <input  class = "ht" type="text" v-model="form.homeTown" id="homeTown" placeholder="Home Town"  />

          <label class = "label_ha" for="homeAddress">Home Address</label>
          <input class = "ha" type="text" v-model="form.homeAddress" id="homeAddress" placeholder="Home Address"  />

          <button type="button" @click="nextStep">Next</button>
        </div>


        <div v-if="step === 2">

          <h2 class = "step2_first_h2"> Professional Background</h2>

          <label class = "label_auw" for="auw">Are you working</label>
          <select class = "auw" v-model="form.workingStatus" id="auw"  >
            <option disabled value="">Select Working Status</option>
            <option v-for="work in working" :key="work" :value="work">
              {{ work }}
            </option>
          </select>

          <label class = "label_op" for="occupation">Occupation</label>
          <input class = "op" type="text" v-model="form.occupation" id="occupation" placeholder="Occupation"  />

          <label class = "label_qf" for="qualification">Qualification</label>
          <input class = "qf" type="text" v-model="form.qualification" id="qualification" placeholder="Qualification"  />

          <label class = "label_in" for="institutionName">Institution Name</label>
          <input  class = "in" type="text" v-model="form.institutionName" id="institutionName" placeholder="Institution Name"  />

          <h2 class = "step2_second_h2" >Family & Emergency Contact Information</h2>

          <label class = "label_man" for="dob">Mothers Name</label>
          <input class = "man" type="text" v-model="form.mothersName" id="mothersName" placeholder="Mothers name" />

          <label class = "label_fan" for="fathersName">Fathers Name</label>
          <input class = "fan" type="text" v-model="form.fathersName" id="fathersName" placeholder="Fathers name"  />

          <label class = "label_nok" for="nextOfKin">Next of kin</label>
          <input class = "nok" type="text" v-model="form.nextOfKin" id="nextOfKin" placeholder="Next of kin"  />

          <label class = "label_nokp" for="nextOfKinPhone">Next Of Kin Phone</label>
          <input class = "nokp" type="text" v-model="form.nextOfKinPhoneNumber" id="nextOfKinPhone" placeholder="Next Of Kin Phone"  />

          
          <button class = "s2preveBut" type="button" @click="prevStep">Previous</button>
          <button class = "s2nextBut" type="button" @click="nextStep">Next</button>
        </div>

        <div v-if="step === 3">

          <h2 class = "step3_first_h2"> Family & Emergency Contact Information 2</h2>

          <label class = "label_mariSta" for="maritalStatus">Marital Status</label>
          <select class = "mariSta" v-model="form.maritalStatus" id="maritalStatus"  >
            <option disabled value="">Select Marital Status</option>
            <option v-for= "marital in maritalS" :key="marital" :value="marital">
              {{ marital }}
            </option>
          </select>

          <label class = "label_spcon" for="spouseContact">Spouse contact</label>
          <input class = "spcon" type="text" v-model="form.spouseContact" id="spouseContact" placeholder="Spouse Contact"  />

          <label class = "label_spnam" for="spouseName">Spouse Name </label>
          <input class = "spnam" type="text" v-model="form.spouseName" id="spouseName" placeholder="Spouse Name" />

          <label class = "label_noch" for="numberOfChildren">Number of children</label>
          <input  class = "noch" type="text" v-model="form.numberOfChildren" id="numberOfChildren" placeholder="Number of children"  />

          <h2 class = "step3_second_h2" > Church Details </h2>

          <label class = "label_meT" for="memeberType">Member Type</label>
          <select class = "meT" v-model="form.memberType" id="memberType"  >
            <option disabled value="">Select Member Type</option>
            <option v-for="member in memberT" :key="member" :value="member">
              {{ member }}
            </option>
          </select>

          <label class = "label_zone" for="cell">Cell</label>
          <select class = "zone" v-model="form.cell" id="cell"  >
            <option disabled value="">Select Cell</option>
            <option v-for="cell in cells" :key="cell" :value="cell">
              {{ cell }}
            </option>
          </select>


          <label class = "label_dapNa" for="departmentName">Department Name</label>
          <select class = "dapNa" v-model="form.departmentName" id="departmentName"  >
            <option disabled value="">Select Department Name</option>
            <option v-for="departmentName in departmentNames" :key="departmentName" :value="departmentName">
              {{ departmentName }}
            </option>
          </select>


          <label class = "label_datJo" for="datejoined">DateJoined</label>
          <input class = "datJo" type="date" v-model="form.dateJoined" id="dateJoined" placeholder="dateJoined"  />

          <label class = "label_claSelec" for="classSelection">Class Selection</label>
          <select class = "claSelec" v-model="form.classSelection" id="classSelection"  >
            <option disabled value="">Select Class Selection</option>
            <option v-for="classsel in classsels" :key="classsel" :value="classsel">
              {{ classsel }}
            </option>
          </select>
          
          <button class = "s3preveBut" type="button" @click="prevStep">Previous</button>
          <button class = "s3nextBut" type="button" @click="nextStep">Next</button>

        </div>

        <div v-if="step === 4">

          <h2 class = "step4_first_h2"> Church Details 2</h2>

          <label class = "label_spGi" for="spiritualGift">Spiritual Gift(s)</label>
          <input class = "spGi" type="text" v-model="form.spiritualGift" id="spiritualGift" placeholder="Spiritual Gift"  />

          <label class = "label_posi" for="position">Position</label>
          <select class = "posi" v-model="form.position" id="position" >
            <option disabled value="">Select Position</option>
            <option v-for="position in positions" :key="position" :value="position">
              {{ position }}
            </option>
          </select>

          <label class = "label_waterBa" for="waterBa">Water Baptised</label>
          <select class = "waterBa" v-model="form.waterBaptised" id="waterBaptised"  >
            <option disabled value="">Select option</option>
            <option v-for="waterBap in waterBaps" :key="waterBap" :value="waterBap">
              {{ waterBap }}
            </option>
          </select>

          <label class = "label_batby" for="baptisedBy">Babtised By </label>
          <input class = "batby" type="text" v-model="form.baptisedBy" id="baptisedBy" placeholder="Baptised By"  />

          <label class = "label_dateBapt" for="dateBaptised">Date Baptised</label>
          <input  class = "dateBapt" type="date" v-model="form.dateBaptised" id="dateBaptised" placeholder="Date Baptised"  />

          <label class = "label_bbths" for="bbths">Baptised by the Holy Spirit</label>
          <select class = "bbths" v-model="form.baptisedBy" id="baptisedByTheHolySpirit"  required>
            <option disabled value="">Select option</option>
            <option v-for="baptisedBy in baptisedBys" :key="baptisedBy" :value="baptisedBy">
              {{ baptisedBy }}
            </option>
          </select>

          <label class = "label_memberSta" for="memeberStatus">Member Status </label>
          <select class = "memberSta" v-model="form.memberStatus " id="memberStatus"  >
            <option disabled value="">Select Member Status</option>
            <option v-for="memberSta in memberStatuses" :key="memberSta" :value="memberSta">
              {{ memberSta }}
            </option>
          </select>


          
          <button class = "s4preveBut" type="button" @click="prevStep">Previous</button>
          <button class = "s4nextBut" type="button" @click="nextStep">Next</button>

        </div>
        <div v-if="step === 5">

          <h2 class = "step5_first_h2"> Other Info</h2>

          <label class = "label_datDece" for="dateDeceased">Date Deceased</label>
          <input class = "datDece" type="date" v-model="form.dateDeceased" id="dateDeceased" placeholder="DateDeceased" />

          <label class = "label_datBur" for="dateBuried">Date Buried</label>
          <input class = "datBur" type="date" v-model="form.dateBuried" id="dateburied" placeholder="Date Buried" />

          <label class = "label_confirm" for="confirmed">Confirmed</label>
          <select class = "confirm" v-model="form.confirmed" id="confirmed"  >
            <option disabled value="">Select confirmed</option>
            <option v-for="confirmed in confirmeds" :key="confirmed" :value="confirmed">
              {{ confirmed }}
            </option>
          </select>

          <label class = "label_dateConfir" for="dateConfirmed">Date Confirmed</label>
          <input class = "dateConfir" type="date" v-model="form.dateConfirmed" id="dateConfirmed" placeholder="Date Comfired" />

          <label class = "label_comment" for="comment">Comment</label>
          <textarea class="comment" v-model="form.comment" id="comment" placeholder="Write your comment here..." ></textarea>

         
          <input class = "label_image" type="file" @change="handleImageUpload" />
          <div class = "image_container">
          <img  v-if="imageUrl.url" :src="imageUrl.url" alt="Image Preview" class="images" />
          </div>

          <button class = "s5nextBut" type="button" @click="prevStep">Previous</button>
          <button class = "s5resetBut" type="button" @click="nextStep">Reset</button>
          <button class = "s5SaveBut" type="submit" @click="updateMemberDetails" >Submit</button>
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

      showEditModal: false,
      member_id: '',
      memberList: [],

      titles: ['Mr', 'Miss', 'Mrs', 'Master', 'Dr', 'Prof', 'Eng', 'Prophet', 'Apostle', 'Pastor', 'Presiding Elder', 'Elder', 'Deacon', 'Deaconess', 'Brother', 'Sister', 'Reverend', 'Very Reverend', 'Rt Reverend'], 
      working: ['Yes' , 'No'], 
      maritalS: ['Married (Ordinance)', 'Married (Customary)', 'Married (Blessing)', 'Single', 'Divorced' ], 
      memberT: ['Member', 'Inactive', 'Visitor', 'Child', 'Backslider', 'Transferred-in', 'Transferred-out', 'Student'], 
      cells:['Salosi cell', 'Bruku cell(Pastor ivan 233556758997)', 'Junction cell', 'Takyikope cell', 'Aggrey cell(mama cynthia 233242309320)', 'Manya cell', 'Gblaka cell(mr nelson dangbe 233244787620)', 'Habitat cell(mr. Ahotor 233241847237)', 'Downtown cell(miss pomary dinah 233245435604)', 'Across cell', 'Ayikuma cell', 'Peace cell', 'Mataheko cell', 'Kordiabe cell'],
      departmentNames: ['Men Ministries', 'Women Ministries', 'Youth Ministry', 'Joy Ministry', 'Missionnettes', 'Pathfinders', 'Royal Rangers', 'Youth Singles', 'Missions', 'Protocol/Ushering', 'Children Ministry', 'Music', 'Sanctuary Keepers'],
      classsels:['English Adult', 'Ewe Adult(Faith)', 'Twi Adult', 'Dangbe Adult', 'Discipleship class 1', ' Discipleship class 2', 'Deliverance class', 'New Convent', 'Youth English', 'Children', 'Ewe Adult(Love)'],
      positions:['Women Ministries President', 'Women Ministries Vice President', 'Women Ministries Secretary','Women Ministries Treasurer', 'Women Ministries Organizer', 'Men Ministry President', 'Men Ministry Vice President', 'Men Ministry Secretary', 'Men Ministry Treasurer' , 'Men Ministry Organizer', 'Joy Fellowship President', 'Joy Fellowship President'],
      waterBaps :['Yes' , 'No'],
      baptisedBys :['Yes', 'No'],
      memberStatuses :['Alive', 'Deceased'],
      confirmeds :['Yes' , 'No', 'Pending'],

      form: {
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        nationality: '',
        homeTown: '',
        workingStatus: '',
        homeAddress: '',
        occupation: '',
        qualification: '',
        institutionName: '',
        mothersName: '',
        fathersName: '',
        nextOfKin: '',
        nextOfKinPhoneNumber: '',
        maritalStatus: '',
        spouseContact: '',
        spouseName: '',
        numberOfChildren: '',
        memberType: '',
        cell: '',
        departmentName: '',
        dateJoined: '',
        classSelection: '',
        spiritualGift: '',
        position: '',
        waterBaptised: '',
        baptisedBy: '',
        dateBaptised: '',
        baptisedByTheHolySpirit: '',
        memberStatus: '',
        dateDeceased: '',
        dateBuried: '',
        confirmed: '',
        dateConfirmed: '',
        comment: '',
      
      },
    };
  },

  computed: {
    isAdmin() {
      return localStorage.getItem("userRole") === 'ADMIN';
    }
  },

  methods: {

    async getMembers() {
        this.loading = true; 
        try {
          const response = await axios.get('https://churchmsbackend.onrender.com/members/get_all_members');
          
          console.info("member list", response.data)
          if (response.data !== 'No user data exists') {

            

            this.memberList = response.data.map(members => ({

            name: [members.firstname, members.middlename, members.lastname]
                .map(name => name?.trim()) // Trim each name to remove extra spaces
                .filter(name => name) // Remove empty or undefined values
                .join(' '),
            phoneNumber: members.phoneNumber,
            memberStatus: members.memberStatus,
            member_id: members.id,
            }
            ))

            
          } else {
            this.attendanceList = response.data;
          this.memberList = [];  // Clear the list if no data is found
          
          }
        } catch (error) {
          console.error('Error fetching user list:', error);
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
          const response = await axios.get(`https://churchmsbackend.onrender.com/members/get_member_by_words/${this.name}`);
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


  async downloadMembers() {

 if(localStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
        console.info("In the download attendance function");

        try {
          // Fetch the file from the backend
          const response = await axios.get('https://churchmsbackend.onrender.com/members/download_member_data', {
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
          let fileName = 'attendance_data.xlsx';
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



    async editMember(record) {
       if(localStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
    this.loading = true;
    this.showEditModal = true;
      console.error('getting member details to update')

      try {
        const response = await axios.get(`https://churchmsbackend.onrender.com/members/get_member_by_id/${record.member_id}`);
        
        console.info("member data", response.data)

        if (response.data){
          const member = response.data;

          // Populate the form with fetched member details
          this.form = {
            title: member.title || "",
            firstname: member.firstname || "",
            middlename: member.middlename || "",
            lastname: member.lastname || "",
            dateOfBirth:member.dateOfBirth || "",
            age:member.age || "",
            gender: member.gender || "",
            phoneNumber: member.phoneNumber || "",
            email: member.email || "",
            nationality: member.nationality || "",
            homeTown: member.homeTown || "",
            workingStatus: member.workingStatus || "",
            homeAddress: member.homeAddress || "",
            occupation: member.occupation || "",
            qualification: member.qualification || "",
            institutionName: member.institutionName || "",
            mothersName: member.mothersName || "",
            fathersName: member.fathersName || "",
            nextOfKin: member.nextOfKin || "",
            nextOfKinPhoneNumber: member.nextOfKinPhoneNumber || "",
            maritalStatus: member.maritalStatus || "",
            spouseContact: member.spouseContact || "",
            spouseName: member.spouseName || "",
            numberOfChildren: member.numberOfChildren || "",
            memberType: member.memberType || "",
            cell: member.cell || "",
            departmentName: member.departmentName || "",
            dateJoined: member.dateJoined || "",
            classSelection: member.classSelection || "",
            spiritualGift: member.spiritualGift || "",
            position: member.position || "",
            waterBaptised: member.waterBaptised || "",
            baptisedBy: member.baptisedBy || "",
            dateBaptised: member.dateBaptised || "",
            baptisedByTheHolySpirit: member.baptisedByTheHolySpirit || "",
            memberStatus: member.memberStatus || "",
            dateDeceased: member.dateDeceased || "",
            dateBuried: member.dateBuried || "",
            confirmed: member.confirmed || "",
            dateConfirmed: member.dateConfirmed || "",
            comment: member.comment || "",
            
          }



          this.member_id = member.id
          let fullname = [this.form.firstname, this.form.middlename, this.form.lastname]
                .map(name => name?.trim()) // Trim each name to remove extra spaces
                .filter(name => name) // Remove empty or undefined values
                .join(' ');

          try{
             const response = await axios.get(`https://churchmsbackend.onrender.com/members/get_member_image/${fullname}`);
        
            console.info("member data", response.data)

            if (response.data.message == "Member image data queried successful" && response.data.detail != "Member Image with name does not exist"){
                const memberImage = response.data.member_image_data;
                console.log("image_data : " , memberImage )

         
                // Convert Base64 to a valid data URL
                this.imageUrl.url = `data:image/jpeg;base64,${memberImage.image}`;
                              
                //this.imageUrl.url = URL.createObjectURL(memberImage.image);
            }
            else{
                alert("Member has no image"); 
            }

          }
          catch(error){
              console.error('Error fetching user data:', error);
               alert("Error fetching member image");
               this.showEditModal = false;
          }

          

        } else {
          alert("Error getting user data"); 
        }

      } catch (error) {
        console.error('Error fetching member data:', error);
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
        this.form.title &&
        this.form.firstname &&
        this.form.middlename &&
        this.form.lastname &&
        this.form.dateOfBirth &&
        this.form.age &&
        this.form.gender &&
        this.form.phoneNumber &&
        this.form.email &&
        this.form.nationality &&
        this.form.homeTown &&
        this.form.workingStatus &&
        this.form.homeAddress &&
        this.form.occupation &&
        this.form.qualification &&
        this.form.institutionName &&
        this.form.mothersName &&
        this.form.fathersName &&
        this.form.nextOfKin &&
        this.form.nextOfKinPhoneNumber &&
        this.form.maritalStatus &&
        this.form.spouseContact &&
        this.form.spouseName &&
        this.form.numberOfChildren &&
        this.form.memberType &&
        this.form.cell &&
        this.form.departmentName &&
        this.form.dateJoined &&
        this.form.classSelection &&
        this.form.spiritualGift &&
        this.form.position &&
        this.form.waterBaptised &&
        this.form.baptisedBy &&
        this.form.dateBaptised &&
        this.form.baptisedByTheHolySpirit &&
        this.form.memberStatus &&
        this.form.dateDeceased &&
        this.form.dateBuried &&
        this.form.confirmed &&
        this.form.dateConfirmed &&
        this.form.comment 
      
        
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

     async updateMemberDetails() {
 if(localStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      this.loading = true; 

      if (this.isFormValid) {
        console.info("in the update member function")
        
        

        // Prepare data payload for backend
        const payload = {
          title: this.form.title,
          firstname: this.form.firstname,
          middlename: this.form.middlename,
          lastname: this.form.lastname,
          dateOfBirth: this.form.dateOfBirth,
          age: this.form.age,
          gender: this.form.gender,
          phoneNumber: this.form.phoneNumber,
          email: this.form.email,
          nationality: this.form.nationality,
          homeTown: this.form.homeTown,
          workingStatus: this.form.workingStatus,
          homeAddress: this.form.homeAddress,
          occupation: this.form.occupation,
          qualification: this.form.qualification,
          institutionName: this.form.institutionName,
          mothersName: this.form.mothersName,
          fathersName: this.form.fathersName,
          nextOfKin: this.form.nextOfKin,
          nextOfKinPhoneNumber: this.form.nextOfKinPhoneNumber,
          maritalStatus: this.form.maritalStatus,
          spouseContact: this.form.spouseContact,
          spouseName: this.form.spouseName,
          numberOfChildren: this.form.numberOfChildren,
          memberType: this.form.memberType,
          cell: this.form.cell,
          departmentName: this.form.departmentName,
          dateJoined: this.form.dateJoined,
          classSelection: this.form.classSelection,
          spiritualGift: this.form.spiritualGift,
          position: this.form.position,
          waterBaptised: this.form.waterBaptised,
          baptisedBy: this.form.baptisedBy,
          dateBaptised: this.form.dateBaptised,
          baptisedByTheHolySpirit: this.form.baptisedByTheHolySpirit,
          memberStatus: this.form.memberStatus,
          dateDeceased: this.form.dateDeceased,
          dateBuried: this.form.dateBuried,
          confirmed: this.form.confirmed,
          dateConfirmed: this.form.dateConfirmed,
          comment: this.form.comment,
        };

        console.log("Form is valid. Proceeding with user update...", payload);
        console.log("id", this.member_id)

        try {
          const response = await axios.patch(`https://churchmsbackend.onrender.com/members/update_individual_member_fields/${this.member_id}`, {
            title: this.form.title,
          firstname: this.form.firstname,
          middlename: this.form.middlename,
          lastname: this.form.lastname,
          dateOfBirth: this.form.dateOfBirth,
          age: this.form.age,
          gender: this.form.gender,
          phoneNumber: this.form.phoneNumber,
          email: this.form.email,
          nationality: this.form.nationality,
          homeTown: this.form.homeTown,
          workingStatus: this.form.workingStatus,
          homeAddress: this.form.homeAddress,
          occupation: this.form.occupation,
          qualification: this.form.qualification,
          institutionName: this.form.institutionName,
          mothersName: this.form.mothersName,
          fathersName: this.form.fathersName,
          nextOfKin: this.form.nextOfKin,
          nextOfKinPhoneNumber: this.form.nextOfKinPhoneNumber,
          maritalStatus: this.form.maritalStatus,
          spouseContact: this.form.spouseContact,
          spouseName: this.form.spouseName,
          numberOfChildren: this.form.numberOfChildren,
          memberType: this.form.memberType,
          cell: this.form.cell,
          departmentName: this.form.departmentName,
          dateJoined: this.form.dateJoined,
          classSelection: this.form.classSelection,
          spiritualGift: this.form.spiritualGift,
          position: this.form.position,
          waterBaptised: this.form.waterBaptised,
          baptisedBy: this.form.baptisedBy,
          dateBaptised: this.form.dateBaptised,
          baptisedByTheHolySpirit: this.form.baptisedByTheHolySpirit,
          memberStatus: this.form.memberStatus,
          dateDeceased: this.form.dateDeceased,
          dateBuried: this.form.dateBuried,
          confirmed: this.form.confirmed,
          dateConfirmed: this.form.dateConfirmed,
          comment: this.form.comment,
          });

          
          console.info(response.data)
          
          if (response.data.message === 'Member details update successful' && this.selectedImage !== '' ){
           
            // update image here
              alert("User updated successfully");
              console.log("about to update user image")

              const formData = new FormData();

            // Construct the fullname by concatenating the form fields.
            let fullname = [this.form.firstname, this.form.middlename, this.form.lastname]
                .map(name => name?.trim()) // Trim each name to remove extra spaces
                .filter(name => name) // Remove empty or undefined values
                .join(' ');

            // Append the image and fullname to the formData
            formData.append('fullname', fullname);
            formData.append('file', this.selectedImage);


              this.loading = true; 
              try {
                const response = await axios.post(`https://churchmsbackend.onrender.com/members/update_member_image/${fullname}`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you set the correct header for file upload
                  },
                });

                console.info("response from image",response.data)
                if (response.data.message === 'Member image creation successful'){
                  alert("User image updated");

                  this.showEditModal = false;

                }else if (response.data.detail == "Member Image with name does not exist"){

                    const confirmDelete = window.confirm(`Member image with name "${fullname}" does not exist. Do you wan to create it?`);
                
                    if (confirmDelete) {
                        // call create image function

                        try {
                          const response = await axios.post('https://churchmsbackend.onrender.com/members/create_member_image', formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data', // Ensure you set the correct header for file upload
                            },
                          });

                            console.info("response from image",response.data)
                            if (response.data.message === 'Member image creation successful'){
                              alert("User image created");
                              this.step = 1;
                              this.showEditModal =  false;
                            }
                            else{
                                alert('Image data not saved');
                              }
                        
                          
                          } catch (error) {
                            console.error("Saving image  error:", error);
                            alert("An error occurred during saving of member image. Please try again.");
                          }
                    }

                } else {
                  console.info("error response for member update image ",response)
                  alert("Member image failed to update");
                }

            
                } catch (error) {
                  console.error("Member update error:", error);
                  alert("An error occurred during member data update. Please try again.");
                  this.step = 1;
                  this.showEditModal =  false;
                  this.imageurl = "";
                  }

          }else{
            alert("User updated successfully");
            this.step = 1;
            this.showEditModal =  false;

          }


        } catch (error) {
              console.error("Member data update error:", error);
              alert("An error occurred during member data update . Please try again.");
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
       if(localStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      this.loading = true; 
      console.info("this is the current record: ", record)

      try {
        console.info("Member_id: ", record.user_id)
        const confirmDelete = window.confirm(`Are you sure you want to delete the member with the name "${record.name}"?`);

        if (confirmDelete) {
          const response = await axios.delete(`https://churchmsbackend.onrender.com/members/delete_member_by_id/${record.member_id}`);
          
          console.info(" delete response ", response)
          if (response.data !== 'Mmember not found') {
            this.memberList = this.memberList.filter(user => user.user_id !== record.user_id);
            alert("Member deleted successfully."); 

          } else {
            alert("Member with name not found.");
              
          }

        } else {
          // If the user cancels the deletion
          console.info("Member deletion cancelled.");
        }

      } catch (error) {
        console.error('Error deleting member', error);
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
    left: 990px;
    top: 570px;
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
    left: 870px;
    top: 575px;
    height: 30px;
    width: 100px;
    color: black;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s2nextBut{
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
</style>
