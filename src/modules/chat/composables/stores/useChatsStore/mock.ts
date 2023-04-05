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
        content: 'Hello world.',
        type: 'text',
        date: new Date().toISOString()
      }
    ],
    type: 'chat',
    isActive: false
  },
  {
    id: 2,
    others: [
      {
        username: 'John McCarty',
        profilePicture: 'https://picsum.photos/id/454/48'
      }
    ],
    messages: [
      {
        id: 3,
        content: 'Hello world.',
        type: 'text',
        date: new Date().toISOString()
      },
      {
        id: 4,
        content: 'Hello world.',
        type: 'text',
        date: new Date().toISOString()
      }
    ],
    type: 'chat',
    isActive: false
  }
]
