import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite"


export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/front/' : '/',
  plugins: [vue(), tailwindcss()],
}))
// export default defineConfig({
//   base: '/front/',
//   plugins: [vue()],
// })