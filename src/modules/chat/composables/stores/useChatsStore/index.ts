import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import type { Chat } from '@/modules/chat/types/Chat'
import { mock } from './mock'

export const useChatsStore = defineStore('chats', () => {
  const chats: Ref<Chat[]> = ref([])
  const lastActiveChatId = useStorage('last-active-chat-id', 0, window.sessionStorage)

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

  /**
   * Update the isActive flag of a stored chat by id and persist its id on session storage.
   *
   * @param id {number} The id of the chat to be updated.
   * @param isActive {boolean} An object with the keys and values to be updated.
   */
  const setIsActive = (id: number, isActive: boolean) => {
    lastActiveChatId.value = id
    updateById(id, { isActive })
  }

  // TODO: Get chats from API
  setTimeout(() => (chats.value = mock), 500)

  return { chats, updateById, setIsActive }
})
