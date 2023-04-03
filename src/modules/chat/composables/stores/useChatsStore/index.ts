import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Chat } from '@/modules/chat/types/Chat'
import { mock } from './mock'

export const useChatsStore = defineStore('chats', () => {
  const chats: Ref<Chat[]> = ref([])

  const updateById = (id: number, data: unknown): void => {
    const chat = chats.value.find((chat) => chat.id === id)

    if (chat) {
      Object.assign(chat, data)
    }
  }

  // TODO: Get chats from API
  setTimeout(() => (chats.value = mock), 500)

  return { chats, updateById }
})
