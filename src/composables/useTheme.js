import { ref } from 'vue'

const savedTheme = localStorage.getItem('theme') || 'dark'
const theme = ref(savedTheme)

function applyTheme() {
  document.documentElement.classList.toggle(
    'light',
    theme.value === 'light',
  )
}

function toggleTheme() {
  theme.value = theme.value === 'dark'
    ? 'light'
    : 'dark'

  localStorage.setItem('theme', theme.value)
  applyTheme()
}

applyTheme()

export function useTheme() {
  return {
    theme,
    toggleTheme,
  }
}


// import { ref, watch } from 'vue'

// const theme = ref(localStorage.getItem('theme') || 'dark')

// document.documentElement.classList.toggle(
//   'dark',
//   theme.value === 'dark',
// )

// watch(theme, (value) => {
//   localStorage.setItem('theme', value)

//   document.documentElement.classList.toggle(
//     'dark',
//     value === 'dark',
//   )
// })

// function toggleTheme() {
//   console.log('toggleTheme ==========>')
//   theme.value = theme.value === 'dark'
//     ? 'light'
//     : 'dark'
// }

// export function useTheme() {
//   return {
//     theme,
//     toggleTheme,
//   }
// }