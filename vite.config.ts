import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // Relative base + hash routing + a single inlined HTML file: the built
  // dist/index.html runs from any static host or opened directly from disk.
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
