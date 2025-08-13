<template>
  <aside :class="['sidebar', { collapsed }]">
    <!-- Logo / Top Section -->
    <div class="sidebar-header">
      <img src="https://via.placeholder.com/40" alt="Logo" class="logo" />
      <span v-if="!collapsed" class="brand">Grace Community</span>
    </div>

    <!-- Nav Links -->
    <nav class="nav">
      <RouterLink v-for="link in mainLinks" :key="link.to" :to="link.to" class="nav-item" active-class="active">
        <component :is="link.icon" class="icon" />
        <span v-if="!collapsed">{{ link.label }}</span>
      </RouterLink>

      <!-- Sublinks -->
      <div class="nav-group">
        <button class="nav-item" @click="toggleSubLinks">
          <component :is="FinanceIcon" class="icon" />
          <span v-if="!collapsed">Finances</span>
        </button>
        <transition name="fade">
          <div v-if="showSubLinks && !collapsed" class="sub-links">
            <RouterLink v-for="sub in financeLinks" :key="sub.to" :to="sub.to" active-class="active">
              {{ sub.label }}
            </RouterLink>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Toggle Button -->
    <div class="toggle-btn" @click="$emit('toggle')">
      <ChevronLeft v-if="!collapsed" />
      <ChevronRight v-else />
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Home, FileText, DollarSign as FinanceIcon, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const collapsed = defineProps({ collapsed: Boolean })

const mainLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/reports', label: 'Reports', icon: FileText }
]

const financeLinks = [
  { to: '/finances/income', label: 'Income' },
  { to: '/finances/expenses', label: 'Expenses' }
]

const showSubLinks = ref(false)
const toggleSubLinks = () => (showSubLinks.value = !showSubLinks.value)
</script>

<style scoped>
.sidebar {
  background: #2e2f7d;
  color: white;
  width: 240px;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.logo {
  border-radius: 50%;
  margin-right: 0.5rem;
}

.brand {
  font-size: 1.1rem;
  font-weight: bold;
}

.nav {
  flex: 1;
  margin-top: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background 0.3s;
}

.nav-item:hover {
  background: rgba(255, 251, 0, 0.2);
}

.icon {
  margin-right: 0.75rem;
}

.sub-links {
  background: rgba(255, 255, 255, 0.1);
  padding-left: 1.5rem;
}

.active {
  background: rgba(255, 251, 0, 0.3);
}

.toggle-btn {
  padding: 1rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
}
</style>
