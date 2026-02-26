<template>

	<router-view></router-view>

	<div class = "login-B">

		<!-- Loading Screen -->
		<div v-if="loading" class="loading-screen">
		<div class="spinner"></div>
		<p>Loading, please wait...</p>
		</div>


		<div class="containers">
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
  data() {

    return {
		userID : '',
		loading: false,
		email: '',
		password: '',
    };

  },

  //https://churchmsbackend.onrender.com

  methods: {

    async login() {
		//console.info(this.email)
		//console.info(this.password)
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
					sessionStorage.setItem('userId', response.data.data.id);
					sessionStorage.setItem('username', response.data.data.firstName + " " +response.data.data.lastName);
					sessionStorage.setItem('privilege', response.data.data.privileges);

					try {
						const feedBack = await axios.post('https://churchmsbackend.onrender.com/auth/user_tracking', {
						userId: response.data.data.id,
						status: "ACTIVE",
						logInTime: new Date().toISOString(),
						});

						if(feedBack.data.message === "User activitity tracking successful"){
							console.info("User tracker saved");
						}

					} catch (error) {
						console.error("User tracker error :", error);
						//alert("An error occurred during login. Please try again.");
				
					}

					if (response.data.data.role === "ADMIN" || response.data.data.role === "ADMINISTRATOR"){
						this.$router.push('/adminOverView'); // Navigate to home page upon successful login
					}
					else if (response.data.data.role === "DATA CLERK" || response.data.data.role === "CHIEF DATA CLERK"){
						this.$router.push('/home'); // Navigate to home page upon successful login
					}
					else{
						this.$router.push('/adminOverView');
					}


					

				}else if(response.status === 400){
					console.info(response.data.detail); 

				}	
					
			
		
			} catch (error) {
				if (error.response) {
					// Server responded with a status outside the 2xx range
					if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
						alert('Invalid credentials');
					} 

					else {
						console.error("Server error:", error.response);
						alert("An error occurred during login. Please try again.");
					}

				} else if (error.request) {
					// Request was made but no response received (network error)
					console.error("Network error:", error.request);
					alert("Network error. Please check your internet connection.");

				} else {
					// Something else happened while setting up the request
					console.error("Unexpected error:", error.message);
					alert("An unexpected error occurred.");
				}

			}finally {
				this.email = "";
				this.password = "";
				this.loading = false; // Hide loading screen
			}

		}
			
    },



  },

  mounted: async function () {
	// Clear storage and notify backend if needed
	this.userID = sessionStorage.getItem("userId");

	if (this.userID !== null){
		sessionStorage.clear();
		localStorage.clear();

		// Optional: Inform backend to invalidate session/token
		try {

			console.info("Updating user tracking")

			const response = await axios.patch(`https://churchmsbackend.onrender.com/auth/update_user_tracking/${this.userID}/${new Date().toISOString()}`,);
				console.info("Updating : ",response)
				if(response.data.message === "User activitity tracking updated successfully"){
					console.info("User tracker updated");
				}
				
		} catch (error) {
			console.error("User tracker error :", error);
		}

	}
  
	}
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
	min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.containers {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 22.5rem; /* Set max width for the container */
	min-height: auto;
	background-color: white;
	border-radius: 0.75rem; /* Optional: rounded corners */
	overflow: hidden;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
	padding: 25px 30px;
}
    

.screen {
	background: linear-gradient(90deg,rgb(84, 164, 157),rgb(120, 174, 184));
	position: relative;
	width: 100%;
	max-width: 22.5rem; /* Max width to prevent over-expanding */
	height: 28.125rem;
	box-shadow: 0 0 1.5rem rgb(86, 130, 150);
	border-radius: 0.75rem; /* Optional: rounded corners */
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
	height: 32.5rem;
	width: 32.5rem;
	background: #fff;
	top: -3.125rem;
	right: 7.5rem;
	border-radius: 0 4.5rem 0 0;
}

.screen__background__shape2 {
	height: 13.75rem;
	width: 13.75rem;
	background: rgb(142, 226, 222);
	top: -10.75rem;
	right: 0;
	border-radius: 2rem;
}

.screen__background__shape3 {
	height: 33.75rem;
	width: 11.875rem;
	background: linear-gradient(270deg, rgb(84, 148, 164), rgb(87, 214, 208));
	top: -1.5rem;
	right: 0;
	border-radius: 2rem;
}

.screen__background__shape4 {
	height: 25rem;
	width: 12.5rem;
	background: rgb(142, 226, 222);
	top: 26.25rem;
	right: 3.125rem;
	border-radius: 3.75rem;
}

.login {
	width: 100%;
	padding: 1.875rem;
	padding-top: 9.75rem;
}

.login__field {
	padding: 1.25rem 0;
	position: relative;
}

.login__icon {
	position: absolute;
	top: 1.875rem;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 0.125rem solid #D1D1D4;
	background: none;
	padding: 0.625rem 0 0.625rem 1.5rem;
	font-weight: 700;
	width: 100%; /* Full width */
	transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #6A679E;
}

.login__submit {
	background: #fff;
	font-size: 0.875rem;
	margin-top: 1.875rem;
	padding: 1rem 1.25rem;
	border-radius: 1.625rem;
	border: 0.0625rem solid #d4d3e8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #05919d;
	box-shadow: 0 0.125rem 0.125rem #05919d;	
	cursor: pointer;
	transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #6A679E;
	outline: none;
}

.button__icon {
	font-size: 1.5rem;
	margin-left: auto;
	color: #7875B5;
}

.social-login {
	position: absolute;
	height: 8.75rem;
	width: 10rem;
	text-align: center;
	bottom: 0;
	right: 0;
	color: #fff;
}

.social-icons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.social-login__icon {
	padding: 1.25rem 0.625rem;
	color: #fff;
	text-decoration: none;
	text-shadow: 0 0 0.5rem #7875b5;
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
	width: 3.125rem;
	height: 3.125rem;
	border: 0.3125rem solid #f3f3f3;
	border-top: 0.3125rem solid #3498db;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

.loading-screen p {
	color: #fff;
	font-size: 1.125rem;
	margin-top: 0.625rem;
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
@media (max-width: 48em) {
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
		padding: 1.25rem;
		padding-top: 7.5rem;
	}

	.login__input {
		width: 100%;
	}

	.social-login {
		position: static;
		width: 100%;
		margin-top: 1.25rem;
	}
}
</style>
