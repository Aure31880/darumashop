<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <h1 class="text-3xl font-bold p-4" style="padding: 20px">Daruma Tattoo Shop
      <span v-if="!$route.meta.hideLayout">Dashboard</span>
    </h1>
    <DashboardVue v-if="!$route.meta.hideLayout"/>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import AppLogin from './components/AppLogin.vue'
import CalendarView from './components/CalendarView.vue'
import DashboardVue from './views/Dashboard.vue'
import { useAuthStore } from "./stores/auth"
const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchCurrentUser()
})

// export default { components: { CalendarView, DashboardVue, AppLogin } }
</script>
