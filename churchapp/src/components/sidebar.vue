<template>
<router-view></router-view>

  <!-- sidebar -->
    <nav class="sidebar">
      <div class="menu_content">
        <ul class="menu_items">
          <div class="menu_title menu_dahsboard"></div>

          <!-- duplicate or remove this li tag if you want to add or remove navlink with submenu -->
          <!-- start -->
          
          <!-- end -->

          <!-- duplicate this li tag if you want to add or remove  navlink with submenu -->
          <!-- start -->
          <li class="item">
            <div href="#" class="nav_link submenu_item">
              <span class="navlink_icon">
                <i class="bx bx-grid-alt"></i>
              </span>
              <span class="navlink">Overview</span>
              <i class="bx bx-chevron-right arrow-left"></i>
            </div>
            <ul class="menu_items submenu">
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
            </ul>
          </li>
          <!-- end -->
        

        <!-- duplicate or remove this li tag if you want to add or remove navlink with submenu -->
          <!-- start -->
          <li class="item">
          <router-link to="/attendance" class="nav_link submenu_item">
              <span class="navlink_icon">
                <i class="bx bx-user"></i>
              </span>
              <span class="navlink">Attendance</span>
              <i class="bx bx-chevron-right arrow-left"></i>
            
            </router-link>

            <ul class="menu_items submenu">
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
            </ul>
          </li>
          <!-- end -->
        
        <!-- duplicate or remove this li tag if you want to add or remove navlink with submenu -->
          <!-- start -->
          <li class="item">
            <div href="#" class="nav_link submenu_item">
              <span class="navlink_icon">
                <i class="bx bx-file"></i>
              </span>
              <span class="navlink">Reports</span>
              <i class="bx bx-chevron-right arrow-left"></i>
            </div>
            <ul class="menu_items submenu">
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
              <a href="#" class="nav_link sublink">Nav Sub Link</a>
            </ul>
          </li>
          <!-- end -->

        </ul>
        <ul class="menu_items">
          <div class="menu_title menu_editor"></div>
          <!-- duplicate these li tag if you want to add or remove navlink only -->
          <!-- Start -->
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bxs-magic-wand"></i>
              </span>
              <span class="navlink">Magic build</span>
            </a>
          </li>
          <!-- End -->
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-loader-circle"></i>
              </span>
              <span class="navlink">Filters</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-filter"></i>
              </span>
              <span class="navlink">Filter</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-cloud-upload"></i>
              </span>
              <span class="navlink">Upload new</span>
            </a>
          </li>
        </ul>
        <ul class="menu_items">
          <div class="menu_title menu_setting"></div>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-flag"></i>
              </span>
              <span class="navlink">Notice board</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-medal"></i>
              </span>
              <span class="navlink">Award</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-cog"></i>
              </span>
              <span class="navlink">Setting</span>
            </a>
          </li>
          <li class="item">
            <a href="#" class="nav_link">
              <span class="navlink_icon">
                <i class="bx bx-layer"></i>
              </span>
              <span class="navlink">Features</span>
            </a>
          </li>
        </ul>
        <!-- Sidebar Open / Close -->
        <div class="bottom_content">
          <div class="bottom expand_sidebar">
            <span> Expand</span>
            <i class='bx bx-log-in' ></i>
          </div>
          <div class="bottom collapse_sidebar">
            <span> Collapse</span>
            <i class='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  mounted() {
    const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));
sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});
sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});


submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

  }
};
</script>

<style >
/* Include only sidebar-related styles */

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

.sidebar {
  background-color: var(--white-color);
  width: 260px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 80px 20px;
  z-index: 100;
  overflow-y: scroll;
  box-shadow: 0 0 1px var(--grey-color-light);
  transition: all 0.5s ease;
}

.sidebar.close {
  padding: 60px 0;
  width: 80px;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.menu_content {
  position: relative;
}

.menu_title {
  margin: 15px 0;
  padding: 0 20px;
  font-size: 18px;
}

.sidebar.close .menu_title {
  padding: 6px 30px;
}

.menu_title::before {
  color: var(--grey-color);
  white-space: nowrap;
}

.menu_dahsboard::before {
  content: "Dashboard";
}

.menu_editor::before {
  content: "Editor";
}

.menu_setting::before {
  content: "Setting";
}

.sidebar.close .menu_title::before {
  content: "";
  position: absolute;
  height: 2px;
  width: 18px;
  border-radius: 12px;
  background: var(--grey-color-light);
}

.menu_items {
  padding: 0;
  list-style: none;
}

.navlink_icon {
  position: relative;
  font-size: 22px;
  min-width: 50px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  border-radius: 6px;
}

.navlink_icon::before {
  content: "";
  position: absolute;
  height: 100%;
  width: calc(100% + 100px);
  left: -20px;
}

.navlink_icon:hover {
  background: var(--blue-color);
}

.sidebar .nav_link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--grey-color);
  white-space: nowrap;
}

.sidebar.close .navlink {
  display: none;
}

.nav_link:hover {
  color: var(--white-color);
  background: var(--blue-color);
}

.sidebar.close .nav_link:hover {
  background: var(--white-color);
}

.submenu_item {
  cursor: pointer;
}

.submenu {
  display: none;
}

.submenu_item .arrow-left {
  position: absolute;
  right: 10px;
  display: inline-block;
  margin-right: auto;
}

.sidebar.close .submenu {
  display: none;
}

.show_submenu ~ .submenu {
  display: block;
}

.show_submenu .arrow-left {
  transform: rotate(90deg);
}

.submenu .sublink {
  padding: 15px 15px 15px 52px;
}

.bottom_content {
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 260px;
  cursor: pointer;
  transition: all 0.5s ease;
}

.bottom {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  justify-content: space-around;
  padding: 18px 0;
  text-align: center;
  width: 100%;
  color: var(--grey-color);
  border-top: 1px solid var(--grey-color-light);
  background-color: var(--white-color);
}

.bottom i {
  font-size: 20px;
}

.bottom span {
  font-size: 18px;
}

.sidebar.close .bottom_content {
  width: 50px;
  left: 15px;
}

.sidebar.close .bottom span {
  display: none;
}

.sidebar.hoverable .collapse_sidebar {
  display: none;
}

#sidebarOpen {
  display: none;
}

@media screen and (max-width: 768px) {
  #sidebarOpen {
    font-size: 25px;
    display: block;
    margin-right: 10px;
    cursor: pointer;
    color: var(--grey-color);
  }

  .sidebar.close {
    left: -100%;
  }

  .search_bar {
    display: none;
  }

  .sidebar.close .bottom_content {
    left: -100%;
  }
}
</style>

