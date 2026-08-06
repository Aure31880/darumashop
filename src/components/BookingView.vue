<template>
  <div class="booking-page">
    <div class="booking-card">
      <h2>🖋 Prise de rendez-vous</h2>
      <div
        class="mb-8 mt-6 rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-6 text-zinc-200 shadow-lg backdrop-blur-sm">

        <p class="text-lg font-semibold text-white">
          Merci pour votre intérêt pour mon travail.
        </p>

        <div class="mt-4 space-y-4 text-sm leading-7 text-zinc-300 md:text-base">
          <p>
            Je me spécialise dans les projets
            <span class="font-semibold text-white">
              réalistes noir et gris, pour les projets de grandes envergures
            </span>
            le tatouage est réalisé sur plusieurs sessions afin d'assurer profondeur
            et équilibre dans le temps.
          </p>

          <div
            class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">

            <p class="text-sm uppercase tracking-widest text-amber-300">
              Tarification
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              À partir de votre projet
            </p>

            <p class="mt-3 leading-7 text-zinc-300">
              Chaque tatouage fait l'objet d'un devis personnalisé.
              Une journée complète est facturée
              <span class="font-semibold text-white">400 €</span>,
              mais un projet plus court ou un flash sera adapté à son temps de réalisation.
            </p>
          </div>

          <!-- <p>
            La majorité des projets nécessitent
            <span class="font-semibold text-white">
              plusieurs journées
            </span>
            selon la taille et la complexité.
          </p> -->

          <p>
            Ce formulaire me permet de comprendre votre projet et d'évaluer sa
            cohérence avec ma direction artistique.
          </p>

          <div
            class="rounded-lg border-l-4 border-white/70 bg-zinc-800/60 p-4">
            <p class="font-medium text-white">
              📩 Chaque demande est consultée personnellement.
            </p>

            <p class="mt-2 text-zinc-300">
              Je réponds généralement sous
              <span class="font-semibold text-white">
                3 à 7 jours ouvrés.
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- JE VEUX LE METTRE ICI -->
      <form
        @submit.prevent="submitBooking"
        class="
          w-full
          max-w-xxl
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
            <label for="phone" class="block mb-2">Téléphone *</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border px-3 py-3"/>
          </div>
        </div>
        <div class="form-group mt-6">
          <label class="block mb-2 text-xl" for="description">Description du projet</label>
          <p class="subdescription text-xs">Thème, idées, taille, emplacement, ambiance recherchée. Vous pouvez ajouter tout élément que vous jugez important pour la compréhension du projet.</p>
          <textarea
            id="description"
            class="w-full rounded-lg border"
            v-model="form.description"
            rows="8"
            placeholder=""
            required/>
        </div>
        <div class="flex flex-col gap-10 mt-6">
          <label class="text-xl zone">Zone à tatouer *</label>
          <div 
            v-for="(label, value) in ZONES_LABELS"
            :key="value"
            class="inline-flex items-center">
            <label class="relative flex items-center cursor-pointer" for="html-custom">
              <input
                type="radio"
                :id="`zone-${value}`"
                :value="value"
                v-model="form.zone"
                name="framework-custom"
                class="peer h-5 w-5 rounded-full border border-zinc-500 bg-zinc-900 checked:border-amber-500"
              />
              <span
                class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500 opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none">
              </span>
            </label>
            <label class="ml-2 text-white-600 cursor-pointer text-m" for="html-custom">
              {{ label }}
            </label>
          </div>
        </div>
        <div class="form-group mt-6">
          <label class="block mb-2 text-xl" for="description">Ajouter images de référence *</label>
          <input
            type="file"
            class="rounded-lg mt-4 border w-64 px-3 py-3"
            multiple
            accept="image/*"
            @change="handleFilesUpload"/>
        </div>
        <div class="preview-container mt-6">
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
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import api from '../service/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ZONES, ZONES_LABELS, ZONES_OPTIONS } from '../constants/zone'

export default {
  data() {
    return {
      success: false,
      files: [],
      form: reactive({
        name: null,
        email: null,
        phone: null,
        description: null,
        // date: '',
        references: [],
        zone: null,
      }),
      previews: [],
      ZONES,
      ZONES_LABELS,
      ZONES_OPTIONS
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
        console.log('zone ====>', this.form)
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
        formData.append('zone', this.form.zone)

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
          date: '',
          attachments: [],
          zone: null
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
textarea {
  padding: 5px;
}
.subdescription {
  color: var(--muted);
  margin-bottom: 5px;
}
</style>
