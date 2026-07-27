import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Clients.vue'
import CalendarView from '../components/CalendarView.vue'
import BookingView from '../components/BookingView.vue'
import AppLogin from '../components/AppLogin.vue'

const routes = [
  { path: '/login', component: AppLogin, meta: { hideLayout: true } },
  { path: '/calendar', component: CalendarView, meta: { requiresAuth: true } },
  { path: '/clients', component: Client, meta: { requiresAuth: true } },
  // { path: '/book', component: BookingView },
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
    meta: { hideLayout: true } // on va utiliser cette info pour cacher sidebar/topbar
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