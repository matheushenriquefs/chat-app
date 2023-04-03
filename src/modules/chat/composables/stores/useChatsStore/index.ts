import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatsStore = defineStore('chats', () => {
  const chats = ref([])

  return { chats }
})
