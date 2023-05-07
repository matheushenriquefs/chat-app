import { ref, onBeforeMount } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import { useHttpFacade } from '@/modules/core/composables/facades/useHttpFacade'
import type { Chat, HttpChat } from '@/modules/chat/types/Chat'
import type { IHttpRequestOptions } from '@/modules/core/contracts/IHttp'

export const useChatsStore = defineStore('chats', () => {
  const chats: Ref<Chat[]> = ref([])
  const lastActiveChatId = useStorage('last-active-chat-id', 0, window.sessionStorage)
  const Http = useHttpFacade()

  /**
   * Update a stored chat by id.
   *
   * @param id {number} The id of the chat to be updated.
   *
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
   *
   * @param isActive {boolean} An object with the keys and values to be updated.
   */
  const setIsActive = (id: number, isActive: boolean) => {
    lastActiveChatId.value = id
    updateById(id, { isActive })
  }

  /**
   * Fetch chats from API.
   *
   * @param config {object} Options compliant with the IHttpRequestOptions interface.
   * This object is used as request specific options by the HTTP client.
   *
   * @returns {Promise} A promise containing an array of chats.
   */
  const fetch = async (config: IHttpRequestOptions = {}): Promise<Chat[]> => {
    try {
      if (Http) {
        const chats = (await Http.get<HttpChat[]>('/v1/chats', config)).data.map((chat) => ({
          ...chat,
          isActive: false
        }))

        return chats
      }
    } catch (error) {
      console.log('[error] chatStore - getChats', error)
      return []
    }

    return []
  }

  /**
   * Get the current stored active chat.
   *
   * @returns {(Chat | null)} The current stored active chat.
   */
  const getActive = (): Chat | null => {
    const chat = chats.value.find((chat) => chat.isActive)

    return chat ? chat : null
  }

  onBeforeMount(async () => {
    chats.value = await fetch()
  })

  return { chats, lastActiveChatId, updateById, setIsActive, getActive }
})
