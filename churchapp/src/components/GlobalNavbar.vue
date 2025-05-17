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
        <img src="@/assets/logo.png" alt="" />
        <i>CTC CMS</i>
      </div>
      <div class="search_bar">
        <input type="text" placeholder="Search" />
      </div>
      <div class="navbar_content" :class="{ 'active': isMenuActive }">
        <i class="bi bi-grid"></i>
        <i class='bx bx-sun' id="darkLight"></i>
        <i class='bx bx-bell'></i>
        <button @click="logout">Logout</button>
      </div>
    </nav>
  </body>
</template>

<script>
export default {
  data() {
    return {
      isMenuActive: false, // This will control the toggling of the navbar items
    };
  },
  methods: {
    logout() {
      // Clear session storage
      sessionStorage.clear();

      // Optional: Redirect the user to the login page
      window.location.href = "/#/login";
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
  padding: 15px 30px;
  z-index: 1000;
  box-shadow: 0 0 2px var(--grey-color-light);
  flex-wrap: wrap;
}

.logo_item {
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 22px;
  font-weight: 500;
  color: var(--blue-color);
}

.navbar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.search_bar {
  height: 47px;
  max-width: 430px;
  width: 100%;
}

.search_bar input {
  height: 100%;
  width: 100%;
  border-radius: 25px;
  font-size: 18px;
  outline: none;
  background-color: var(--white-color);
  color: var(--grey-color);
  border: 1px solid var(--grey-color-light);
  padding: 0 20px;
}

.navbar_content {
  display: flex;
  align-items: center;
  column-gap: 25px;
}

.navbar_content i {
  cursor: pointer;
  font-size: 20px;
  color: var(--grey-color);
}

.navbar_content button {
  color: black;
  background-color: #92c1c0;
  border-radius: 5px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .logo_item i {
    display: block;
  }

  .search_bar {
    display: none;
  }

  .navbar_content {
    display: none;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .navbar_content.active {
    display: flex;
  }

  .navbar_content button {
    width: 100%;
    margin-top: 10px;
  }

  .bx-menu {
    font-size: 28px;
    cursor: pointer;
  }

  .bx-sun, .bx-moon {
    font-size: 24px;
  }
}
</style>
