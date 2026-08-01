<template>
  <div class="app-root min-h-screen">
    <div class="flex justify-between">
      <h1
        v-if="!$route.meta.hideLayout"
        class="text-3xl font-bold p-4"
        style="padding: 20px"
      >
        Daruma Tattoo Shop
        <span>Dashboard</span>
      </h1>
    </div>

    <RouterView v-if="$route.meta.hideLayout" />

    <AdminLayout v-else>
      <RouterView />
    </AdminLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import AdminLayout from './layouts/AdminLayout.vue'
import { useAuthStore } from './stores/auth'
import { useTheme } from './composables/useTheme'

const { theme, toggleTheme } = useTheme()

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchCurrentUser()
})
</script>
<style scoped>
button {
  background: none;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: none;
}
</style>