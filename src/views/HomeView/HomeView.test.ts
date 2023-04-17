import { describe, it, expect, vi } from 'vitest'
import { render, within } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter } from 'vue-router'
import type { Ref } from 'vue'

import HomeView from './HomeView.vue'
import { mock } from './mock'
import { options } from '@/router'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'
import { useChatRecipient } from '@/modules/chat/composables/chat/useChatRecipient'
import { useChatLastMessage } from '@/modules/chat/composables/chat/useChatLastMessage'
import { useChatCountNotifications } from '@/modules/chat/composables/chat/useChatCountNotifications'
import type { ChatMessage } from '@/modules/chat/types/Chat'

const pinia = createTestingPinia({
  createSpy: vi.fn()
})
const router = createRouter(options)

describe('HomeView', () => {
  describe('when user has no chats', () => {
    it(`should not display chat list items`, () => {
      const container = render(HomeView, {
        global: {
          plugins: [router, pinia]
        }
      })
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(0)
    })
  })

  describe('when user has at least one chat', () => {
    it(`should display chat list items without notifications`, () => {
      const store = useChatsStore(pinia)
      store.chats = mock.settings[2]
      const container = render(HomeView, {
        global: {
          plugins: [router, pinia]
        }
      })
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(1)

      listItems.forEach((listItem, index) => {
        const { recipient } = useChatRecipient(store.chats[index])
        const { lastMessage } = useChatLastMessage(store.chats[index].messages) as {
          lastMessage: Ref<ChatMessage>
        }
        const heading = within(listItem).getByRole('heading', { level: 6 })

        expect(heading.textContent).toBe(recipient.value.name)
        expect(within(listItem).getByText(lastMessage.value.content)).toBeTruthy()
        expect(within(listItem).queryByRole('status')).toBeFalsy()
      })
    })

    it(`should display chat list items with notifications`, () => {
      const store = useChatsStore(pinia)
      store.chats = mock.settings[1]
      const container = render(HomeView, {
        global: {
          plugins: [router, pinia]
        }
      })
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(2)

      listItems.forEach((listItem, index) => {
        const { recipient } = useChatRecipient(store.chats[index])
        const { lastMessage } = useChatLastMessage(store.chats[index].messages) as {
          lastMessage: Ref<ChatMessage>
        }
        const heading = within(listItem).getByRole('heading', { level: 6 })
        const { counter: notificationsCounter } = useChatCountNotifications(
          store.chats[index].messages
        )

        expect(heading.textContent).toBe(recipient.value.name)
        expect(within(listItem).getByText(lastMessage.value.content)).toBeTruthy()
        expect(within(listItem).getByRole('status').textContent).toBe(
          String(notificationsCounter.value)
        )
      })
    })
  })
})
