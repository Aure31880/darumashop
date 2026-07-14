<template>
  <header class="topbar">
    Welcome, AL 🤘
    <a @click="logout()">Déconnexion</a>
  </header>
</template>
<script>
import { useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const logout = async () => {
      localStorage.removeItem('access_token')
      router.push("/login")
    }
    return {logout}
  }
}
</script>
