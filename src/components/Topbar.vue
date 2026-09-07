<template>
  <header class="flex items-center justify-between gap-4 px-4 py-3">
    <div class="flex items-center">
      <span class="font-semibold text-zinc-800 dark:text-zinc-100">
        Welcome {{ user?.username }} 🤘
      </span>
    </div>

    <div class="flex items-center gap-3">
      <Notifications />

      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        @click="toggleTheme"
      >
        <span v-if="theme === 'dark'">☀️</span>
        <span v-else>🌙</span>
      </button>

      <button
        class="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
        @click="logout"
      >
        Déconnexion
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useTheme } from '../composables/useTheme'
import Notifications from '../components/Notifications.vue'

const { theme, toggleTheme } = useTheme()
const router = useRouter()
const authStore = useAuthStore()
const { user, username } = storeToRefs(authStore)

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>
<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  color: var(--text);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;

  background: none;
  border: none;
  padding: 8px 12px;
  margin: 0;

  cursor: pointer;
  font: inherit;

  color: var(--text);
  border-radius: 8px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.logout-btn:hover {
  background: var(--bg-card);
  color: var(--accent);
}
button {
  background: none;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: none;
}
</style>
