import * as Ably from 'ably'

let ably = null
let channel = null

export const connectNotifications = async (onNotification) => {
  if (!ably) {
    ably = new Ably.Realtime({
      authUrl: `${import.meta.env.VITE_API_URL}/ably/token`,
    })
  }

  channel = ably.channels.get('admin.notifications')

  await channel.subscribe('appointment_created', (message) => {
    onNotification(message.data)
  })
}

export const disconnectNotifications = async () => {
  if (channel) {
    await channel.unsubscribe()
  }

  if (ably) {
    ably.close()
    ably = null
    channel = null
  }
}
