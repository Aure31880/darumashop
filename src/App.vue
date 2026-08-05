<template>
  <div class="app-root min-h-screen">
    <div class="flex justify-between">
      <h1
        class="text-3xl font-bold p-4"
        style="padding: 20px">
        Daruma Tattoo Shop
      </h1>
      <!-- <span v-if="!$route.meta.hideLayout">Dashboard</span> -->
    </div>

    <RouterView v-if="$route.meta.hideLayout" />

    <AdminLayout v-else>
      <RouterView />
    </AdminLayout>
    <div
      v-if="!$route.meta.hideLayout"
      class="idApp">
      <span>{{ nameApp }}</span>
      <span>{{ version }}</span>
    </div>
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
const version = __APP_VERSION__
const nameApp = __APP_NAME__

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
.idApp {
  margin-bottom: 15px;
  margin-left: 15px;
}

.idApp span {
  font: bold;
  margin: 5px;
}
</style>