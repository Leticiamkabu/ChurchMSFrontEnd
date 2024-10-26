<template>
  <div class="slider-container">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="slide"
      :style="{ opacity: currentSlide === index ? 1 : 0 }"
    >
      <img :src="image" :alt="`Image ${index + 1}`" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require("@/assets/hp1.png"),
        require("@/assets/hp2.png"),
        require("@/assets/hp3.webp"),
      ],
      currentSlide: 0,
    };
  },
  mounted() {
    this.startSlider();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      }, 3000); // Change image every 3 seconds
    },
  },
};
</script>

<style scoped>
.slider-container {
      width: 70%;
    overflow: hidden;
    position: relative;
    height: 450px;
    top: 130px;
    left: 300px;
    border-radius: 20px;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease; /* Fade effect */
  opacity: 0; /* Start invisible */
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
