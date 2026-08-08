<template>
  <div class="clients-layout">
    <aside class="clients-list">
      <div class="list-header">
        <h2>Clients</h2>
        <span class="client-count">{{ rdvs.length }}</span>
      </div>

      <div class="client-items">
        <button
          v-for="rdv in rdvs"
          :key="rdv.id"
          type="button"
          :class="[{ active: selected?.id === rdv.id }, 'btn client-item']"
          @click="selectClient(rdv)">
          <!-- <div class="client-avatar">
            {{ getInitials(rdv.client.name) }}
          </div> -->

          <div class="client-summary">
            <div class="client-name">
              {{ rdv.client.name }}
            </div>

            <div class="client-email">
              {{ rdv.client.email }}
            </div>

            <div class="client-date">
              <!-- {{ formatDate(rdv.date) }} -->
            </div>
          </div>
          <span
            :class="[
              'status-badge',
              STATUS_META[rdv.status].badgeClass
            ]">
            {{ STATUS_META[rdv.status].label }}
          </span>
        </button>
      </div>
    </aside>
    
    <main v-if="selected" class="client-detail">
      <div class="menu-container">
        <button
          class="menu-btn"
          @click="showMenu = !showMenu">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div
          v-if="showMenu"
          class="menu-dropdown">
          <button
            class="menu-item danger"
            @click="deleteClient">
            Supprimer le client et le rdv
          </button>
        </div>
      </div>
      <div class="detail-header">
        <div>
          <p class="detail-label">Rendez-vous client</p>
          <h2>{{ selected.client.name }}</h2>
        </div>
        <select
          :value="selected.status"
          :class="[
            'rounded status-select status-badge',
            STATUS_META[selected.status]?.badgeClass]"
          @change="updateAppointmentStatus($event.target.value)">
          <option
            v-for="status in STATUS_OPTIONS"
            :key="status.value"
            :value="status.value">
            {{ status.label }}
          </option>
        </select> 
      </div>

      <section
  class="
    mt-5
    grid
    grid-cols-1
    items-start
    gap-4
    md:grid-cols-[1.6fr_1fr]
    "
  >
    <article class="detail-card">
      <h3 class="font-bold">Informations contact:</h3>

      <dl class="information-list">
        <div class="information-row">
          <dt>Nom, Prénom:</dt>
          <dd>{{ selected.client.name }}</dd>
        </div>

        <div class="information-row">
          <dt>Email:</dt>
          <dd>{{ selected.client.email }}</dd>
        </div>

        <div class="information-row">
          <dt>Téléphone:</dt>
          <dd>{{ selected.client.phone || 'Non renseigné' }}</dd>
        </div>
      </dl>
    </article>

    <article class="detail-card description-card">
      <h3 class="font-bold">Informations rendez-vous:</h3>

      <dl class="information-list">
        <div class="">
          <dt>Date du rendez-vous:</dt>
          <dd>{{ formatFullDate(selected.date) }}</dd>
        </div>
      </dl>
    </article>

    <article class="detail-card description-card md:col-span-2">
      <h3 class="font-bold">Description du projet:</h3>

      <div
        v-if="selected.description"
        class="max-h-64 overflow-y-auto whitespace-pre-wrap break-words"
      >
        {{ selected.description }}
      </div>

      <p v-else class="empty-text">
        Aucune description fournie.
      </p>
    </article>

    <article class="detail-card description-card col-start-1">
      <h3 class="font-bold">Notes personnelles:</h3>
      <textarea
        id="description"
        class="w-full rounded-lg border"
        v-model="test"
        rows="8"
        placeholder=""
        required/>
      <button
          type="submit"
          class="btn ml-4"
          :disabled="!finishedPhotoFiles.length || isUploadingFinishedPhotos">
          {{ isUploadingFinishedPhotos ? 'Ajout en cours...' : 'Ajouter notes' }}
        </button>
      <!-- <div
        v-if="selected.description"
        class="max-h-64 overflow-y-auto whitespace-pre-wrap break-words"
      >
        {{ selected.description }}
      </div> -->

      <!-- <p v-else class="empty-text">
        Aucune description fournie.
      </p> -->
    </article>

    <article class="detail-card description-card col-start-2 ">
      <h3 class="font-bold">Zone à tatouer:</h3>

      <div
        v-if="selected.zone"
        class="max-h-64 overflow-y-auto whitespace-pre-wrap break-words"
      >
      {{ ZONES_LABELS[selected.zone] }}
      </div>

      <p v-else class="empty-text">
        Aucune zone fournie.
      </p>
    </article>
  </section>

      <!-- <section class="detail-grid">
        <article class="detail-card">
          <h3>Informations contact:</h3>

          <dl class="information-list">
            <div class="information-row">
              <dt>Nom, Prénom:</dt>
              <dd>{{ selected.client.name }}</dd>
            </div>
            <div class="information-row">
              <dt>Email:</dt>
              <dd>{{ selected.client.email }}</dd>
            </div>

            <div class="information-row">
              <dt>Téléphone:</dt>
              <dd>{{ selected.client.phone || 'Non renseigné' }}</dd>
            </div>
          </dl>
        </article>

        <article class="detail-card description-card">
          <h3>Information rendez-vous:</h3>
          <div class="information-row">
          Input selected number of seance -->
          <!-- Input datepicker -->
            <!-- <dt>Date du rendez-vous:</dt>
            <dd>{{ formatFullDate(selected.date) }}</dd>
          </div>
        </article>
        <article class="detail-card description-card">
          <h3>Description du projet:</h3>

          <div
            v-if="selected.description"
            class="max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
            {{ selected.description }}
          </div>

          <p v-else class="empty-text">
            Aucune description fournie.
          </p>
        </article>
      </section> -->

      <section class="attachments-section">
        <div class="section-title">
          <div>
            <p class="detail-label">Références</p>
            <!-- <h3 class="">Images envoyées</h3> -->
          </div>

          <span class="attachment-count">
            {{ referenceAttachments?.length || 0 }}
            image{{ referenceAttachments?.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div
          v-if="referenceAttachments?.length"
          class="attachments-grid">
          <button
            v-for="attachment in referenceAttachments"
            :key="attachment.id"
            type="button"
            class="btn attachment-card"
            @click="openImage(attachment)">
            <img
              :src="getAttachmentUrl(attachment.file_path)"
              :alt="attachment.filename"
              loading="lazy">
          </button>
        </div>

        <div v-else class="empty-attachments">
          Aucune image envoyée pour ce rendez-vous.
        </div>
      </section>

      <section class="attachments-section finished-tattoo-section">
        <div class="section-title">
          <div>
            <p class="detail-label">Réalisation</p>
            <h3 class="font-bold">Photos du tatouage terminé</h3>
          </div>

          <span class="attachment-count">
            {{ finishedAttachments.length }}
            photo{{ finishedAttachments.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div
          v-if="finishedAttachments.length"
          class="attachments-grid">
          <article
            v-for="attachment in finishedAttachments"
            :key="attachment.id"
            class="finished-photo-card">
            <!-- <button
              class="delete-photo-button"
              @click.stop="deleteFinishedPhoto(attachment)">
              ×
            </button> -->
            <div
              class="attachment-card"
              @click="openImage(attachment)">

              <img
                :src="getAttachmentUrl(attachment.file_path)"
                :alt="attachment.original_filename || attachment.filename">
              <div class="attachment-overlay">
                <button
                  class="btn delete-photo-button"
                  @click.stop="deleteFinishedPhoto(attachment)">
                  ×
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="empty-attachments">
          Aucune photo finale ajoutée.
        </div>
        <form
          class="finished-photo-form"
          @submit.prevent="uploadFinishedPhotos">
          <label class="upload-field">
            <span>Ajouter les photos finales </span>
            <input
              type="file"
              class="rounded upload-input"
              accept="image/jpeg,image/png,image/webp"
              multiple
              @change="handleFinishedPhotoSelection">
          </label>
          <div
            v-if="finishedPhotoPreviews.length"
            class="attachments-grid upload-previews">
            <div
              v-for="(preview, index) in finishedPhotoPreviews"
              :key="preview.url"
              class="upload-preview">
              <img
                :src="preview.url"
                :alt="preview.name">
              <button
                type="button"
                class="btn"
                @click="removeFinishedPhoto(index)">
                Retirer
              </button>
            </div>
          </div>

          <!-- <label class="caption-field">
            <span>Légende Instagram</span>

            <textarea
              v-model="finishedPhotoCaption"
              rows="4"
              placeholder="Tatouage réalisé par AL’ink Tattoo..."
            />
          </label> -->

          <!-- <label class="authorization-field">
            <input
              v-model="publishAuthorized"
              type="checkbox"
            >

            <span>
              Le client autorise la publication de ces photos
            </span>
          </label> -->

          <button
            type="submit"
            class="btn ml-4"
            :disabled="!finishedPhotoFiles.length || isUploadingFinishedPhotos">
            {{ isUploadingFinishedPhotos ? 'Envoi en cours...' : 'Ajouter les photos' }}
          </button>
        </form>
      </section>
    </main>

    <main v-else class="client-detail empty">
      <div class="empty-state">
        <h2>Sélectionne un client</h2>
        <p>Les informations du rendez-vous apparaîtront ici.</p>
      </div>
    </main>

    <div
      v-if="previewImage"
      class="image-modal"
      @click.self="previewImage = null">
      <button
        type="button"
        class="btn modal-close"
        aria-label="Fermer"
        @click="previewImage = null">
        ×
      </button>

      <img
        :src="getAttachmentUrl(previewImage.file_path)"
        :alt="previewImage.filename">
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'

  import AdminLayout from '../layouts/AdminLayout.vue'
  import api from '../service/api'
  import displayService from '../service/displayService'
  import { STATUS, STATUS_LABELS, STATUS_META, STATUS_OPTIONS } from "../constants/status"
  import { ZONES_LABELS } from '../constants/zone'

  const clients = ref([])
  const rdvs = ref([])
  const selected = ref(null)
  const previewImage = ref(null)

  const finishedPhotoFiles = ref([])
  const finishedPhotoPreviews = ref([])
  const finishedPhotoCaption = ref('')
  const publishAuthorized = ref(false)
  const isUploadingFinishedPhotos = ref(false)
  const showMenu = ref(false)

  const referenceAttachments = computed(() => {
    return selected.value?.attachments?.filter(
      attachment => attachment.category === 'reference'
    ) ?? []
  })

  const finishedAttachments = computed(() => {
    return selected.value?.attachments?.filter(
      attachment => attachment.category === 'finished'
    ) ?? []
  })

  const followUpAttachments = computed(() => {
    return selected.value?.attachments?.filter(
      attachment => attachment.category === 'follow_up'
    ) ?? []
  })

  onMounted(async () => {
    try {
      const response = await api.get('/appointments/')
      rdvs.value = response.data
    } catch (error) {
      console.error('Erreur chargement des rendez-vous', error)
    }
  })

  function selectClient(rdv) {
    selected.value = rdv
    // console.log(STATUS_LABELS[selected.value.status])
    console.log(STATUS_META[selected.value.status.badgeClass])
  }

  function openImage(attachment) {
    previewImage.value = attachment
  }

  function closeImage() {
    previewImage.value = null
  }

  function getInitials(name) {
    return displayService.getInitials(name)
  }

  function formatDate(date) {
    return displayService.formatDate(date)
  }

  function formatFullDate(date) {
    return displayService.formatFullDate(date)
  }

  function getAttachmentUrl(filePath) {
    return displayService.getAttachmentUrl(filePath)
  }

  function handleFinishedPhotoSelection(event) {
    clearFinishedPhotoPreviews()

    const files = Array.from(event.target.files ?? [])

    finishedPhotoFiles.value = files

    finishedPhotoPreviews.value = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))
  }

  function removeFinishedPhoto(index) {
    const preview = finishedPhotoPreviews.value[index]

    if (preview) {
      URL.revokeObjectURL(preview.url)
    }

    finishedPhotoFiles.value.splice(index, 1)
    finishedPhotoPreviews.value.splice(index, 1)
  }

  function clearFinishedPhotoPreviews() {
    for (const preview of finishedPhotoPreviews.value) {
      URL.revokeObjectURL(preview.url)
    }

    finishedPhotoPreviews.value = []
  }
  async function uploadFinishedPhotos() {
    if (!selected.value?.id || !finishedPhotoFiles.value.length) {
      return
    }

    isUploadingFinishedPhotos.value = true

    try {
      const formData = new FormData()

      for (const file of finishedPhotoFiles.value) {
        formData.append('attachments', file)
      }

      formData.append(
        'caption',
        finishedPhotoCaption.value
      )

      formData.append(
        'publish_authorized',
        String(publishAuthorized.value)
      )

      const response = await api.post(
        `/appointments/${selected.value.id}/attachments`,
        formData
      )

      selected.value.attachments.push(...response.data)

      clearFinishedPhotoPreviews()
      finishedPhotoFiles.value = []
      finishedPhotoCaption.value = ''
      publishAuthorized.value = false
    } catch (error) {
      console.error(
        'Erreur lors de l’envoi des photos finales',
        error
      )
    } finally {
      isUploadingFinishedPhotos.value = false
    }
  }

  async function deleteFinishedPhoto(attachment) {
    if (!confirm('Supprimer cette photo ?')) {
      return
    }

    try {
      await api.delete(`/attachments/${attachment.id}`)

      selected.value.attachments = selected.value.attachments.filter(
        item => item.id !== attachment.id
      )
    } catch (error) {
      console.error(error)
    }
  }
  async function deleteClient() {
    try {
      await api.delete(`/clients/${selected.value?.client?.id}`)
      rdvs.value = rdvs.value.filter(
        rdv => rdv.id !== selected.value.id,
      )

      selected.value = null
      showMenu.value = false
    } catch (error) {
      console.log('Error delete client', error)
    }
  }

  const updateAppointmentStatus = async (newStatus) => {
    if (!selected.value) {
      return
    }

    const appointmentId = selected.value.id
    const previousStatus = selected.value.status

    console.log("Ancien statut :", previousStatus)
    console.log("Nouveau statut :", newStatus)

    try {
      const response = await api.patch(
        `/appointments/${appointmentId}/status`,
        {
          status: newStatus,
        },
      )

      const updatedStatus = response.data.status

      selected.value.status = updatedStatus

      const appointment = rdvs.value.find(
        rdv => rdv.id === appointmentId,
      )

      if (appointment) {
        appointment.status = updatedStatus
      }
    } catch (error) {
      selected.value.status = previousStatus

      console.error(
        "Erreur lors de la mise à jour du statut",
        error,
      )
    }
  }
  const openDeleteDialog = () => {
    showMenu.value = false
  }
</script>
<style scoped>
.clients-layout {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
  min-height: calc(100vh - 40px);
  padding: 20px;
  /* background: #101115; */
  /* color: #f4f4f5; */
  color: var(--text);
}

.clients-list,
.client-detail {
  /* background: #1b1d22; */
  border: 1px solid #2a2d34;
  border-radius: 20px;
}

.clients-list {
  padding: 24px 18px;
}

.list-header,
.detail-header,
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.list-header h2,
.detail-header h2,
.section-title h3 {
  margin: 0;
}

.client-count,
.attachment-count {
  padding: 5px 10px;
  border-radius: 999px;
  /* background: #292c33; */
  /* color: #b8bbc2; */
  color: var(--text);
  font-size: 13px;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-summary {
  display: flex;
  flex-direction: column;
}

.status-badge {
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.client-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 14px;
  padding: 14px;
  color: inherit;
  text-align: left;
  /* background: #13151a; */
  border: 1px solid transparent;
  border-radius: 14px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}

.client-item:hover {
  transform: translateY(-1px);
  /* border-color: #3b3f48;
  background: #181a20; */
}

/* .client-item.active {
  background: #c8102e;
  border-color: #e01b3c;
} */

.client-avatar {
  display: grid;
  place-items: center;
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2b2e35;
  font-weight: 700;
}

.client-item.active .client-avatar {
  background: rgb(255 255 255 / 18%);
}

.client-summary {
  min-width: 0;
}

.client-name {
  font-weight: 700;
  font-size: 16px;
}

.client-email,
.client-date {
  overflow: hidden;
  /* color: #9b9ea6; */
  color: var(--text);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* .client-item.active .client-email,
.client-item.active .client-date {
  color: rgb(255 255 255 / 78%);
} */

.client-detail {
  padding: 36px;
}

.detail-label {
  margin: 0 0 6px;
  /* color: #8f929a; */
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.appointment-badge {
  padding: 10px 14px;
  border: 1px solid #363941;
  border-radius: 12px;
  /* background: #22252b; */
  /* color: #d5d7dc; */
  color: var(--text);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: 18px;
  margin-top: 30px;
}

.detail-card {
  padding: 22px;
  background: var(--client-card);
  /* background: #14161b; */
  border: 1px solid #292c33;
  border-radius: 16px;
}

.detail-card h3 {
  margin: 0 0 20px;
}

.information-list {
  margin: 0;
}

.information-row {
  display: grid;
  grid-template-columns: 135px 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #262931;
}

.information-row:last-child {
  border-bottom: 0;
}

.information-row dt {
  /* color: #8f929a; */
  color: var(--text);
}

.information-row dd {
  margin: 0;
  word-break: break-word;
}

.description-card p {
  /* color: #d2d3d7; */
  color: var(--text);
  line-height: 1.7;
  white-space: pre-wrap;
}

.attachments-section {
  margin-top: 34px;
}

.attachments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.attachment-card {
  position: relative;
  overflow: hidden;
  min-height: 210px;
  padding: 0;
  border: 1px solid #30333b;
  border-radius: 15px;
  /* background: #111318; */
  cursor: pointer;
}

.attachment-card img {
  display: block;
  width: 100%;
  height: 210px;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.attachment-card:hover img {
  transform: scale(1.04);
}

.attachment-overlay {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 34px 13px 12px;
  color: #fff;
  /* color: var(--text); */
  /* background: linear-gradient(transparent, rgb(0 0 0 / 85%)); */
  /* background: var(--bg-card); */
}
button {
  background: var(--none);
  /* color: #fff; */
}
button:hover {
  box-shadow: none;
}

.attachment-overlay span:first-child {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.view-image {
  flex: none;
  /* color: #d6d7da; */
  color: var(--text);
  font-size: 12px;
}

.empty-attachments,
.empty-state {
  padding: 42px 20px;
  margin-top: 18px;
  /* color: #8f929a; */
  color: var(--text);
  text-align: center;
  /* background: #14161b; */
  border: 1px dashed #32353d;
  border-radius: 15px;
}

.client-detail.empty {
  display: grid;
  place-items: center;
}

.image-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 40px;
  /* background: rgb(0 0 0 / 88%); */
}

.image-modal img {
  max-width: min(1100px, 95vw);
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
}

.modal-close {
  position: fixed;
  top: 20px;
  right: 28px;
  /* color: white; */
  color: var(--text);
  font-size: 42px;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.menu-container {
  position: relative;
  margin-bottom: 15px
}

.menu-btn {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  font-size: 22px;
}

.menu-dropdown {
  position: relative;
  /* top: 42px; */
  right: 0;

  min-width: 100px;

  background: none;
  /* border: 1px solid #e5e7eb;
  border-radius: 8px; */

  box-shadow: 0 8px 20px rgba(0,0,0,.12);

  z-index: 100;
}

.menu-item {
  width: 35%;
  border: none;
  background: none;
  padding: 10px 16px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

.menu-item.danger {
  background: #dc2626;
  color: #FFFFFf;
}
.upload-input {
  width: 112px;
}

@media (max-width: 900px) {
  .clients-layout {
    grid-template-columns: 1fr;
  }

  .clients-list {
    max-height: 340px;
    overflow-y: auto;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .finished-photo-card {
    position: relative;
  }
  
  .delete-photo-button {
    position: absolute;
    top: 6px;
    right: 6px;

    width: 18px;
    height: 18px;

    border: none;
    border-radius: 50%;

    /* background: rgba(0, 0, 0, 0.65); */
    color: white;
    /* color: var(--text); */

    font-size: 18px;
    line-height: 1;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.2s ease;

  }
  .delete-photo-button:hover {
    transform: scale(1.1);
    /* background: rgba(0, 0, 0, 0.85); */
  }
  .header-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
}
</style>
