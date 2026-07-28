<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <h1
      v-if="!$route.meta.hideLayout"
      class="text-3xl font-bold p-4"
      style="padding: 20px"
    >
      Daruma Tattoo Shop
      <span>Dashboard</span>
    </h1>

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

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchCurrentUser()
})
</script>