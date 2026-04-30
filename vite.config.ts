import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Avoid SASS Dart deprecation warning
  css: {
    preprocessorOptions: {
      scss: {
        api: "mordern-compiler"
      }
    }
  }
})
