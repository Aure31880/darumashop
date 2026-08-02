import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Clients.vue'
import CalendarView from '../components/CalendarView.vue'
import BookingView from '../components/BookingView.vue'
import AppLogin from '../components/AppLogin.vue'
import DashboardVue from '../views/Dashboard.vue'
import { useAuthStore } from "../stores/auth"

const routes = [
  { 
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: { hideLayout: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardVue,
    meta: { requiresAuth: true }
  },
  { path:
    '/calendar',
    component: CalendarView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/clients',
    component: Client,
    meta: { requiresAuth: true }
  },
  {
    path: '/client/:id',
    name: 'Client',
    component: Client,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Booking',
    component: BookingView,
    meta: { hideLayout: true }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await authStore.initializeAuth()
  }
  
  const token = localStorage.getItem("access_token")

  if (to.meta.requiresAuth && !authStore.user) {
    return {
      name: "Booking",
      query: {
        redirect: from.fullPath,
      },
    }
  }

  if (to.name === "login" && authStore.user) {
    return { name: "dashboard" }
  }
  return true
})


export default router