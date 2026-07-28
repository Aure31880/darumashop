import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Clients.vue'
import CalendarView from '../components/CalendarView.vue'
import BookingView from '../components/BookingView.vue'
import AppLogin from '../components/AppLogin.vue'
import DashboardVue from '../views/Dashboard.vue'

const routes = [
  { 
    path: '/login',
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
    path: '/booking',
    name: 'Booking',
    component: BookingView,
    meta: { hideLayout: true }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token")
  if (to.meta.requiresAuth && !token) next('/login') 
  else next()
})

export default router