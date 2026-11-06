import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The app lives at the root of its own address: griefcalendar.monicasweb.co.uk
  base: '/',
  plugins: [react()],
})
