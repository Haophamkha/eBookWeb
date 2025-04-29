import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    fs: {
      strict: true, // Chỉ cho phép truy cập file trong public
    },
  },
  build: {
    // Đảm bảo file trong public được phục vụ đúng
    assetsInclude: ['**/*.txt'],
  },
})
