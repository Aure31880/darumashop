<template>
  <AdminLayout>
    <div class="stats">
      <div class="card">
        <div>Total Clients</div>
        <div class="stat-value">{{ totalClient }}</div>
      </div>
      <div class="card">
        <div>Total rendez-vous</div>
        <div class="stat-value">{{ totalRdvs }}</div>
      </div>
      <div class="card">
        <div>Rendez-vous à venir</div>
        <div class="stat-value">{{ IncomingRdvs }}</div>
      </div>
    </div>
  <RouterView />
  </AdminLayout>
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue'
import CalendarView from '../components/CalendarView.vue'
import api from '../service/api'

export default {
  components: { AdminLayout, CalendarView },
  data() {
    return {
      totalClient: null,
      totalRdvs: null,
      IncomingRdvs: null,
    }
  },
  methods: {
  },
  async mounted() {
    try {
      const clients = await api.get('/clients/')
      this.totalClient = clients.data.length
      const rdvs = await api.get('/appointments/')
      this.totalRdvs = rdvs.data.length
      const start = Date.now()
      const rdvsFiltered = rdvs.data.filter(a => new Date(a.date) >= start)
      this.IncomingRdvs = rdvsFiltered.length
    } catch (err) {
      console.error('Erreur chargement des data', err)
    }
  }
}
</script>
