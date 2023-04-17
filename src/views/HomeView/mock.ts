import { mock as chatStoreMock } from '@/modules/chat/composables/stores/useChatsStore/mock'
import type { Chat } from '@/modules/chat/types/Chat'

export const mock: {
  settings: Record<number, Chat[]>
} = {
  settings: {
    1: [chatStoreMock[0], chatStoreMock[1]],
    2: [chatStoreMock[2]]
  }
}
