<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import api from '../service/api'

export default {
  setup() {
    const router = useRouter()
    const username = ref("")
    const password = ref("")

    const login = async () => {
      try {
        const res = await api.post("/login", {
          username: username.value,
          password: password.value
        })
        localStorage.setItem("access_token", res.data.access_token)
        router.push("/dashboard") // redirige vers la page admin
      } catch (err) {
        alert("Login failed")
      }
    }

    return { username, password, login }
  }
}
</script>
