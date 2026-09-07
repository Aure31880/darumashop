<template>
  <div class="rounded-lg p-2 transition hover:bg-zinc-800 dark:hover:bg-zinc-700">
    <!-- Cloche -->
    <button
      class="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="toggleNotifications"
    >
      <i class="fa-regular fa-bell text-xl"></i>

      <span
        v-if="unreadCount > 0"
        class="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 z-50 mt-3 w-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700"
      >
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white">Notifications</h3>

          <p class="text-xs text-gray-500">
            {{ unreadCount }} non lue{{ unreadCount > 1 ? 's' : '' }}
          </p>
        </div>
      </div>

      <!-- Aucune notification -->
      <div v-if="notifications.length === 0" class="px-6 py-10 text-center">
        <i class="fa-regular fa-bell-slash mb-3 text-3xl text-gray-400"></i>

        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Aucune notification</p>

        <p class="mt-1 text-xs text-gray-400">Les nouvelles demandes apparaîtront ici.</p>
      </div>

      <!-- Notifications -->
      <div v-else class="max-h-96 overflow-y-auto">
        <button
          v-for="notification in notifications"
          :key="notification.id"
          class="flex w-full gap-3 border-b border-gray-100 px-4 py-4 text-left transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
          :class="{
            'bg-blue-50/60 dark:bg-blue-950/20': !notification.is_read,
          }"
          @click="handleNotificationClick(notification)"
        >
          <!-- Indicateur non lu -->
          <div class="pt-2">
            <span
              class="block h-2 w-2 rounded-full"
              :class="notification.is_read ? 'bg-transparent' : 'bg-blue-500'"
            />
          </div>

          <!-- Contenu -->
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <p
                class="text-sm text-gray-900 dark:text-white"
                :class="{
                  'font-semibold': !notification.is_read,
                  'font-medium': notification.is_read,
                }"
              >
                {{ notification.title }}
              </p>
            </div>

            <p class="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {{ notification.message }}
            </p>

            <p class="mt-2 text-xs text-gray-400">
              {{ displayService.formatDate(notification.created_at) }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notificationStore'
import { connectNotifications, disconnectNotifications } from '../service/ablyService'
import displayService from '../service/displayService'

const router = useRouter()
const notificationStore = useNotificationStore()

const { notifications, unreadCount, addNotification } = storeToRefs(notificationStore)

const isOpen = ref(false)

const toggleNotifications = () => {
  isOpen.value = !isOpen.value
}

const handleNotificationClick = async (notification) => {
  if (!notification.is_read) {
    await notificationStore.markAsRead(notification.id)
  }
  if (notification.type === 'appointment' && notification.resource_id) {
    await router.push({
      name: 'Clients',
      params: {
        id: notification.resource_id,
      },
    })

    isOpen.value = false
  }
}

onMounted(async () => {
  await notificationStore.fetchNotifications()

  await connectNotifications((notification) => {
    notificationStore.addNotification(notification)
  })
})

onUnmounted(async () => {
  await disconnectNotifications()
})
</script>
