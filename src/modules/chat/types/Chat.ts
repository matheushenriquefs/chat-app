export type ChatMessage = {
  id: number
  content: string
  type: 'text'
  date: string
  seenAt?: string
}

type ChatMember = {
  username: string
  profilePicture: string
}

export type Chat = {
  id: number
  others: ChatMember[]
  messages: ChatMessage[]
  type: 'chat' | 'group'
  isActive: boolean
}
