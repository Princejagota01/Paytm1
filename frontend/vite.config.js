import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      events: "events",
    },
  },
  optimizeDeps: {
    include: ["events"],
  },
  plugins: [react()],
})