<template>
  <div class="login-container">
    <div class="overlay"></div>
    <div class="login-card">
      <div class="avatar">
        <span>G</span>
      </div>
      <h2 class="title">Welcome Back</h2>
      <p class="subtitle">Sign in to Grace Community</p>

      <!-- Alert messages -->
      <div v-if="message" :class="['alert', messageType]">
        {{ message }}
      </div>

      <form @submit.prevent="login">
        <!-- Email -->
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" v-model="email" placeholder="Enter your email" required />
          <small v-if="errors.email" class="error">{{ errors.email }}</small>
        </div>

        <!-- Password -->
        <div class="form-group password-group">
          <label>Password</label>
          <div class="password-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              required
            />
            <span class="toggle-password" @click="showPassword = !showPassword">
              👁
            </span>
          </div>
          <small v-if="errors.password" class="error">{{ errors.password }}</small>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="form-options">
          <label>
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <!-- Submit -->
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <p class="footer-text">
        Don't have an account? <a href="#">Join our community</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChurchLogin",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      showPassword: false,
      errors: {},
      loading: false,
      message: "",
      messageType: ""
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      let valid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email) {
        this.errors.email = "Email is required.";
        valid = false;
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = "Invalid email format.";
        valid = false;
      }

      if (!this.password) {
        this.errors.password = "Password is required.";
        valid = false;
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
        valid = false;
      }

      return valid;
    },
    login() {
      if (!this.validateForm()) return;

      this.loading = true;
      this.message = "";
      setTimeout(() => {
        this.loading = false;
        if (this.email === "user@example.com" && this.password === "password") {
          this.message = "Login successful!";
          this.messageType = "success";
        } else {
          this.message = "Invalid email or password.";
          this.messageType = "error";
        }
      }, 1500);
    }
  }
};
</script>

<style scoped>
/* Background with gradient overlay */
.login-container {
  position: relative;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(46, 47, 125, 0.9), rgba(46, 47, 125, 0.3));
}

/* Login Card */
.login-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 2;
  text-align: center;
}

/* Avatar */
.avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3a3b85, #e6d800);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
}

/* Titles */
.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2e2f7d;
}
.subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Form */
.form-group {
  text-align: left;
  margin-bottom: 1rem;
}
.form-group label {
  font-size: 0.85rem;
  color: #2e2f7d;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.65rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  margin-top: 0.35rem;
}
.password-wrapper {
  position: relative;
}
.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 0.9rem;
}
.error {
  color: red;
  font-size: 0.75rem;
}

/* Remember + Forgot */
.form-options {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 1.2rem;
}
.form-options a {
  color: #3a3b85;
  text-decoration: none;
}
.form-options a:hover {
  text-decoration: underline;
}

/* Button */
.login-btn {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: linear-gradient(to right, #3a3b85, #e6d800);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Alerts */
.alert {
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}
.alert.success {
  background: #d4edda;
  color: #155724;
}
.alert.error {
  background: #f8d7da;
  color: #721c24;
}

.footer-text {
  margin-top: 1.2rem;
  font-size: 0.85rem;
}
.footer-text a {
  color: #3a3b85;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
