<template>
  <div class="clients-layout">
    <div class="clients-list">
      <h2>Clients</h2>
      <div
        v-for="rdv in rdvs"
        :key="rdv.id"
        class="client-item"
        :class="{ active: selected && selected.id === rdv.id }"
        @click="selectClient(rdv)">
        <div class="client-name">
          {{ rdv.client.name }}
        </div>
        <div class="client-email">
          {{ rdv.client.email }}
        </div>
      </div>
    </div>
    <div class="client-detail" v-if="selected">
      <h2>Details client</h2>
      <div class="detail-card">
        <p><strong>Date de rendez-vous:</strong> {{ new Date(selected.date).toLocaleString("en-FR", { timeZone: "UTC" }) }}</p>
        <p><strong>Name:</strong> {{ selected.client.name }}</p>
        <p><strong>Email:</strong> {{ selected.client.email }}</p>
        <p><strong>Phone:</strong> {{ selected.client.phone || '—' }}</p>
        <p><strong>Description:</strong> {{ selected.description }}</p>
      </div>
    </div>
    <div v-else class="client-detail empty">
      Select a client to view details
    </div>
  </div>
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue'
import api from '../service/api'

export default {
  components: { AdminLayout },

  data() {
    return {
      clients: [],
      rdvs: [],
      selected: null
    }
  },

  async mounted() {
    try {
      const res = await api.get('/appointments/')
      this.rdvs = res.data
    } catch (err) {
      console.error('Erreur chargement clients', err)
    }
  },

  methods: {
    selectClient(client) {
      this.selected = client
    }
  }
}
</script>
