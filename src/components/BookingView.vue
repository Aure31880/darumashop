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
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFilesUpload"
          />
        </div>
        <div class="preview-container">
          <div
            v-for="(image, index) in previews"
            :key="index"
            class="preview-card">
            <img :src="image" alt="preview" />
            <button
              @click="removeImage(index)"
              class="delete-btn">
              ×
            </button>
          </div>
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
        file: [],
        date: '',
      },
      previews: []
    }
  },

  methods: {
    handleFilesUpload(event) {
      const uploadedFiles = Array.from(event.target.files)
      this.files = uploadedFiles

      this.previews = uploadedFiles.map(file =>
        URL.createObjectURL(file)
      )
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
        formData.append('date', this.form.date)

        this.files.forEach((file) => {
          formData.append('attachments', file)
        })

        const response = await fetch(import.meta.env.VITE_FORMSPREE, {
          method: "POST",
          body: formData,
           headers: {
            Accept: 'application/json'
          }
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
</style>
