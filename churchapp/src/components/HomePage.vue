
<template>
  <div>
    <Navbar />
    <Sidebar />
    <router-view />
    <ImageSlider />
  </div>
</template>

<script>
import Navbar from "@/components/GlobalNavbar.vue";
import Sidebar from "@/components/GlobalSidebar.vue";
import ImageSlider from "@/components/ImageSlider.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    ImageSlider,
  }
};
</script>

<style scoped>
/* Main layout or global styles if needed */

</style>
