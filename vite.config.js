import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/front/' : '/',
  plugins: [vue()],
}))
// export default defineConfig({
//   base: '/front/',
//   plugins: [vue()],
// })