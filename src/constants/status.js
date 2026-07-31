export const STATUS = Object.freeze({
  TO_BE_PROCESSED: "to_be_processed",
  UNDER_REVIEW: "under_review",
  SCHEDULED: "scheduled",
  ONGOING_SESSION: "ongoing_session",
  FINISHED: "finished",
})

export const STATUS_LABELS = Object.freeze({
  [STATUS.TO_BE_PROCESSED]: "À traiter",
  [STATUS.UNDER_REVIEW]: "En étude",
  [STATUS.SCHEDULED]: "Planifié",
  [STATUS.ONGOING_SESSION]: "Session en cours",
  [STATUS.FINISHED]: "Terminé",
})

export const STATUS_META = Object.freeze({
  [STATUS.TO_BE_PROCESSED]: {
    label: "À traiter",
    badgeClass: "bg-purple-300 text-purple-800",
  },

  [STATUS.UNDER_REVIEW]: {
    label: "En étude",
    badgeClass: "bg-yellow-300 text-yellow-800",
  },

  [STATUS.SCHEDULED]: {
    label: "Planifié",
    badgeClass: "bg-blue-300 text-blue-800",
  },

  [STATUS.ONGOING_SESSION]: {
    label: "Session en cours",
    badgeClass: "bg-gray-300 text-gray-800",
  },

  [STATUS.FINISHED]: {
    label: "Terminé",
    badgeClass: "bg-green-300 text-green-800",
  },
})