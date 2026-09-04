import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../service/api'

export const useNotificationStore = defineStore(
  'notifications',
  () => {
    const notifications = ref([])

    const unreadCount = computed(() =>
      notifications.value.filter(
        notification => !notification.is_read
      ).length
    )

    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications/')

        notifications.value = response.data
      } catch (error) {
        console.error(
          'Erreur récupération notifications',
          error
        )
      }
    }

    const addNotification = notification => {
      notifications.value.unshift(notification)
    }

    const markAsRead = async notificationId => {
      try {
        await api.patch(`/notifications/${notificationId}/read`)

        notifications.value = notifications.value.filter(
          notification => notification.id !== notificationId
        )
      } catch (error) {
        console.error(
          'Erreur mise à jour notification',
          error
        )
      }
    }

    return {
      notifications,
      unreadCount,
      fetchNotifications,
      addNotification,
      markAsRead,
    }
  }
)