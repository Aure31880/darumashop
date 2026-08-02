<template>
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
        <div class="stat-value">{{ incomingRdvs }}</div>
      </div>
    </div>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import CalendarView from '../components/CalendarView.vue'

import api from '../service/api'

const totalClient = ref(null)
const totalRdvs =  ref(null)
const incomingRdvs =  ref(null)

onMounted(async () => {
  try {
    const clients = await api.get('/clients/')
    totalClient.value = clients.data.length
    const rdvs = await api.get('/appointments/')
    totalRdvs.value = rdvs.data.length
    const start = Date.now()
    const rdvsFiltered = rdvs.data.filter(a => new Date(a.date) >= start)
    incomingRdvs.value = rdvsFiltered.length
  } catch (err) {
    console.error('Erreur chargement des data', err)
  }
})
</script>
