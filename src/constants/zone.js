export const ZONES = Object.freeze({
  FULL_ARM: "full_arm",
  FOREARM: "forearm",
  UPPERARM: "upperarm",
  LEG: "leg",
  BACK: "back",
  CHEST: "chest",
  OTHER: "other"
})

export const ZONES_LABELS = Object.freeze({
  [ZONES.FULL_ARM]: "Bras",
  [ZONES.UPPERARM]: "Haut de bras",
  [ZONES.FOREARM]: "Avant-bras",
  [ZONES.LEG]: "Jambe",
  [ZONES.BACK]: "Dos",
  [ZONES.CHEST]: "Torse",
  [ZONES.OTHER]: "Autre"
})

export const ZONES_OPTIONS = Object.freeze(
  Object.entries(ZONES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))
)