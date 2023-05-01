import { faker } from '@faker-js/faker'

import type { IChatFactory } from '@/modules/chat/contracts/IChatFactory'
import type { Chat, ChatMember, ChatMessage } from '@/modules/chat/types/Chat'

export class ChatFactory implements IChatFactory {
  createChat(): Chat {
    return {
      id: faker.datatype.number(),
      members: [],
      messages: [],
      type: 'chat',
      isActive: faker.datatype.boolean()
    }
  }

  createMember(): ChatMember {
    return {
      username: faker.name.fullName(),
      profilePicture: `https://picsum.photos/id/${faker.datatype.number({ min: 1, max: 255 })}/48`
    }
  }

  createMessage(): ChatMessage {
    return {
      id: faker.datatype.number(),
      content: faker.lorem.words(faker.datatype.number({ min: 3, max: 30 })),
      type: 'text',
      createdAt: faker.date.past() as unknown as string
    }
  }
}
