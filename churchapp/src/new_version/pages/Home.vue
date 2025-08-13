<template>
  <div class="welcome-container">
    <!-- Dark overlay -->
    <div class="overlay"></div>

    <!-- Content -->
    <div class="content">
      <h1>
        Welcome to
        <span class="highlight">Grace Community</span>
      </h1>
      <p>
        A place where faith meets community, where hearts find home,
        and where every soul is welcomed with open arms.
      </p>
      <router-link to="/login" class="cta-button">
        Join Our Community
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No logic — purely static welcome page
</script>

<style scoped>
/* Background image with overlay */
.welcome-container {
  position: relative;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(46, 47, 125, 0.8); /* toned-down church blue */
}

/* Centered content */
.content {
  position: relative;
  color: white;
  text-align: center;
  max-width: 600px;
  padding: 10px;
  animation: fadeInUp 0.8s ease-in-out;
}

.content h1 {
  font-size: 2rem;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(90deg, #2e2f7d, #7b5de6);
  -webkit-background-clip: text;
  color: transparent;
}

.content p {
  margin-top: 15px;
  font-size: 1rem;
  color: #ddd;
}

/* CTA button */
.cta-button {
  display: inline-block;
  margin-top: 25px;
  padding: 12px 25px;
  background: linear-gradient(90deg, #2e2f7d, #7b5de6);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: linear-gradient(90deg, #4636a5, #9578f0);
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive styles */
@media (min-width: 480px) {
  .content h1 {
    font-size: 2.5rem;
  }
  .content p {
    font-size: 1.1rem;
  }
}

@media (min-width: 768px) {
  .content h1 {
    font-size: 3rem;
  }
  .content p {
    font-size: 1.2rem;
  }
}
</style>
