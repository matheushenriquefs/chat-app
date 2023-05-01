import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'

import ChatView from './ChatView.vue'
import router from '@/router'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'
import { useChatRecipient } from '@/modules/chat/composables/chat/useChatRecipient'
import { createMockedChats } from '@/modules/chat/utils/tests/mocks/mock'
import type { ILocalTestContext } from '@/modules/chat/utils/tests/types/ILocalTestContext'
import type { ChatMessage } from '@/modules/chat/types/Chat'

const mock = createMockedChats()
const pinia = createTestingPinia({
  createSpy: vi.fn(),
  fakeApp: true
})

beforeEach<ILocalTestContext>(async (context) => {
  const store = useChatsStore(pinia)
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

describe('ChatView', () => {
  describe('when user navigates to chat view', () => {
    it(`should display chat data`, (context: ILocalTestContext) => {
      context.store.chats = mock[1].map((chat) => ({ ...chat, isActive: true }))
      context.store.getActive = vi.fn(() => context.store.chats[0])

      const container = render(ChatView, context.options.render)
      const { recipient } = useChatRecipient(context.store.getActive())
      const picture = container.getByAltText(`${recipient.value.name}'s profile picture`)

      expect(picture).toBeTruthy()
      expect(context.store.getActive).toBeCalled()
      expect(context.store.getActive).toHaveReturnedWith(context.store.getActive())

      context.store.getActive().messages.forEach((message: ChatMessage) => {
        expect(container.getByText(message.content)).toBeTruthy()
      })
    })
  })
})
