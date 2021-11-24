import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgPlugin from './src/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgPlugin(path.resolve(__dirname, 'svgs'), 'test-icon'),
    vue()
  ]
})
