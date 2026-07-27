import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPinia, setActivePinia } from "pinia"

import api from "../service/api"
import { useAuthStore } from "./auth"

vi.mock("../service/api", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}))

describe("auth store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it("connecte l'utilisateur et charge son profil", async () => {
    api.post.mockResolvedValue({
      data: {
        access_token: "fake-token",
      },
    })

    api.get.mockResolvedValue({
      data: {
        id: 1,
        username: "AL'ink",
      },
    })

    const authStore = useAuthStore()

    await authStore.login("AL'ink", "secret123")

    expect(api.post).toHaveBeenCalledWith("/login", {
      username: "AL'ink",
      password: "secret123",
    })

    expect(localStorage.getItem("access_token"))
      .toBe("fake-token")

    expect(api.get).toHaveBeenCalledWith("/users/me")

    expect(authStore.user).toEqual({
      id: 1,
      username: "AL'ink",
    })

    expect(authStore.isAuthenticated).toBe(true)
  })
  it("récupère l'utilisateur courant lorsqu'un token existe", async () => {
    localStorage.setItem("access_token", "fake-token")

    api.get.mockResolvedValue({
      data: {
        id: 1,
        username: "AL'ink",
      },
    })

    const authStore = useAuthStore()

    await authStore.fetchCurrentUser()

    expect(authStore.user).toEqual({
      id: 1,
      username: "AL'ink",
    })

    expect(authStore.isInitialized).toBe(true)
    expect(authStore.isLoading).toBe(false)
  })
  it("ne fait aucun appel si aucun token n'existe pas", async () => {
    const authStore = useAuthStore()

    await authStore.fetchCurrentUser()

    expect(api.get).not.toHaveBeenCalled()
    expect(authStore.user).toBeNull()
    expect(authStore.isInitialized).toBe(true)
  })
  it("supprime le token lorsque /users/me échoue", async () => {
    localStorage.setItem("access_token", "expired-token")

    api.get.mockRejectedValue({
      response: {
        status: 401,
      },
    })

    const authStore = useAuthStore()

    await authStore.fetchCurrentUser()

    expect(localStorage.getItem("access_token")).toBeNull()
    expect(authStore.user).toBeNull()
    expect(authStore.isInitialized).toBe(true)
  })
  it("déconnecte l'utilisateur", () => {
    localStorage.setItem("access_token", "fake-token")

    const authStore = useAuthStore()

    authStore.user = {
      id: 1,
      username: "AL'ink",
    }

    authStore.logout()

    expect(localStorage.getItem("access_token")).toBeNull()
    expect(authStore.user).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
  })
})