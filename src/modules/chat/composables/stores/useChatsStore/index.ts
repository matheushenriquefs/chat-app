import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

import type { Chat } from '@/modules/chat/types/Chat'
import { mock } from './mock'

export const useChatsStore = defineStore('chats', () => {
  const chats: Ref<Chat[]> = ref([])

  /**
   * Update a stored chat by id.
   *
   * @param id {number} The id of the chat to be updated.
   * @param data {object} An object with the keys and values to be updated.
   */
  const updateById = (id: number, data: object): void => {
    const chat = chats.value.find((chat) => chat.id === id)

    if (chat) {
      Object.assign(chat, data)
    }
  }

  // TODO: Get chats from API
  setTimeout(() => (chats.value = mock), 500)

  return { chats, updateById }
})
