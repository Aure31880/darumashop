<template>
  <div class="booking-page">
    <div class="booking-card">
      <h2>🖋 Prise de rendez-vous</h2>

      <form @submit.prevent="submitBooking">

        <div class="form-group">
          <label for="name">Nom, Prénom</label>
          <input id="name" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Télephone (optionnel)</label>
          <input id="phone" v-model="form.phone" />
        </div>

        <div class="form-group">
          <label for="description">Description du projet</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            placeholder="Description du projet tattto, idées, taille, emplacement"
            required
          />
        </div>

        <div class="form-group">
          <label>Date rendez-vous (optionnel)</label>
          <input v-model="form.date" type="datetime-local" />
        </div>

        <button type="submit" style="background: green">
          Valider rendez-vous
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      success: false,
      form: {
        name: '',
        email: '',
        phone: '',
        description: '',
        date: ''
      }
    }
  },

  methods: {
    async submitBooking() {
      try {
        const response = await fetch(import.meta.env.VITE_FORMSPREE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
            message: this.form.description
          })
        })

        if (response.ok) {
          toast("Votre message à bien été envoyé !", {
            "theme": "auto",
            "type": "success",
            "position": "bottom-left",
            "dangerouslyHTMLString": true
          })
          this.resetForm()
        }
      } catch (err) {
        console.error(err)
      }
    },
    resetForm() {
      const keys = Object.keys(this.form)
      keys.forEach(key => {
        this.form[key] = ''
      })
    }
  }
}
</script>
