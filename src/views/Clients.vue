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
          class="client-item"
          :class="{ active: selected?.id === rdv.id }"
          @click="selectClient(rdv)"
        >
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
        </button>
      </div>
    </aside>

    <main v-if="selected" class="client-detail">
      <div class="detail-header">
        <div>
          <p class="detail-label">Rendez-vous client</p>
          <h2>{{ selected.client.name }}</h2>
        </div>

        <div class="appointment-badge">
          <!-- {{ formatDate(selected.date) }} -->
        </div>
      </div>

      <section class="detail-grid">
        <article class="detail-card">
          <h3>Informations contact:</h3>

          <dl class="information-list">
            <div class="information-row">
              <dt>Email:</dt>
              <dd>{{ selected.client.email }}</dd>
            </div>

            <div class="information-row">
              <dt>Téléphone:</dt>
              <dd>{{ selected.client.phone || 'Non renseigné' }}</dd>
            </div>

            <div class="information-row">
              <dt>Date du rendez-vous:</dt>
              <dd>{{ formatFullDate(selected.date) }}</dd>
            </div>
          </dl>
        </article>

        <article class="detail-card description-card">
          <h3>Description du projet</h3>

          <p v-if="selected.description">
            {{ selected.description }}
          </p>

          <p v-else class="empty-text">
            Aucune description fournie.
          </p>
        </article>
      </section>

      <section class="attachments-section">
        <div class="section-title">
          <div>
            <p class="detail-label">Références</p>
            <h3>Images envoyées</h3>
          </div>

          <span class="attachment-count">
            {{ selected.attachments?.length || 0 }}
            image{{ selected.attachments?.length > 1 ? 's' : '' }}
          </span>
        </div>

        <div
          v-if="selected.attachments?.length"
          class="attachments-grid"
        >
          <button
            v-for="attachment in selected.attachments"
            :key="attachment.id"
            type="button"
            class="attachment-card"
            @click="openImage(attachment)"
          >
            <img
              :src="getAttachmentUrl(attachment.file_path)"
              :alt="attachment.filename"
              loading="lazy"
            >

            <div class="attachment-overlay">
              <span>{{ attachment.filename }}</span>
              <span class="view-image">Agrandir</span>
            </div>
          </button>
        </div>

        <div v-else class="empty-attachments">
          Aucune image envoyée pour ce rendez-vous.
        </div>
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
      @click.self="previewImage = null"
    >
      <button
        type="button"
        class="modal-close"
        aria-label="Fermer"
        @click="previewImage = null"
      >
        ×
      </button>

      <img
        :src="getAttachmentUrl(previewImage.file_path)"
        :alt="previewImage.filename"
      >
    </div>
  </div>
</template>

<script>
import AdminLayout from '../layouts/AdminLayout.vue'
import api from '../service/api'
import displayService from '../service/displayService'


export default {
  components: { AdminLayout },

  data() {
    return {
      clients: [],
      rdvs: [],
      selected: null,
      previewImage: null,
      displayService,
    }
  },

  async mounted() {
    try {
      const res = await api.get('/appointments/')
      this.rdvs = res.data
    } catch (err) {
      console.error('Erreur chargement clients', err)
    }
  },

  methods: {
    // selectClient(client) {
    //   this.selected = client
    // },
    selectClient(rdv) {
      this.selected = rdv
    },

    openImage(attachment) {
      this.previewImage = attachment
    },

    closeImage() {
      this.previewImage = null
    },

    getInitials(name) {
      return displayService.getInitials(name)
    },

    formatDate(date) {
      return displayService.formatDate(date)
    },

    formatFullDate(date) {
      return displayService.formatFullDate(date)
    },

    getAttachmentUrl(filePath) {
      return displayService.getAttachmentUrl(filePath)
    },
  }
}
</script>
<style scoped>
.clients-layout {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
  min-height: calc(100vh - 40px);
  padding: 20px;
  background: #101115;
  color: #f4f4f5;
}

.clients-list,
.client-detail {
  background: #1b1d22;
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
  background: #292c33;
  color: #b8bbc2;
  font-size: 13px;
}

.client-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}

.client-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 14px;
  padding: 14px;
  color: inherit;
  text-align: left;
  background: #13151a;
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
  border-color: #3b3f48;
  background: #181a20;
}

.client-item.active {
  background: #c8102e;
  border-color: #e01b3c;
}

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
  color: #9b9ea6;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.client-item.active .client-email,
.client-item.active .client-date {
  color: rgb(255 255 255 / 78%);
}

.client-detail {
  padding: 36px;
}

.detail-label {
  margin: 0 0 6px;
  color: #8f929a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.appointment-badge {
  padding: 10px 14px;
  border: 1px solid #363941;
  border-radius: 12px;
  background: #22252b;
  color: #d5d7dc;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  gap: 18px;
  margin-top: 30px;
}

.detail-card {
  padding: 22px;
  background: #14161b;
  border: 1px solid #292c33;
  border-radius: 16px;
}

.detail-card h3 {
  margin: 0 0 20px;
}

.information-list {
  margin: 0;
}

/* .information-row {
  display: grid;
  grid-template-columns: 135px 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #262931;
} */

.information-row:last-child {
  border-bottom: 0;
}

.information-row dt {
  color: #8f929a;
}

.information-row dd {
  margin: 0;
  word-break: break-word;
}

.description-card p {
  color: #d2d3d7;
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
  background: #111318;
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
  background: linear-gradient(transparent, rgb(0 0 0 / 85%));
}

.attachment-overlay span:first-child {
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.view-image {
  flex: none;
  color: #d6d7da;
  font-size: 12px;
}

.empty-attachments,
.empty-state {
  padding: 42px 20px;
  margin-top: 18px;
  color: #8f929a;
  text-align: center;
  background: #14161b;
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
  background: rgb(0 0 0 / 88%);
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
  color: white;
  font-size: 42px;
  background: transparent;
  border: 0;
  cursor: pointer;
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
}
</style>
