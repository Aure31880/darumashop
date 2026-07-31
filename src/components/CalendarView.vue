<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/vue3/daygrid'
import themePlugin from '@fullcalendar/vue3/themes/monarch'
 import interactionPlugin from "@fullcalendar/vue3/interaction";

import '@fullcalendar/vue3/skeleton.css'
import '@fullcalendar/vue3/themes/monarch/theme.css'
import '@fullcalendar/vue3/themes/monarch/palettes/blue.css'

import api from '../service/api'

export default {
  components: { FullCalendar },

  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          themePlugin,
          interactionPlugin
        ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay' ,
        },
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
        title: `Rdv #${a.client.name}` || 'Rendez-vous',
        // start: a.date,
        clientId: a.id,
        extendedProps: {
          a,
        },
      }))
    } catch (err) {
      console.error('Erreur chargement RDV', err)
    }
  }
}
</script>
