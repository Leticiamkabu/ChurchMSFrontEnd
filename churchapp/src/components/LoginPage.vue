<template>
<router-view></router-view>
<div class = "login-B">

 <!-- Loading Screen -->
    <div v-if="loading" class="loading-screen">
      <div class="spinner"></div>
      <p>Loading, please wait...</p>
    </div>


  <div class="container">
	<div class="screen">
		<div class="screen__content">
			<form @submit.prevent="login" class="login">

				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" v-model="email" class="login__input" placeholder="User name / Email" required />
				</div>

				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" v-model="password" class="login__input" placeholder="Password" required />
				</div>

				<button type="submit" class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>	

			</form>

			<div class="social-login">
				<h3>log in via</h3>
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
		loading: false,
      email: '',
      password: '',
    };
  },

  //https://churchmsbackend.onrender.com

  methods: {
    async login() {
		console.info(this.email)
		console.info(this.password)
		this.loading = true; 

		if (this.email == "guest" && this.password == "guest"){
			sessionStorage.setItem('isAuthenticated', 'True');
			sessionStorage.setItem('userRole', "GUEST");
			this.$router.push('/adminOverView');
			this.loading = false;
		}
		else{
			try {
        const response = await axios.post('https://churchmsbackend.onrender.com/auth/login', {
          email: this.email,
          password: this.password,
        });

		console.info(response.data)
        if (response.data.message === 'User login successful') {
          // Save token if your backend sends one for future authenticated requests
          sessionStorage.setItem('isAuthenticated', 'True');
			sessionStorage.setItem('userRole', response.data.data.role);
			sessionStorage.setItem('userId', response.data.data.role);
			sessionStorage.setItem('username', response.data.data.firstName + " " +response.data.data.lastName);
			sessionStorage.setItem('privilage', response.data.data.privileges);


			if (response.data.data.role === "ADMIN"){
				this.$router.push('/adminOverView'); // Navigate to home page upon successful login
			}
			else{
				this.$router.push('/home');
			}

        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login. Please try again.");
      }finally {
		//this.email = "";
		//this.password = "";
        this.loading = false; // Hide loading screen
      }

		}
      
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: Raleway, sans-serif;
}

.login-B {
	background: #e7f2fd;
	height: 100vh; /* Set the full height for the background */
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 80vh;
	width: 100%;
	max-width: 360px; /* Set max width for the container */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); /* Center container */
	background-color: white;
	border-radius: 12px; /* Optional: rounded corners */
}

.screen {
	background: linear-gradient(90deg,rgb(84, 164, 157),rgb(120, 174, 184));
	position: relative;
	width: 100%;
	max-width: 360px; /* Max width to prevent over-expanding */
	height: 450px;
	box-shadow: 0px 0px 24px rgb(86, 130, 150);
	border-radius: 12px; /* Optional: rounded corners */
}

.screen__content {
	z-index: 1;
	position: relative;
	height: 100%;
}

.screen__background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;
	top: -50px;
	right: 120px;
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background:rgb(142, 226, 222);
	top: -172px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg,rgb(84, 148, 164),rgb(87, 214, 208));
	top: -24px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background:rgb(142, 226, 222);
	top: 420px;
	right: 50px;
	border-radius: 60px;
}

.login {
	width: 100%;
	padding: 30px;
	padding-top: 156px;
}

.login__field {
	padding: 20px 0px;
	position: relative;
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 100%; /* Full width */
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #6A679E;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #05919d;
	box-shadow: 0px 2px 2px #05919d;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #6A679E;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #7875B5;
}

.social-login {
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: #fff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 20px 10px;
	color: #fff;
	text-decoration: none;
	text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
	transform: scale(1.5);
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

/* Responsive Styles */
@media (max-width: 768px) {
	.container {
		width: 90%;
		left: 5%;
		position: relative;
		top: auto;
	}

	.screen {
		width: 100%;
		height: auto;
		box-shadow: none;
	}

	.login {
		width: 100%;
		padding: 20px;
		padding-top: 120px;
	}

	.login__input {
		width: 100%;
	}

	.social-login {
		position: static;
		width: 100%;
		margin-top: 20px;
	}
}
</style>
