import type { Chat } from '@/modules/chat/types/Chat'

export const mock: Chat[] = [
  {
    id: 1,
    members: [
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
        date: '2023-04-14T15:10:10.038Z'
      },
      {
        id: 2,
        content: 'Hello world.',
        type: 'text',
        date: '2023-04-14T15:11:10.038Z'
      }
    ],
    type: 'chat',
    isActive: false
  },
  {
    id: 2,
    members: [
      {
        username: 'John McCarty',
        profilePicture: 'https://picsum.photos/id/455/48'
      }
    ],
    messages: [
      {
        id: 3,
        content: 'Hello world.',
        type: 'text',
        date: '2023-04-14T15:12:10.038Z'
      },
      {
        id: 4,
        content: 'World Hello.',
        type: 'text',
        date: '2023-04-14T15:12:30.038Z'
      }
    ],
    type: 'chat',
    isActive: false
  }
]
