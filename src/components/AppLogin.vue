<template>
  <main
    class="flex min-h-screen items-center justify-center bg-slate-100 px-4"
  >
    <section
      class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
    >
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white"
        >
          AL
        </div>

        <h1 class="text-2xl font-bold text-slate-900">
          Espace administrateur
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          Connectez-vous pour gérer les rendez-vous et les clients.
        </p>
      </div>

      <form
        class="space-y-5"
        @submit.prevent="login"
      >
        <div>
          <label
            for="username"
            class="mb-2 block text-sm font-medium text-slate-700"
          >
            Identifiant
          </label>

          <input
            id="username"
            v-model.trim="username"
            type="text"
            name="username"
            autocomplete="username"
            required
            placeholder="Votre identifiant"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
          >
        </div>

        <div>
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-slate-700"
          >
            Mot de passe
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
            placeholder="Votre mot de passe"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
          >
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span v-if="isLoading">
            Connexion...
          </span>

          <span v-else>
            Se connecter
          </span>
        </button>
      </form>
    </section>
  </main>
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
        router.push("/dashboard")
      } catch (err) {
        alert("Login failed")
      }
    }

    return { username, password, login }
  }
}
</script>
