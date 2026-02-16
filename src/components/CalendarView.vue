<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import api from '../service/api'

export default {
  components: { FullCalendar },

  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridWeek',
        events: [],
        eventClick: this.handleEventClick
      }
    }
  },
  methods: {
    handleEventClick(info) {
      const clientId = info.event.extendedProps.clientId
      this.$router.push({ name: 'Client', params: { id: clientId } })
    }
  },
  async mounted() {
    try {
      const res = await api.get('/appointments/')
      this.calendarOptions.events = res.data.map(a => ({
        title: `Rdv #${a.client.name}`,
        start: a.date,
        clientId: a.id
      }))
    } catch (err) {
      console.error('Erreur chargement RDV', err)
    }
  }
}
</script>
