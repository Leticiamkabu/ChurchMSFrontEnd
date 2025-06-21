<template>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Boxicons CSS -->
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
  </head>
  <body>
    <nav class="navbar">
      <div class="logo_item">
        <i class="bx bx-menu" id="sidebarOpen" @click="toggleMenu"></i>
        <img src="@/assets/ag2.png" alt="" />
        <i>CTC CMS</i>
      </div>
      <!-- <div class="search_bar">
        <input type="text" placeholder="Search" />
      </div> -->
      <div class="navbar_content" :class="{ 'active': isMenuActive }">
        <i class="bi bi-grid"></i>
        <i class='bx bx-sun' @click="toggleDarkMode" id="darkLight"></i>
        <i class='bx bx-bell'></i>
        <button @click="logout">Logout</button>
      </div>
    </nav>
  </body>
</template>

<script>

import axios from 'axios';
export default {
  data() {
    return {

      userId : "",
      isDark :false,

      isMenuActive: false, // This will control the toggling of the navbar items
    };
  },

  computed: {
  darkModeIcon() {
    return this.isDark ? 'bx bx-moon' : 'bx bx-sun';
  }
},

  methods: {

    toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle("dark");
  }
  ,
    async logout() {
      this.userId = sessionStorage.getItem("userId");
      console.info(" id :", this.userId )
      // Clear session storage
      sessionStorage.clear();
      localStorage.clear();

      

      // add the logout timeMarked
      try {
          console.info("Updating user tracking")
          console.info("date",typeof new Date().toISOString())

          const response = await axios.patch(`https://churchmsbackend.onrender.com/auth/update_user_tracking/${this.userId}/${new Date().toISOString()}`, {
            // Include the fields and new values you want to update
            
            
          });
          if(response.data.message === "User activitity tracking updated successfully"){
					console.info("User tracker updated");
				}
        
        } catch (error) {
				console.error("User tracker error :", error);
			}

      // Optional: Redirect the user to the login page
      window.location.href = "/#";

    },

    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    }
  },

  mounted() {
    // Dark mode functionality
    document.addEventListener("DOMContentLoaded", () => {
      const darkLight = document.querySelector("#darkLight");

      if (!darkLight) {
        console.error("Dark mode toggle icon (darkLight) not found");
        return;
      }

      darkLight.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
          darkLight.classList.replace("bx-sun", "bx-moon");
        } else {
          darkLight.classList.replace("bx-moon", "bx-sun");
        }
      });
    });
  }
};
</script>

<style>
/* Include only navbar-related styles */

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

:root {
  --white-color: #fff;
  --blue-color: #4070f4;
  --grey-color: #707070;
  --grey-color-light: #aaa;
}

body {
  background-color: #e7f2fd;
  transition: all 0.5s ease;
}

body.dark {
  background-color: #333;
}

body.dark {
  --white-color: #333;
  --blue-color: #fff;
  --grey-color: #f2f2f2;
  --grey-color-light: #aaa;
}

/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem 1.25rem;
  z-index: 1000;
  box-shadow: 0 0 20.125rem var(--grey-color-light);
  flex-wrap: wrap;
  gap: 0.625rem;
}

.logo_item {
  display: flex;
  align-items: center;
  column-gap: 0.625rem;
  font-size: clamp(1rem, 2vw, 1.375rem);
  font-weight: 500;
  color: #2cc7c7;
  flex: 1 1 auto;
  min-width: 9.375rem;
}

.navbar img {
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: 50%;
}

.search_bar {
  height: 2.9375rem; 
  flex: 2 1 18.75rem;
  min-width: 11.25rem;
}

.search_bar input {
  height: 100%;
  width: 100%;
  border-radius: 1.5625rem;
  font-size: 1rem;
  outline: none;
  background-color: var(--white-color);
  color: var(--grey-color);
  border: 0.0625rem solid var(--grey-color-light);
  padding: 0 1.25rem;
}

.navbar_content {
  display: flex;
  align-items: center;
  gap: 0.9375rem;
  flex: 1 1 auto;
  justify-content: flex-end;
  min-width: 9.375rem;
}

.navbar_content i {
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--grey-color);
}

.navbar_content button {
  color: black;
  background-color: #92c1c0;
  border-radius: 0.3125rem;
  padding: 0.5rem 0.75rem; 
  border: none;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
}

/* Mobile responsiveness */
/* Responsive stacking for small screens */
@media (max-width: 37.5rem) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar_content {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .search_bar {
    width: 100%;
  }

  .navbar_content button {
    width: 100%;
    margin-top: 0.625rem;
  }
}
</style>
