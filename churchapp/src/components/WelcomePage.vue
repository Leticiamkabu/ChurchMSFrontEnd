<template>
<router-view></router-view>
<div v-if="$route.path === '/'" class = "welcome">

  <div  class="welcome-container">
    <h1>Welcome to CTC CMS</h1>
    <p>Please log in to continue.</p>
    
    <div class="button-container">
      <router-link to="/login">
        <button class="login-btn">Login</button>
      </router-link>
      
    </div>
  </div>

  </div>

  
  
</template>


<style scoped>
.welcome-container {
  width: 500px; /* Set a fixed width */
  height: 400px; /* Set the same height to make it a square */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #87e3e1;
  border-radius: 10px; /* Optional: gives the square slightly rounded corners */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow */
  margin: 0 auto; /* Center horizontally on the page */
  position: fixed;
  top:120px;
  left:430px;
}

.welcome {
      //background: linear-gradient(135deg, #71b7e6, #9b59b6);
      background :#e7f2fd;
    height: 649px;

}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #1d6767;
}

p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: black;
}

.button-container {
  display: flex;
  gap: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.login-btn {
  color: #040404;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #05919d, #7ab9b9);
}

.register-btn {
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

button:hover {
  opacity: 0.9;
}

</style>
