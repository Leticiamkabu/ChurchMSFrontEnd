<template>
<router-view></router-view>
<div class = "register-B">
  <div class="container">
    <!-- Title section -->
    <div class="title">Registration</div>
    <div class="content">
      <!-- Registration form -->

      <form @submit.prevent="register" action="#">

        <div class="user-details">

          <!-- Input for First Name -->
          <div class="input-box">
            <span class="details">First Name</span>
            <input type="text" v-model="firstname" placeholder="Enter your first name" required>
          </div>

          <!-- Input for Last name -->
          <div class="input-box">
            <span class="details"> Last name</span>
            <input type="text"  v-model="lastname" placeholder="Enter your last name" required>
          </div>

          <!-- Input for Email -->
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text" v-model="email"  placeholder="Enter your email" required>
          </div>

          <!-- Input for Phone Number -->
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" v-model="phoneNumber" placeholder="Enter your number" required>
          </div>

          <!-- Input for Password -->
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" v-model="password" placeholder="Enter your password" required>
          </div>

          <!-- Input for Confirm Password -->
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="password" v-model="confirmPassword" placeholder="Confirm your password" required>
          </div>
          
          <p v-if="passwordMismatch" class="error">Passwords do not match</p>
        </div>

        <div class="gender-details">

          <!-- Radio buttons for gender selection -->
          <input type="radio" v-model="role" name="gender" value="ADMIN" id="dot-1">
          <input type="radio" v-model="role" name="gender" value="USER" id="dot-2">

          <span class="gender-title">Role</span>

          <div class="category">
            <!-- Label for Admin -->
            <label for="dot-1">
              <span class="dot one"></span>
              <span class="gender">Admin</span>
            </label>
            <!-- Label for  User -->
            <label for="dot-2">
              <span class="dot two"></span>
              <span class="gender">User</span>
            </label>
            
            
          </div>
        </div>
        <!-- Submit button -->
        <div class="button">
          <input type="submit" value="Register" :disabled="!isFormValid">
        </div>

        <router-link to="/" >
        <i> Back</i>
        </router-link>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterationPage'
  ,
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: ''
    };
  },
  computed: {
    // Check if password and confirmPassword match
    passwordMismatch() {
      return this.password && this.confirmPassword && this.password !== this.confirmPassword;
    },
    // Validate if all fields are filled and passwords match
    isFormValid() {
      return (
        this.firstname &&
        this.lastname &&
        this.email &&
        this.phoneNumber &&
        this.password &&
        this.confirmPassword &&
        this.role &&
        !this.passwordMismatch
      );
    }
  },
  methods: {
    async register() {
      if (this.isFormValid) {
        // Prepare data payload for backend
        const payload = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          role: this.role
        };

        try {
          const response = await axios.post('https://churchmsbackend.onrender.com/auth/create_user', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            role: this.role
          });

          console.info(response)
          if (response.data.message === 'User registeration successfully') {
            // Save token if your backend sends one for future authenticated requests
            
            this.$router.push('/login'); // Navigate to home page upon successful login
          } else {
            alert(response);
          }
      } catch (error) {
        console.error("Registeration error:", error);
        alert("An error occurred during registeration. Please try again.");
      }
        // Send the payload to the backend registration endpoint
        // axios.post('your-backend-endpoint', payload)
        // .then(response => {
        //   // Handle success, maybe redirect to a login or home page
        // })
        // .catch(error => {
        //   // Handle error
        // });
        console.log("Form is valid. Proceeding with registration...", payload);
      } else {
        console.log("Form is invalid");
      }
    }
  }
};
</script>

<style scope>


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
</style>