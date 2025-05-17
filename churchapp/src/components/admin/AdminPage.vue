
<template>
  <div>
    <Navbar />
    <Sidebar />
    <router-view />
    <overView />
  </div>
</template>

<script>
import Navbar from "@/components/GlobalNavbar.vue";
import Sidebar from "@/components/admin/AdminSidebar.vue";
import overView from "@/components/admin/AdminOverviewPage.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    overView,
  },

   mounted() {
    // Clear local storage when the tab or window is closed
    //window.addEventListener("beforeunload", () => {
    //  localStorage.clear();
    //});
  }
};
</script>

<style scoped>
/* Main layout or global styles if needed */

</style>
