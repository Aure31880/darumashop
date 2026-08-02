import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    '__APP_NAME__': JSON.stringify(process.env.npm_package_name),
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})