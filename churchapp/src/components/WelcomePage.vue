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
  height: 100vh; /* full screen height */
  background: #e7f2fd;
  padding: 0 5vw;
}

.welcome-container {
  width: 100%;
  max-width: 35rem; /* Cap the max width */
  padding: 2rem;
  background-color: #87e3e1;
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1d6767;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: black;
}

.button-container {
  display: flex;
  justify-content: center;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 0.3rem;
  transition: all 0.3s ease;
}

.login-btn {
  color: #040404;
  background: linear-gradient(135deg, #05919d, #7ab9b9);
}

button:hover {
  opacity: 0.9;
}

/* Responsive adjustments */

/* Tablet */
@media (max-width: 48rem) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
}

/* Small phones */
@media (max-width: 30rem) {
  .welcome-container {
    padding: 1.5rem 1rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  p {
    font-size: 0.95rem;
  }

  button {
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
  }
}
</style>
