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

      <h1>User Registration</h1>
      
      <form @submit.prevent="register" class="registration-form">
        <!-- User Details -->
        <div v-if="step === 1" class = "first_info">
          
          <h2 class = "step1_first_h2"> User Registeration</h2>
          <label class = "label_fn" for="firstName">First Name <span class="required-star">*</span> </label>
          <input class = "fn" type="text" v-model="form.firstname" id="firstName" placeholder=" First Name" required />

          <label class = "label_ln" for="lastName">Last Name <span class="required-star">*</span> </label>
          <input  class = "ln" type="text" v-model="form.lastname" id="lastName" placeholder=" Last Name" required />
         
          <label class = "label_ea" for="email">Email <span class="required-star">*</span> </label>
          <input class = "ea" type="email" v-model="form.email" id="email" placeholder=" Email" required />

          <label class = "label_pn" for="phoneNumber">Phone Number <span class="required-star">*</span> </label>
          <input class = "pn" type="text" v-model="form.phoneNumber" id="phoneNumber" placeholder=" Phone Number" required />

          <label class = "label_pw" for="password">Password <span class="required-star">*</span> </label>
          <input class = "pw" type="password" v-model="form.password" id="password" placeholder=" Password" required />

          <label class = "label_cpw" for="confirmPassword">Confirm password <span class="required-star">*</span> </label>
          <input  class = "cpw" type="password" v-model="form.confirmPassword" id="confirmPassword" placeholder=" Confirm password" required />
          <p v-if="passwordMismatch" class="error">Password does not match</p>

          <label class = "label_role" for="role">Role <span class="required-star">*</span> </label>
          <select class = "role" v-model="form.role" id="role"  required>
            <option disabled value="">Select Role </option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>

          <label class = "label_privilege" for="privilege">Privileges <span class="required-star">*</span> </label>
          <select class = "privilege" v-model="form.privilege" id="privilege"  required>
            <option disabled value="">Select privilege </option>
            <option v-for="privilege in privileges" :key="privilege" :value="privilege">
              {{ privilege }}
            </option>
          </select>

          <button class="s2nextBut" type="button" @click="register">Submit</button>
        </div>

    

        <div v-if="step === 2">

          <label class="label_heading_final">Users registration complete</label>
        </div>
      </form>

      <div class="progress-bar">
        <div :style="{ width: (step - 1) * 53 + '%' }" class="progress"></div>
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

  name: 'RegisterationPage'
  ,
  data() {
    return {
      loading: false,
      step: 1,
      
      roles :['ADMIN', 'DATA CLERK', 'ADMINISTRATOR', 'GUEST'],
      privileges: ['ADMIN PRIVILEGES', 'DATA CLERK PRIVILEGES', 'ADMINISTRATOR PRIVILEGES', 'GUEST PRIVILEGES'],
      form: {
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: '',
      privilege: '',
      },

    };
  },
  computed: {

    // Check if password and confirmPassword match
    passwordMismatch() {
      
      return this.form.password && this.form.confirmPassword && this.form.password !== this.form.confirmPassword;
      
    },

    // Validate if all fields are filled and passwords match
    

  },

  methods:{

   // https://churchmsbackend.onrender.com


    isFormValid() {
      return (
        this.form.firstname &&
        this.form.lastname &&
        this.form.email &&
        this.form.phoneNumber &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.role &&
        this.form.privilege
      );
      
    },
    
    nextStep() {
      if (
      !this.form.firstname ||
      !this.form.lastname ||
      !this.form.email ||
      !this.form.phoneNumber ||
      !this.form.password ||
      !this.form.confirmPassword ||
      !this.form.role ||
      !this.form.privilege
    ) {
      alert("Please fill in all required fields.");
      return;
    }
      if (this.step < 1) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },


    async register() {
      
       if(sessionStorage.getItem('userRole') == "GUEST"){
      alert("You are not allowed to perform this action"); 
    }else{

      if (this.form.password !== this.form.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
      }

     if (!this.form.privilege.includes(this.form.role)) {
      alert("Please choose the appropriate privilege for the right role.");
      return;
      }

      
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
          privileges: this.form.privilege,
        };

        console.log("Form is valid. Proceeding with registration...", payload);

        try {
          const response = await axios.post('https://churchmsbackend.onrender.com/auth/create_user', {
            firstName: this.form.firstname,
            lastName: this.form.lastname,
            email: this.form.email,
            phoneNumber: this.form.phoneNumber,
            password: this.form.password,
            role: this.form.role,
            privileges: this.form.privilege
            ,
          });

          console.info(response)
          if (response.data.message === 'User registeration successfully') {
           
            // On success, move to the completion step
            //this.step = 3;
            this.loading = false;
            
          } else if (response.data == "Email already exist"){
            alert("Email already exists, Try registering with a new email");

          } else {
            console.info("error response for registeration ",response)
            alert("User registeration failed");
          }
        } catch (error) {
        console.error("Registeration error:", error);
        alert("An error occurred during registeration. Please try again.");
        }
        finally {
        this.loading = false; // Hide loading screen
        window.location.reload();
      }
        
        

      } else {
        console.log("Form is invalid");
        alert("Form is invalid. Please try again.");
      }
    }}
  },

   mounted() {
    // Clear local storage when the tab or window is closed
    //window.addEventListener("beforeunload", () => {
     // localStorage.clear();
    //});
  }

  
};
</script>




<style scope>
.required-star {
    color: #00d9ff;
  }

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.register-B {
	background: linear-gradient(135deg, #71b7e6, #9b59b6);
  height: 649px;
 
}

.container {
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 300px;
  top: 30px;
}

.container .title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
}
.container .title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 30px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}
.content form .user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}
form .user-details .input-box {
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
}
form .input-box span.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}
.user-details .input-box input {
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}
.user-details .input-box input:focus,
.user-details .input-box input:valid {
  border-color: #9b59b6;
}
form .gender-details .gender-title {
  font-size: 20px;
  font-weight: 500;
}
form .category {
  display: flex;
  width: 30%;
  margin: 14px 0;
  justify-content: space-between;
}
form .category label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
form .category label .dot{
  height: 18px;
  width: 18px;
  border-radius: 50%;
  margin-right: 10px;
  background: #d9d9d9;
  border: 5px solid transparent;
  transition: all 0.3s ease;
}


#dot-1:checked~.category label .one,
#dot-2:checked~.category label .two,
#dot-3:checked~.category label .three {
  background: #9b59b6;
  border-color: #d9d9d9;
}
form input[type="radio"] {
  display: none;
}
form .button {
  height: 45px;
  margin: 35px 0
}
form .button input {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}
form .button input:hover {
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
}
/* Responsive media query code for mobile devices */
@media(max-width: 584px) {
  .container {
    max-width: 100%;
  }
  form .user-details .input-box {
    margin-bottom: 15px;
    width: 100%;
  }
  form .category {
    width: 100%;
  }
  .content form .user-details {
    max-height: 300px;
    overflow-y: scroll;
  }
  .user-details::-webkit-scrollbar {
    width: 5px;
  }
}
/* Responsive media query code for mobile devices */
@media(max-width: 459px) {
  .container .content .category {
    flex-direction: column;
  }
}

/* for registeration form*/

.registration-form {
   
    height: 455px;
    width: 720px;
    margin: 20px;
    position: fixed;
    left: 380px;
    top: 110px;
    background-color: #05919d;
    border-radius: 10px;
}



.first_info button{
        position: fixed;
    left: 990px;
    top: 600px;
    height: 30px;
    width: 100px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.step1_first_h2{
  position: fixed;
    left: 650px;
    top: 155px;
    height: 10px;
    width: 500px;
    color: #43edd7;
}

.fn{
    position: fixed;
    left: 440px;
    top: 240px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: #00d9ff;;
    background-color: white;
    text-align: center;


}

.label_fn{
   position: fixed;
    left: 460px;
    top: 200px;
    font-size: 20px;
    color: aqua;

}



.ln{
    position: fixed;
    left: 800px;
    top: 240px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align: center;


}

.label_ln{
   position: fixed;
    left: 820px;
    top: 200px;
    font-size: 20px;
    color: aqua;
}

.ea{
    position: fixed;
    left: 440px;
    top: 340px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align: center;


}

.label_ea{
   position: fixed;
    left: 460px;
    top: 300px;
    font-size: 20px;
    color: aqua;

}


.pn{
    position: fixed;
    left: 800px;
    top: 340px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align: center;


}

.label_pn{
   position: fixed;
    left: 820px;
    top: 300px;
    font-size: 20px;
    color: aqua;

}



.pw{
    position: fixed;
    left: 440px;
    top: 430px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align: center;

}

.label_pw{
   position: fixed;
    left: 460px;
    top: 395px;
    font-size: 20px;
    color: aqua;

}


.cpw{
    position: fixed;
    left: 800px;
    top: 430px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;
    text-align: center;

}

.label_cpw{
   position: fixed;
    left: 820px;
    top: 395px;
    font-size: 20px;
    color: aqua;

}

.error{
   position: fixed;
    left: 810px;
    top: 373px;
    font-size: 20px;
    color: aqua;

}

.role{
    position: fixed;
    left: 440px;
    top: 515px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}
.label_role{
   position: fixed;
    left: 460px;
    top: 480px;
    font-size: 20px;
    color: aqua;

}

.privilege{
    position: fixed;
    left: 800px;
    top: 515px;
    height: 35px;
    width: 300px;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}
.label_privilege{
   position: fixed;
    left: 800px;
    top: 480px;
    font-size: 20px;
    color: aqua;

}


/* step 2 */

.step2_first_h2{
  position: fixed;
    left: 420px;
    top: 155px;
    height: 10px;
    width: 500px;
    color: #43edd7;
}




.label_heading{
  position: fixed;
    left: 455px;
    top: 205px;
    font-size: 20px;
    color: aqua;

}

.label_heading_final{
  position: fixed;
    left: 560px;
    top: 370px;
    font-size: 30px;
    color: aqua;

}


.privilege1 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 240px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege1-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 240px;
  position: fixed;
}

.privilege2 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 280px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege2-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 280px;
  position: fixed;
}



.privilege3 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 320px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege3-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 320px;
  position: fixed;
}

.privilege4 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 360px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege4-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 360px;
  position: fixed;
}

.privilege5 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 400px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege5-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 400px;
  position: fixed;
}


.privilege6 {
  margin-right: 10px; /* Adjust the space between the checkbox and the text */
  left: 470px;
  top: 440px;
  position: fixed;
  height: 33px;
    width: 20px;


}

.privilege6-text {
  font-size: 20px; /* Adjust the font size if needed */
  color: aqua; /* Text color */
  left: 500px;
  top: 440px;
  position: fixed;
}

.first_info .s2nextBut{
    position: fixed;
    left: 720px;
    top: 542px;
    height: 30px;
    width: 100px;
    color: #010808;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s2submitBut{
   position: fixed;
    left: 970px;
    top: 535px;
    height: 30px;
    width: 100px;
    color: #010808;
    border-radius: 10px;
    border-color: aqua;
    background-color: white;

}

.s2preveBut{
   position: fixed;
    left: 850px;
    top: 535px;
    height: 30px;
    width: 100px;
    color: #010808;
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