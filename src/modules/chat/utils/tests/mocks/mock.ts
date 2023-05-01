import { faker } from '@faker-js/faker'

import { ChatFactory } from '@/modules/chat/utils/tests/factories/ChatFactory'
import type { Chat } from '@/modules/chat/types/Chat'

export const createMockedChats = (): Record<number, Chat[]> => {
  const chatFactory = new ChatFactory()
  const mock: Record<number, Chat[]> = {
    1: [],
    2: []
  }

  mock[1] = [...Array(1)].map(() => {
    const chat = chatFactory.createChat()
    chat.members = [chatFactory.createMember()]
    chat.messages = [...Array(2)].map(() => ({
      ...chatFactory.createMessage(),
      seenAt: faker.date.past() as unknown as string
    }))

    return chat
  })

  mock[2] = [...Array(2)].map(() => {
    const chat = chatFactory.createChat()
    chat.members = [chatFactory.createMember()]
    chat.messages = [...Array(2)].map(() => chatFactory.createMessage())

    return chat
  })

  return mock
}
