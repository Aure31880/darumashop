<template>
  <div class="booking-page">
    <div class="booking-card">
      <h2>🖋 Prise de rendez-vous</h2>

      <form
        @submit.prevent="submitBooking"
        class="
          w-full
          max-w-xl
          mx-auto
          px-4 py-6
          sm:px-6
          md:p-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="name" class="block mb-2">Prénom, Nom</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border px-3 py-3"
            />
          </div>

          <div>
            <label for="email" class="block mb-2">Email</label>
            <input
              id="email"
              class="w-full rounded-lg border px-3 py-3"
              v-model="form.email"
              type="email"
              required
            />
          </div>

          <div>
            <label for="phone" class="block mb-2">Téléphone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border px-3 py-3"/>
          </div>
        </div>

        <div class="form-group">
          <label class="block mb-2" for="description">Description du projet</label>
          <textarea
            id="description"
            class="w-full rounded-lg border"
            v-model="form.description"
            rows="8"
            placeholder="Description du projet tattto, idées, taille, emplacement"
            required/>
        </div>

        <div class="form-group">
          <label for="description">Images de référence</label>
          <input
            type="file"
            class="w-full rounded-lg border px-3 py-3"
            multiple
            accept="image/*"
            @change="handleFilesUpload"/>
        </div>
        <div class="preview-container">
          <div
            v-for="(image, index) in previews"
            :key="index"
            class="preview-card">
            <img :src="image" alt="preview" />
            <button
            type="button"
              @click.prevent="removeImage(index)"
              class="btn delete-btn">
              ×
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="btn mt-6 w-full rounded-lg px-4 py-3 md:w-auto">
          Envoyer
        </button>
      </form>

      <!-- <form @submit.prevent="submitBooking">

        <div class="form-group">
          <label for="name">Prénom, Nom</label>
          <input id="name" class="rounded block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" class="rounded block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" v-model="form.email" type="email" required />
        </div>

        <div class="form-group">
          <label for="phone">Télephone (Optionnel)</label>
          <input id="phone" class="rounded block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" v-model="form.phone" />
        </div>

        <div class="form-group">
          <label for="description">Description du projet</label>
          <textarea
            id="description"
            class="rounded"
            v-model="form.description"
            rows="4"
            placeholder="Description du projet tattto, idées, taille, emplacement"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Images de référence</label>
          <input
            type="file"
            class="rounded form-input block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            multiple
            accept="image/*"
            @change="handleFilesUpload"/>
        </div>
        <div class="preview-container">
          <div
            v-for="(image, index) in previews"
            :key="index"
            class="preview-card">
            <img :src="image" alt="preview" />
            <button
            type="button"
              @click.prevent="removeImage(index)"
              class="btn delete-btn">
              ×
            </button>
          </div>
        </div>
        <button type="submit" class="btn" style="background: green">
          Valider votre message
        </button>
      </form> -->
    </div>
  </div>
</template>

<script>
import api from '../service/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      success: false,
      files: [],
      form: {
        name: null,
        email: null,
        phone: null,
        description: null,
        // date: '',
        references: []
      },
      previews: []
    }
  },

  methods: {
    handleFilesUpload(event) {
      const uploadedFiles = Array.from(event.target.files)
      this.files.push(...uploadedFiles)

      const newPreviews = uploadedFiles.map(file =>
        URL.createObjectURL(file)
      )
      this.previews.push(...newPreviews)
      event.target.value = ''
    },
    removeImage(index) {
      this.files.splice(index, 1);

      URL.revokeObjectURL(this.previews[index]);

      this.previews.splice(index, 1);
    },
    async submitBooking() {
      try {
        const formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('phone', this.form.phone)
        formData.append('description', this.form.description)
        // formData.append('date', this.form.date)

        // const response = await fetch(import.meta.env.VITE_FORMSPREE, {
        //   method: "POST",
        //   body: formData,
        //    headers: {
        //     Accept: 'application/json'
        //   }
        // })
        await this.createClient()
        toast("Votre message à bien été envoyé !", {
          "theme": "auto",
          "type": "success",
          "position": "bottom-left",
          "dangerouslyHTMLString": true
        })
        this.resetForm()
        // if (response.ok) {
        //   await this.createClient()
        //   toast("Votre message à bien été envoyé !", {
        //     "theme": "auto",
        //     "type": "success",
        //     "position": "bottom-left",
        //     "dangerouslyHTMLString": true
        //   })
        //   this.resetForm()
        // } else {
        //   const errorText = await response.text()

        //   alert(
        //     `Erreur lors de l'envoi : ${response.status}\n${errorText}`
        //   )
        // }
      } catch (err) {
        console.error(err)
      }
    },
    async createClient () {
      try {
        const response = await api.post('/clients/', {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
        })
        
        await this.createAppointment(response)
      } catch (err) {
        console.error(
        "Erreur création client",
        err.response?.data || err,
      )
        console.error('Erreur chargement clients', err)
      }
    },
    async createAppointment (clientRes) {
      try {
        const formData = new FormData()
        
        formData.append('client_id', clientRes.data.id)
        formData.append('date', this.form.date)
        formData.append('description', this.form.description)

        for (const file of this.files) {
          formData.append('attachments', file)
        }
        await api.post('/appointments/', formData)

        this.success = true
        this.form = {
          name: '',
          email: '',
          phone: '',
          description: '',
          // date: '',
          attachments: [] 
        }
        this.files = []
        this.previews = []
      } catch (err) {
        console.error('Erreur chargement clients', err)
      }
    },
    resetForm() {
      const keys = Object.keys(this.form)
      keys.forEach(key => {
        this.form[key] = ''
      })
    }
  },
  beforeUnmount() {
    this.previews.forEach(url => {
      URL.revokeObjectURL(url)
    })
  }
}
</script>
<style scoped>
.preview-card {
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;

  width: 24px;
  height: 24px;

  border: none;
  border-radius: 50%;

  background: rgba(0, 0, 0, 0.65);
  color: white;

  font-size: 18px;
  line-height: 1;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s ease;
}

.delete-btn:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.85);
}
.hidden {
  display: none;
}
/* .form-input {
  width: 100%;
} */
</style>
