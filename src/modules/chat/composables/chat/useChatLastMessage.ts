import { ref, unref, isRef, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

import type { ChatMessage } from '@/modules/chat/types/Chat'

export const useChatLastMessage = (
  messages: MaybeRef<ChatMessage[]>
): {
  lastMessage: Ref<ChatMessage | null>
} => {
  const message: Ref<ChatMessage | null> = ref({
    id: 0,
    content: '',
    type: 'text' as 'text',
    createdAt: ''
  })

  function doFormat() {
    message.value = {
      id: 0,
      content: '',
      type: 'text',
      createdAt: ''
    }

    const unrefed = unref(messages)

    const reversedMessages = [...unrefed].reverse()

    reversedMessages.length ? (message.value = reversedMessages[0]) : (message.value = null)
  }

  if (isRef(messages)) {
    watchEffect(doFormat)
  } else {
    doFormat()
  }

  return { lastMessage: message }
}
