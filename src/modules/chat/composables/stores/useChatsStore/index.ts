import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import { mock } from './mock'

export const useChatsStore = defineStore('chats', () => {
  const chats: Ref<typeof mock> = ref([])

  // TODO: Get chats from API
  setTimeout(() => chats.value = mock, 250)

  return { chats }
})
