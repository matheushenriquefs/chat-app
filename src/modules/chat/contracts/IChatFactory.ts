import type { Chat, ChatMember, ChatMessage } from '@/modules/chat/types/Chat'

export interface IChatFactory {
  createChat(): Chat
  createMember(): ChatMember
  createMessage(): ChatMessage
}
