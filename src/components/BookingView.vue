<template>
  <div class="booking-page">
    <div class="booking-card">
      <h2>🖋 Tattoo Booking</h2>

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
          <label for="phone">Télephone</label>
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
          <label>Date rendez-vous</label>
          <input v-model="form.date" type="datetime-local" required />
        </div>

        <button type="submit">
          Valider rendez-vous
        </button>

        <p v-if="success" class="success">
          ✅ Your request has been sent successfully!
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import api from '../service/api'

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

        // 1 Create client
        const clientRes = await api.post('http://127.0.0.1:8000/clients/', {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone
        })

        // 2 Create appointment
        await api.post('http://127.0.0.1:8000/appointments/', {
          client_id: clientRes.data.id,
          date: this.form.date,
          description: this.form.description
        })

        this.success = true
        this.form = {
          name: '',
          email: '',
          phone: '',
          description: '',
          date: ''
        }

      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
