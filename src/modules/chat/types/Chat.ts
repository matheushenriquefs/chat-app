export type ChatMessage = {
  id: number
  content: string
  type: 'text'
  sender: {
    userId: number
  }
  createdAt: string
  seenAt?: string
}

export type ChatMember = {
  username: string
  profilePicture: string
}

export type Chat = {
  id: number
  members: ChatMember[]
  messages: ChatMessage[]
  type: 'chat' | 'group'
  isActive: boolean
}

export type GroupChat = Chat & {
  name: string
  thumbnail: string
  description: string
}

export type ChatRecipient = {
  name: string
  thumbnail: string
}

export type HttpChat = Omit<Chat, 'isActive'>
