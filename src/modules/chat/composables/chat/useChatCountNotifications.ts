import { ref, unref, isRef, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

import type { ChatMessage } from '@/modules/chat/types/Chat'

export const useChatCountNotifications = (
  messages: MaybeRef<ChatMessage[]>
): {
  counter: Ref<number>
} => {
  const counter = ref(0)

  function doFormat() {
    counter.value = 0

    const unrefed = unref(messages)

    counter.value = unrefed.reduce((accumulator, message) => {
      if (!message.seenAt) {
        return accumulator + 1
      }

      return accumulator
    }, 0)
  }

  if (isRef(messages)) {
    watchEffect(doFormat)
  } else {
    doFormat()
  }

  return { counter }
}
