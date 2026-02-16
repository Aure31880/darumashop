<template>
  <form @submit.prevent="submitAppointment" class="p-4 space-y-4">
    <input v-model.number="client_id" placeholder="ID Client" type="number" class="border p-2 w-full"/>
    <input v-model="date" type="datetime-local" class="border p-2 w-full"/>
    <input v-model="description" placeholder="Description" class="border p-2 w-full"/>
    <button type="submit" class="bg-green-500 text-white px-4 py-2">Créer RDV</button>
  </form>
</template>

<script>
import api from '../service/api'

export default {
  data() {
    return {
      client_id: null,
      date: "",
      description: ""
    };
  },
  methods: {
    async submitAppointment() {
      try {
        const res = await api.post("/appointments/", {
          client_id: this.client_id,
          date: this.date,
          description: this.description
        });
        alert("RDV créé : " + res.data.id);
        this.client_id = null;
        this.date = this.description = "";
      } catch (err) {
        console.error(err);
        alert("Erreur création RDV");
      }
    }
  }
};
</script>
