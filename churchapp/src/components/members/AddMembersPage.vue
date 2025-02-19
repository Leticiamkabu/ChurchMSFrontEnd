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

      <h1>Membership Registration</h1>
      
      <form @submit.prevent="submitRegistration" class="registration-form">
        <!-- User Details -->
        <div v-if="step === 1" class = "first_info">
          <h2>Basic Information</h2>

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


          <label class = "label_dapNa" for="departmentName">cell</label>
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
          <img  v-if="imageUrl" :src="imageUrl" alt="Image Preview" class="images" />
          </div>

          <button class = "s5nextBut" type="button" @click="prevStep">Previous</button>
          <button class = "s5resetBut" type="button" @click="nextStep">Reset</button>
          <button class = "s5SaveBut" type="submit">Submit</button>

        </div>

        <div v-if="step === 6">
        <h2 class = "step6_first_h21"> Member creation complete !!!</h2>
        <h2 class = "step6_first_h22">  If you have not added the members image, remember to add it. </h2>
        <h2 class = "step6_first_h23">  To access the member details, go to member sublinks. </h2>
        

        </div>
      </form>

      <div class="progress-bar">
        <div :style="{ width: (step - 1) * 33 + '%' }" class="progress"></div>
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

      step: 1,
      imageUrl: null,
      selectedImage: null,
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
    nextStep() {
      if (this.step < 6) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    
     handleImageUpload(event) {
      const file = event.target.files[0];
      console.info("in image handeler")
      console.info(file)
      if (file) {
        this.imageUrl = URL.createObjectURL(file); // Generate a preview URL
        this.selectedImage = file
      }

    },


    async submitRegistration() {
       if(localStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{
      console.info("in submit")
      
      console.info("image", this.selectedImage)
      
      
		
      console.info("form", this.form.title)
      console.info("form", this.form)

      const formattedData = {
          title: this.form.title,
          firstname: this.form.firstname,
          middlename: this.form.middlename,
          lastname: this.form.lastname,
          dateOfBirth: this.form.dateOfBirth,
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

      console.info("form", formattedData)
      if (formattedData && Object.keys(formattedData).length > 0){
        this.loading = true; 
      try {
        const response = await axios.post('https://churchmsbackend.onrender.com/members/create_member',formattedData);
            

        console.info(response.data)
        if (response.data.message === 'Member registeration successfully' && this.selectedImage !== null ){

          const formData = new FormData();

          // Construct the fullname by concatenating the form fields.
          let fullname = this.form.firstname + ' ' + this.form.middlename + ' ' + this.form.lastname;

          // Append the image and fullname to the formData
          formData.append('fullname', fullname);
          formData.append('file', this.selectedImage);

          this.loading = true; 
          try {
            const response = await axios.post('https://churchmsbackend.onrender.com/members/create_member_image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Ensure you set the correct header for file upload
              },
            });

          console.info("response from image",response.data)
          if (response.data.message === 'Member image creation successful'){
            this.step = 6;
          }
          else{
            alert('Image data not saved');
          }

          } catch (error) {
          console.error("Saving image  error:", error);
          alert("An error occurred during saving of member image. Please try again.");
         }
         finally {
        this.loading = false; // Hide loading screen
      }

          

        } else if (response.data.message === 'Member registeration successfully'){
          //this.step = 6;
          alert('User Data  saved, add image later');
          this.step = 1;
          window.location.reload();
          // Wait for 5 minutes (300,000 milliseconds) before navigating to step 3
        // setTimeout(() => {
            //this.step = 1; // Move back to step 3 after 5 minutes
        // }, 300000);

        }
        else{
          alert('User Data not saved');
        }
      } catch (error) {
        console.error("Saving member details error:", error);
        alert("An error occurred during member registeration. Please try again.");
      }
      finally {
        this.loading = false; // Hide loading screen
      }

      }

      else{
        alert('No data found ');
      }
    }


    
    }


    }, 
    mounted() {
      console.info("in mounted")
    // Automatically fetch summary data when the component is mounted
    //this.step = 6;


    // Clear local storage when the tab or window is closed
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
    
    }

  
};
</script>

<style scoped>
.registration-form {
   
      height: 515px;
    width: 720px;
    margin: 20px;
    position: fixed;
    left: 380px;
    top: 110px;
    background-color: #05919d;
    border-radius: 10px;
}


/* form for step 1 style*/

.first_info button{
        position: fixed;
    left: 990px;
    top: 600px;
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
    top: 595px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}
.label_ha{
   position: fixed;
    left: 440px;
    top: 565px;
    font-size: 20px;
    color: aqua;

}


.ht{
        position: fixed;
    left: 790px;
    top: 520px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ht{
   position: fixed;
    left: 800px;
    top: 490px;
    font-size: 20px;
    color: aqua;

}

.ny{
    position: fixed;
    left: 431px;
    top: 520px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ny{
   position: fixed;
    left: 440px;
    top: 490px;
    font-size: 20px;
    color: aqua;

}

.ea{
    position: fixed;
    left: 790px;
    top: 445px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ea{
   position: fixed;
    left: 800px;
    top: 415px;
    font-size: 20px;
    color: aqua;

}

.pn{
    position: fixed;
    left: 431px;
    top: 445px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_pn{
   position: fixed;
    left: 440px;
    top: 415px;
    font-size: 20px;
    color: aqua;

}

.gn{
    position: fixed;
    left: 790px;
    top: 370px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_gn{
   position: fixed;
    left: 800px;
    top: 335px;
    font-size: 20px;
    color: aqua;

}

.dobs{
    position: fixed;
    left: 431px;
    top: 370px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_dobs{
   position: fixed;
    left: 440px;
    top: 335px;
    font-size: 20px;
    color: aqua;

}

.ln{
    position: fixed;
    left: 790px;
    top: 295px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_ln{
   position: fixed;
    left: 800px;
    top: 255px;
    font-size: 20px;
    color: aqua;
}

.mn{
    position: fixed;
    left: 431px;
    top: 290px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_mn{
   position: fixed;
    left: 440px;
    top: 255px;
    font-size: 20px;
    color: aqua;

}

.fn{
    position: fixed;
    left: 790px;
    top: 210px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_fn{
   position: fixed;
    left: 800px;
    top: 175px;
    font-size: 20px;
    color: aqua;

}

.tt{
    position: fixed;
    left: 430px;
    top: 210px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_tt{
  position: fixed;
    left: 440px;
    top: 175px;
    font-size: 20px;
    color: aqua;

}

h2{

  position: fixed;
    left: 420px;
    top: 135px;
    height: 10px;
    width: 300px;
    color: #43edd7;
}




/* form for step 2 style*/

.step2_first_h2{
  position: fixed;
    left: 420px;
    top: 155px;
    height: 10px;
    width: 500px;
    color: #43edd7;
}


.in{
    position: fixed;
    left: 800px;
    top: 320px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_in{
   position: fixed;
    left: 820px;
    top: 285px;
    font-size: 20px;
    color: aqua;
}

.qf{
    position: fixed;
    left: 440px;
    top: 320px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_qf{
   position: fixed;
    left: 455px;
    top: 285px;
    font-size: 20px;
    color: aqua;

}

.op{
    position: fixed;
    left: 800px;
    top: 240px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_op{
   position: fixed;
    left: 820px;
    top: 205px;
    font-size: 20px;
    color: aqua;

}

.auw{
    position: fixed;
    left: 440px;
    top: 240px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_auw{
  position: fixed;
    left: 455px;
    top: 205px;
    font-size: 20px;
    color: aqua;

}


.step2_second_h2{
  position: fixed;
    left: 420px;
    top: 390px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}


.nokp{
    position: fixed;
    left: 800px;
    top: 555px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_nokp{
   position: fixed;
    left: 820px;
    top: 520px;
    font-size: 20px;
    color: aqua;

}

.nok{
    position: fixed;
    left: 440px;
    top: 555px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_nok{
   position: fixed;
    left: 455px;
    top: 520px;
    font-size: 20px;
    color: aqua;

}

.fan{
    position: fixed;
    left: 800px;
    top: 470px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_fan{
   position: fixed;
    left: 820px;
    top: 435px;
    font-size: 20px;
    color: aqua;

}

.man{
    position: fixed;
    left: 440px;
    top: 470px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_man{
   position: fixed;
    left: 455px;
    top: 435px;
    font-size: 20px;
    color: aqua;

}


.s2preveBut{
        position: fixed;
    left: 870px;
    top: 600px;
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
    top: 600px;
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
    top: 155px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.mariSta{
    position: fixed;
    left: 440px;
    top: 230px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_mariSta{
  position: fixed;
    left: 455px;
    top: 195px;
    font-size: 20px;
    color: aqua;

}


.spcon{
    position: fixed;
    left: 800px;
    top: 230px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_spcon{
   position: fixed;
    left: 820px;
    top: 195px;
    font-size: 20px;
    color: aqua;

}

.spnam{
    position: fixed;
    left: 440px;
    top: 300px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_spnam{
   position: fixed;
    left: 455px;
    top: 267px;
    font-size: 20px;
    color: aqua;

}


.noch{
    position: fixed;
    left: 800px;
    top: 300px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_noch{
   position: fixed;
    left: 820px;
    top: 267px;
    font-size: 20px;
    color: aqua;
}

.step3_second_h2{
  position: fixed;
    left: 420px;
    top: 360px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.meT{
    position: fixed;
    left: 440px;
    top: 430px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_meT{
   position: fixed;
    left: 455px;
    top: 395px;
    font-size: 20px;
    color: aqua;

}

.zone{
    position: fixed;
    left: 800px;
    top: 430px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_zone{
   position: fixed;
    left: 820px;
    top: 395px;
    font-size: 20px;
    color: aqua;

}

.dapNa{
    position: fixed;
    left: 440px;
    top: 510px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_dapNa{
   position: fixed;
    left: 455px;
    top: 475px;
    font-size: 20px;
    color: aqua;

}


.datJo{
    position: fixed;
    left: 800px;
    top: 510px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_datJo{
   position: fixed;
    left: 820px;
    top: 475px;
    font-size: 20px;
    color: aqua;

}


.claSelec{
    position: fixed;
    left: 440px;
    top: 590px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}

.label_claSelec{
   position: fixed;
    left: 455px;
    top: 555px;
    font-size: 20px;
    color: aqua;

}



.s3preveBut{
        position: fixed;
    left: 870px;
    top: 600px;
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
    top: 600px;
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
    height: 35px;
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
    height: 35px;
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
    height: 35px;
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
    height: 35px;
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
    height: 35px;
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
    top: 600px;
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
    top: 600px;
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
    top: 155px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}



.datDece{
    position: fixed;
    left: 440px;
    top: 220px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_datDece{
   position: fixed;
    left: 455px;
    top: 190px;
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
    top: 295px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;


}


.label_confirm{
   position: fixed;
    left: 455px;
    top: 265px;
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
    top: 360px;
    font-size: 20px;
    color: aqua;
    

}

.image_container{
    position: fixed;
    left: 440px;
    top: 400px;
    height: 230px;
    width: 300px;
    border-radius: 8px;
    border-color: white;
    background-color: white;
    border-color: aqua;


}

.s5SaveBut{
        position: fixed;
    left: 770px;
    top: 600px;
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
    top: 600px;
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
    top: 600px;
    height: 30px;
    color: black;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}



.progress-bar {
      width: 60%;
    background-color: #e0e0e0;
    border-radius: 5px;
    height: 10px;
    margin: 20px 0;
    position: fixed;
    top: 80px;
    left: 370px;
}

.progress {
  height: 100%;
  background-color: white;
  border-radius: 5px;
  transition: width 0.3s;
}

.step6_first_h21{
      position: fixed;
    left: 540px;
    top: 260px;
    font-size: 30px;
    width: 450px;
    color: aqua;
}

.step6_first_h22{
         position: fixed;
    left: 470px;
    top: 350px;
    width: 600px;
    font-size: 25px;
    color: aqua;
}

.step6_first_h23{
        position: fixed;
    left: 470px;
    width: 370px;
    top: 430px;
    font-size: 25px;
    color: aqua;
}
</style>
