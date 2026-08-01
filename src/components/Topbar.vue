<template>
  <header class="topbar">
    <span>
      Welcome {{ user?.username }} 🤘
    </span>
     <button
      class="rounded-lg p-2 transition hover:bg-zinc-800 dark:hover:bg-zinc-700"
      @click="toggleTheme">
      <span v-if="theme === 'dark'">☀️</span>
      <span v-else>🌙</span>
    </button>
    <button class="logout-btn" @click="logout">
      Déconnexion
    </button>
  </header> 
</template>
<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAuthStore } from "../stores/auth"
import { useTheme } from '../composables/useTheme'

  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const authStore = useAuthStore()
  const { user, username } = storeToRefs(authStore)

  function logout () {
    authStore.logout()
    router.push("/login")
  }
  
</script>
// <script>
// import { useRouter } from "vue-router"
// import { storeToRefs } from "pinia"
// import { useAuthStore } from "../stores/auth"
// import { useTheme } from '../composables/useTheme'


// export default {
//   setup() {
//     const router = useRouter()
//     const authStore = useAuthStore()
//     const { user, username } = storeToRefs(authStore)
//     const { theme } = useTheme()

//     const logout = () => {
//       authStore.logout()
//       router.push("/login")
//     }

//     return {
//       user,
//       username,
//       logout,
//     }
//   },
// }
// </script>
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
