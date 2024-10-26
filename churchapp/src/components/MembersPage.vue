<template>
  <div class="main-container">
    <!-- Sliding Sidebar -->
    <div class="sidebar" :class="{ 'sidebar--active': isSidebarActive }">
      <ul>
        <li @click="navigateTo('/home')">Home</li>
        <li @click="navigateTo('/attendance')">Attendance</li>
        <li @click="navigateTo('/members')">Members</li>
        
      </ul>
    </div>

    <!-- Content Area -->
    <div class="content">
      <button @click="toggleSidebar" class="toggle-btn">☰ Toggle Sidebar</button>
      <router-view></router-view> <!-- This will load the selected page -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarActive: false,  // Controls whether the sidebar is open or not
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive; // Toggle the sidebar visibility
    },
    navigateTo(page) {
      this.$router.push({ name: page }); // Navigate to the selected route
    },
  },
};
</script>