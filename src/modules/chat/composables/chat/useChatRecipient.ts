import { ref, unref, isRef, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

import type { Chat, ChatRecipient } from '@/modules/chat/types/Chat'

export const useChatRecipient = (
  chat: MaybeRef<{
    type: Chat['type']
    members: Chat['members']
  } | null>
): {
  recipient: Ref<ChatRecipient>
} => {
  const recipient = ref({
    name: '',
    thumbnail: ''
  })

  function doFormat() {
    recipient.value = {
      name: '',
      thumbnail: ''
    }

    const unrefed = unref(chat)

    if (unrefed) {
      if (unrefed.type === 'group') {
        recipient.value = {
          name: 'A group',
          thumbnail: 'https://picsum.photos/id/870/48'
        }
      }

      recipient.value = {
        name: unrefed.members[0].username || '',
        thumbnail: unrefed.members[0].profilePicture || ''
      }
    }
  }

  if (isRef(chat)) {
    watchEffect(doFormat)
  } else {
    doFormat()
  }

  return { recipient }
}
