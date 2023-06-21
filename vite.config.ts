import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'chat-components-chunk': [
            './src/modules/chat/components/ChatBody',
            './src/modules/chat/components/ChatCard',
            './src/modules/chat/components/ChatCardList',
            './src/modules/chat/components/ChatContainer',
            './src/modules/chat/components/ChatInput',
            './src/modules/chat/components/ChatLayout',
            './src/modules/chat/components/ChatMessages',
            './src/modules/chat/components/ChatTextMessage'
          ]
        }
      }
    }
  }
})
