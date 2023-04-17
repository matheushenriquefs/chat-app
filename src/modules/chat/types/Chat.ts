export type ChatMessage = {
  id: number
  content: string
  type: 'text'
  createdAt: string
  seenAt?: string
}

export type ChatMember = {
  username: string
  profilePicture: string
}

export type Chat = {
  id: number
  name?: string
  thumbnail?: string
  members: ChatMember[]
  messages: ChatMessage[]
  type: 'chat' | 'group'
  isActive: boolean
}

export type ChatRecipient = {
  name: string
  thumbnail: string
}

export type HttpChat = Omit<Chat, 'isActive'>
