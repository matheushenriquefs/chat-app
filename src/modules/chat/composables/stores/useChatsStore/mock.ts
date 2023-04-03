import type { Chat } from '@/modules/chat/types/Chat'

export const mock: Chat[] = [
  {
    id: 1,
    others: [
      {
        username: 'John Doe',
        profilePicture: 'https://picsum.photos/id/454/48'
      }
    ],
    messages: [
      {
        id: 1,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nisl et odio tincidunt imperdiet.',
        type: 'text',
        date: new Date().toISOString()
      },
      {
        id: 2,
        content:
          'Hello world.',
        type: 'text',
        date: new Date().toISOString()
      }
    ],
    type: 'chat'
  }
]
