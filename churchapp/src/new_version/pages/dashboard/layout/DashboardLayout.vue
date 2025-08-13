<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isCollapsed, mobileOpen: mobileOpen }]">
      <div class="sidebar-header">
        <div class="logo-circle">
          <img src="https://via.placeholder.com/40" alt="Logo" />
        </div>
        <span v-if="!isCollapsed" class="brand">Grace Community</span>
        <button class="close-mobile" @click="mobileOpen = false">✕</button>
      </div>

      <nav class="nav-links">
        <RouterLink v-for="link in mainLinks" :key="link.to" :to="link.to" class="nav-item" active-class="active">
          <component :is="link.icon" class="icon" />
          <span v-if="!isCollapsed">{{ link.label }}</span>
        </RouterLink>

        <!-- Finance Section with Sublinks -->
        <div class="nav-group">
          <button class="nav-item" @click="toggleFinance">
            <FinanceIcon class="icon" />
            <span v-if="!isCollapsed">Finances</span>
            <span v-if="!isCollapsed" class="arrow">{{ showFinance ? '▾' : '▸' }}</span>
          </button>
          <transition name="fade">
            <div v-if="showFinance && !isCollapsed" class="sub-links">
              <RouterLink v-for="sub in financeLinks" :key="sub.to" :to="sub.to" active-class="active">
                {{ sub.label }}
              </RouterLink>
            </div>
          </transition>
        </div>
      </nav>

      <div class="sidebar-footer" @click="toggleSidebar">
        <ChevronLeft v-if="!isCollapsed" />
        <ChevronRight v-else />
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-area">
      <header class="topbar">
        <button class="mobile-menu-btn" @click="mobileOpen = true">☰</button>
        <h1>{{ pageTitle }}</h1>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { Home, FileText, DollarSign as FinanceIcon, Settings, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const pageTitle = computed(() => route.meta.title || 'Dashboard')

const isCollapsed = ref(false)
const mobileOpen = ref(false)
const showFinance = ref(false)

const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value)
const toggleFinance = () => (showFinance.value = !showFinance.value)

const mainLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings }
]

const financeLinks = [
  { to: '/finances/income', label: 'Income' },
  { to: '/finances/expenses', label: 'Expenses' }
]
</script>

<style scoped>
/* Layout container */
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar styles */
.sidebar {
  background: #2e2f7de6; /* toned purple with opacity */
  color: white;
  width: 250px;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, transform 0.3s ease;
  border-radius: 0 20px 20px 0;
  position: relative;
  z-index: 2000;
}
.sidebar.collapsed {
  width: 80px;
}
.sidebar.mobileOpen {
  transform: translateX(0);
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
    border-radius: 0;
  }
}

/* Sidebar header */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
}
.logo-circle {
  background: #d4cd1d;
  border-radius: 50%;
  padding: 0.25rem;
}
.brand {
  font-weight: bold;
}
.close-mobile {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  display: none;
}
@media (max-width: 768px) {
  .close-mobile {
    display: block;
  }
}

/* Navigation */
.nav-links {
  flex: 1;
  padding-top: 1rem;
}
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #ddd;
  gap: 0.75rem;
  transition: background 0.3s;
}
.nav-item:hover {
  background: rgba(255, 251, 0, 0.2);
  color: white;
}
.nav-item.active {
  background: rgba(255, 251, 0, 0.35);
  color: white;
}
.icon {
  flex-shrink: 0;
}
.arrow {
  margin-left: auto;
}

/* Sub-links */
.sub-links {
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
}
.sub-links a {
  padding: 0.5rem 0;
  text-decoration: none;
  color: #ccc;
}
.sub-links a:hover {
  color: white;
}

/* Sidebar footer (collapse button) */
.sidebar-footer {
  padding: 1rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
}

/* Topbar */
.topbar {
  background: white;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.4rem;
}
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
}

/* Content */
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content {
  padding: 1rem;
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
