<template>
  <header class="topbar">
    <span>
      Welcome {{ user?.username }} 🤘
    </span>

    <button class="logout-btn" @click="logout">
      Déconnexion
    </button>
  </header> 
</template>
<script>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAuthStore } from "../stores/auth"

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { user, username } = storeToRefs(authStore)

    const logout = () => {
      authStore.logout()
      router.push("/login")
    }

    return {
      user,
      username,
      logout,
    }
  },
}
</script>
<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
}

.logout-btn {
  display: flex;
  align-items: center;

  background: none;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
  font: inherit;
  color: inherit;
}

.logout-btn:hover {
  color: #000;
}
</style>
