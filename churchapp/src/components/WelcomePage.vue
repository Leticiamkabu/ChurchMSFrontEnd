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
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* full screen height */
  background: #e7f2fd;
  padding: 20px;
}

.welcome-container {
  width: 90%;
  max-width: 500px; /* Cap the max width */
  padding: 2rem;
  background-color: #87e3e1;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
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
  justify-content: center;
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
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #05919d, #7ab9b9);
}

button:hover {
  opacity: 0.9;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style>
