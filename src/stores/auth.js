import { computed, ref } from "vue"
import { defineStore } from "pinia"

import api from '../service/api'

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null)
  const isLoading = ref(false)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => {
    return Boolean(user.value)
  })

  async function login(username, password) {
    const response = await api.post("/login", {
      username,
      password,
    })

    localStorage.setItem(
      "access_token",
      response.data.access_token,
    )

    await fetchCurrentUser()
  }

  async function fetchCurrentUser() {
    const token = localStorage.getItem("access_token")

    if (!token) {
      user.value = null
      isInitialized.value = true
      return
    }

    isLoading.value = true

    try {
      const response = await api.get("/users/me")
      user.value = response.data
    } catch (error) {
      localStorage.removeItem("access_token")
      user.value = null
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    user.value = null
  }

  return {
    user,
    isLoading,
    isInitialized,
    isAuthenticated,
    login,
    fetchCurrentUser,
    logout,
  }
})