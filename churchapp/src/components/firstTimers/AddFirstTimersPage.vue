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

      

        <form @submit.prevent="submitRegistration" class="registration-form">
          <!-- User Details -->
          <div v-if="step === 1" class = "first_info">
            <h2>First Timer Registration</h2>

            <label class = "label_name" for="name">Name <span class="required-star">*</span> </label>
            <input class = "name" type="text" v-model="form.name" id="name" placeholder="Name" />

            <label class = "label_popular_name" for="middleName">Popular Name</label>
            <input class = "popular_name" type="text" v-model="form.popularName" id="middleName" placeholder="Popular Name"  />

            <label class = "label_phone_number" for="phoneNumber">Phone Number <span class="required-star">*</span> </label>
            <input  class = "phone_number" type="text" v-model="form.phoneNumber" id="phoneNumber" placeholder="Phone Number"  />

            <label class = "label_whatsapp_number" for="whatAppNumber">WhatsApp Number </label>
            <input  class = "whatsapp_number" type="text" v-model="form.whatAppNumber" id="whatAppNumber" placeholder="WhatApp Number"  />

            <label class = "label_birth_month" for="birthMonth">Birth Month <span class="required-star">*</span> </label>
            <input  class = "birth_month" type="text" v-model="form.birthMonth" id="birthMonth" placeholder="Birth Month"  />


            <label class = "label_house_location" for="houseLocation">House Location <span class="required-star">*</span> </label>
            <input class = "house_location" type="text" v-model="form.houseLocation" id="houseLocation" placeholder="House Location"  />

            <button type="button" @click="nextStep">Next</button>
          </div>


          <div v-if="step === 2">

            <label class = "label_purpose_of_coming" for="auw">Purpose Of Coming <span class="required-star">*</span> </label>
            <select class = "purpose_of_coming" v-model="form.purposeOfComing" id="auw"  >
              <option disabled value="">Select Purpose Of Coming</option>
              <option v-for="purpose in purposeOfComing" :key="purpose" :value="purpose">
                {{ purpose }}
              </option>
            </select>

            <label class = "label_contact_hours" for="contactHours"> Contact Hours  </label>
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
            <button class = "s2nextBut" type="button" @click="submitRegistration">Submit</button>
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
        birthMonth: '',
        specialPrayerOrCounseling: '',
        counselor: '',
        date: '',
      
      },

    };
  },

  computed: {
    isAdmin() {
      return sessionStorage.getItem("userRole") === 'ADMIN' ||sessionStorage.getItem("userRole") === 'ADMINISTRATOR' ;
    }
  },

  methods: {

    //https://churchmsbackend.onrender.com
    
    nextStep() {
      if (this.step < 2) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    refreshStep() {
     window.location.reload();
    },
    



    async submitRegistration() {

       if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{

      

      if (
      !this.form.name ||
      !this.form.phoneNumber ||
      !this.form.houseLocation ||
      !this.form.purposeOfComing ||
      !this.form.birthMonth 
    ) {
      alert("Please fill in all required fields.");
      this.step = 1;
      return;
    }
      console.info("in first timers registeration function")
      
  
      console.info("form", this.form)

      const formattedData = {
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

      console.info("form", formattedData)
      if (formattedData && Object.keys(formattedData).length > 0){
        this.loading = true; 
      try {
        const response = await axios.post('https://churchmsbackend.onrender.com/first_timers/create',formattedData);
            
        console.info(response.data)
         if (response.data.message === 'First timers creation successful'){
          //this.step = 6;
          alert('First Timer Data saved');
          this.step = 1;
          window.location.reload();
          // Wait for 5 minutes (300,000 milliseconds) before navigating to step 3
        // setTimeout(() => {
            //this.step = 1; // Move back to step 3 after 5 minutes
        // }, 300000);

        }
        else{
          alert('First Timer Data not saved');
        }
      } catch (error) {
        console.error("Saving First Timer details error:", error);
        alert("An error occurred during first timer registeration. Please try again.");
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
    //window.addEventListener("beforeunload", () => {
    //  localStorage.clear();
    //});
    
    }

  
};
</script>

<style scoped>

.required-star {
    color: #00d9ff;
  }

.registration-form {
   
      height: 465px;
    width: 720px;
    margin: 20px;
    position: fixed;
    left: 29.2%;
    top: 18%;
    background-color: #05919d;
    border-radius: 10px;
}


/* form for step 1 style*/

.first_info button{
        position: fixed;
    left: 750px;
    top: 585px;
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
    top: 545px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;

}
.label_ha{
   position: fixed;
    left: 440px;
    top: 520px;
    font-size: 20px;
    color: aqua;

}


.ht{
        position: fixed;
    left: 790px;
    top: 475px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_ht{
   position: fixed;
    left: 800px;
    top: 450px;
    font-size: 20px;
    color: aqua;

}

.ny{
    position: fixed;
    left: 431px;
    top: 475px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_ny{
   position: fixed;
    left: 440px;
    top: 450px;
    font-size: 20px;
    color: aqua;

}

.ea{
    position: fixed;
    left: 790px;
    top: 405px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_ea{
   position: fixed;
    left: 800px;
    top: 380px;
    font-size: 20px;
    color: aqua;

}

.pn{
    position: fixed;
    left: 431px;
    top: 405px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_pn{
   position: fixed;
    left: 440px;
    top: 380px;
    font-size: 20px;
    color: aqua;

}

.birth_month{
    position: fixed;
    left: 32%;
    top: 69%;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_birth_month{
   position: fixed;
    left: 33%;
    top: 63%;
    font-size: 20px;
    color: aqua;

}

.house_location{
    position: fixed;
    left: 58%;
    top: 69%;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_house_location{
   position: fixed;
    left: 59%;
    top: 63%;
    font-size: 20px;
    color: aqua;

}

.whatsapp_number{
    position: fixed;
    left: 58%;
    top: 54%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_whatsapp_number{
   position: fixed;
    left: 59%;
    top: 48%;
    font-size: 20px;
    color: aqua;

}

.phone_number{
    position: fixed;
    left: 32%;
    top: 54%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_phone_number{
   position: fixed;
    left: 33%;
    top: 48%;
    font-size: 20px;
    color: aqua;
}

.popular_name{
    position: fixed;
    left: 58%;
    top: 39%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_popular_name{
   position: fixed;
    left: 59%;
    top: 33%;
    font-size: 20px;
    color: aqua;

}

.name{
    position: fixed;
    left: 32%;
    top: 39%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_name{
   position: fixed;
    left: 33%;
    top: 33%;
    font-size: 20px;
    color: aqua;

}

.tt{
    position: fixed;
    left: 430px;
    top: 190px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_tt{
  position: fixed;
    left: 440px;
    top: 158px;
    font-size: 20px;
    color: aqua;

}

h2{

  position: fixed;
        left: 46%;
    top: 27%;
    height: 10px;
    width: 300px;
    color: #43edd7;
    font-size:20px;
}




/* form for step 2 style*/

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
    left: 32%;
    top: 67%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_date{
   position: fixed;
    left: 33%;
    top: 61%;
    font-size: 20px;
    color: aqua;

}

.counselor{
    position: fixed;
    left: 58%;
    top: 50%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_counselor{
   position: fixed;
    left: 59%;
    top: 44%;
    font-size: 20px;
    color: aqua;
}

.special_prayer_or_counseling{
    position: fixed;
    left: 32%;
    top: 50%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_special_prayer_or_counseling{
   position: fixed;
    left: 33%;
    top: 44%;
    font-size: 20px;
    color: aqua;
    

}

.contact_hours{
    position: fixed;
    left: 58%;
    top: 33%;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_contact_hours{
   position: fixed;
    left: 59%;
    top: 27%;
    font-size: 20px;
    color: aqua;

}

.purpose_of_coming{
    position: fixed;
    left: 32%;
    top: 33%;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_purpose_of_coming{
  position: fixed;
    left: 33%;
    top: 27%;
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
    left: 800px;
    top: 515px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_nokp{
   position: fixed;
    left: 820px;
    top: 485px;
    font-size: 20px;
    color: aqua;

}

.nok{
    position: fixed;
    left: 440px;
    top: 515px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_nok{
   position: fixed;
    left: 455px;
    top: 485px;
    font-size: 20px;
    color: aqua;

}

.fan{
    position: fixed;
    left: 800px;
    top: 435px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_fan{
   position: fixed;
    left: 820px;
    top: 405px;
    font-size: 20px;
    color: aqua;

}

.man{
    position: fixed;
    left: 440px;
    top: 435px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align:center;


}

.label_man{
   position: fixed;
    left: 455px;
    top: 405px;
    font-size: 20px;
    color: aqua;

}


.s2preveBut{
        position: fixed;
    left: 870px;
    top: 550px;
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
    top: 550px;
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
    top: 140px;
    height: 10px;
    width: 800px;
    color: #43edd7;
}

.mariSta{
    position: fixed;
    left: 440px;
    top: 205px;
    height: 33px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_mariSta{
  position: fixed;
    left: 455px;
    top: 175px;
    font-size: 20px;
    color: aqua;

}


.spcon{
    position: fixed;
    left: 800px;
    top: 205px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_spcon{
   position: fixed;
    left: 820px;
    top: 175px;
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
    text-align : center;


}

.label_spnam{
   position: fixed;
    left: 455px;
    top: 250px;
    font-size: 20px;
    color: aqua;

}


.noch{
    position: fixed;
    left: 800px;
    top: 280px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_noch{
   position: fixed;
    left: 820px;
    top: 250px;
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
    top: 400px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_meT{
   position: fixed;
    left: 455px;
    top: 370px;
    font-size: 20px;
    color: aqua;

}

.zone{
    position: fixed;
    left: 800px;
    top: 400px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_zone{
   position: fixed;
    left: 820px;
    top: 370px;
    font-size: 20px;
    color: aqua;

}

.dapNa{
    position: fixed;
    left: 440px;
    top: 470px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_dapNa{
   position: fixed;
    left: 455px;
    top: 445px;
    font-size: 20px;
    color: aqua;

}


.datJo{
    position: fixed;
    left: 800px;
    top: 470px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_datJo{
   position: fixed;
    left: 820px;
    top: 445px;
    font-size: 20px;
    color: aqua;
    

}


.claSelec{
    position: fixed;
    left: 440px;
    top: 545px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align : center;


}

.label_claSelec{
   position: fixed;
    left: 455px;
    top: 520px;
    font-size: 20px;
    color: aqua;

}



.s3preveBut{
        position: fixed;
    left: 870px;
    top: 550px;
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
    top: 550px;
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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    text-align : center;



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
    text-align : center;


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
    top: 550px;
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
    top: 550px;
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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    text-align : center;


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
    height: 185px;
    width: 300px;
    border-radius: 8px;
    border-color: white;
    background-color: white;
    border-color: aqua;


}

.s5SaveBut{
        position: fixed;
    left: 770px;
    top: 550px;
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
    top: 550px;
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
    top: 550px;
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
