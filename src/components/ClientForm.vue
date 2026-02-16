<template>
  <form @submit.prevent="submitClient" class="p-4 space-y-4">
    <input v-model="name" placeholder="Nom" class="border p-2 w-full"/>
    <input v-model="phone" placeholder="Téléphone" class="border p-2 w-full"/>
    <input v-model="email" placeholder="Email" class="border p-2 w-full"/>
    <input v-model="preferred_style" placeholder="Style préféré" class="border p-2 w-full"/>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2">Créer Client</button>
  </form>
</template>

<script>

import api from '../service/api'

export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      preferred_style: ""
    };
  },
  methods: {
    async submitClient() {
      try {
        const res = await api.post("/clients/", {
          name: this.name,
          phone: this.phone,
          email: this.email,
          preferred_style: this.preferred_style
        });
        alert("Client créé : " + res.data.id);
        this.name = this.phone = this.email = this.preferred_style = "";
      } catch (err) {
        console.error(err);
        alert("Erreur création client");
      }
    }
  }
};
</script>
