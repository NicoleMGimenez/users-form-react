import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'node_modules'), // Permite acceder a node_modules
        path.resolve(__dirname, 'src'),           // Asegura acceso a la carpeta src
      ]
    }
  },
  base: "https://NicoleMGimenez.github.io/users-form-react"
})
