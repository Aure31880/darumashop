const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

class DisplayService {
  getInitials(name) {
    if (!name) return '?'

    return name
      .trim()
      .split(/\s+/)
      .map(part => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  formatDate(date) {
    if (!date) return ''

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date))
  }

  formatFullDate(date) {
    if (!date) return 'Non renseignée'

    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(date))
  }

  getAttachmentUrl(filePath) {
    if (!filePath) return ''

    if (/^https?:\/\//i.test(filePath)) {
      return filePath
    }

    const normalizedPath = filePath.replaceAll('\\', '/')
    const cleanPath = normalizedPath.replace(/^\/+/, '')

    return `${API_URL}/${cleanPath}`
  }
}

export default new DisplayService()