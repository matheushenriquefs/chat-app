import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, within } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import type { Ref } from 'vue'

import HomeView from './HomeView.vue'
import router from '@/router'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'
import { useChatRecipient } from '@/modules/chat/composables/chat/useChatRecipient'
import { useChatLastMessage } from '@/modules/chat/composables/chat/useChatLastMessage'
import { useChatCountNotifications } from '@/modules/chat/composables/chat/useChatCountNotifications'
import { createMockedChats } from '@/modules/chat/utils/tests/mocks/mock'
import type { ILocalTestContext } from '@/modules/chat/utils/tests/types/ILocalTestContext'
import type { ChatMessage } from '@/modules/chat/types/Chat'

const mock = createMockedChats()
const pinia = createTestingPinia({
  createSpy: vi.fn()
})

beforeEach<ILocalTestContext>(async (context) => {
  const store = useChatsStore()
  store.chats = []

  context.options = {
    render: {
      global: {
        plugins: [router, pinia]
      }
    }
  }
  context.store = store
})

describe('HomeView', () => {
  describe('when user has no chats', () => {
    it(`should not display chat list items`, (context: ILocalTestContext) => {
      const container = render(HomeView, context.options.render)
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(0)
    })
  })

  describe('when user has at least one chat', () => {
    it(`should display chat list items without notifications`, (context: ILocalTestContext) => {
      context.store.chats = mock[1]
      const container = render(HomeView, context.options.render)
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(1)

      listItems.forEach((listItem, index) => {
        const { recipient } = useChatRecipient(context.store.chats[index])
        const { lastMessage } = useChatLastMessage(context.store.chats[index].messages) as {
          lastMessage: Ref<ChatMessage>
        }
        const heading = within(listItem).getByRole('heading', { level: 6 })
        const anchor = within(listItem).getByRole('link') as HTMLAnchorElement

        expect(heading.textContent).toBe(recipient.value.name)
        expect(within(listItem).getByText(lastMessage.value.content)).toBeTruthy()
        expect(within(listItem).queryByRole('status')).toBeFalsy()
        expect(anchor.href).toContain('/chat')
      })
    })

    it(`should display chat list items with notifications`, (context: ILocalTestContext) => {
      context.store.chats = mock[2]
      const container = render(HomeView, context.options.render)
      const list = container.getByRole('list')
      const listItems = within(list).queryAllByRole('listitem')

      expect(list).toBeTruthy()
      expect(listItems.length).toBe(2)

      listItems.forEach((listItem, index) => {
        const { recipient } = useChatRecipient(context.store.chats[index])
        const { lastMessage } = useChatLastMessage(context.store.chats[index].messages) as {
          lastMessage: Ref<ChatMessage>
        }
        const heading = within(listItem).getByRole('heading', { level: 6 })
        const { counter: notificationsCounter } = useChatCountNotifications(
          context.store.chats[index].messages
        )
        const anchor = within(listItem).getByRole('link') as HTMLAnchorElement

        expect(heading.textContent).toBe(recipient.value.name)
        expect(within(listItem).getByText(lastMessage.value.content)).toBeTruthy()
        expect(within(listItem).getByRole('status').textContent).toBe(
          String(notificationsCounter.value)
        )
        expect(anchor.href).toContain('/chat')
      })
    })
  })
})
