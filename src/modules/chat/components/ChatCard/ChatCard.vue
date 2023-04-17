<script setup lang="ts">
import { computed } from 'vue'

import { VBadge } from '@/modules/core/components/VBadge'
import { useDateTimeFacade } from '@/modules/core/composables/facades/useDateTimeFacade'
import { useChatRecipient } from '@/modules/chat/composables/chat/useChatRecipient'
import { useChatLastMessage } from '@/modules/chat/composables/chat/useChatLastMessage'
import { useChatCountNotifications } from '@/modules/chat/composables/chat/useChatCountNotifications'
import type { Chat } from '@/modules/chat/types/Chat'

const props = defineProps<{
  chat: Chat
}>()

const DateTime = useDateTimeFacade()
const { recipient } = useChatRecipient(props.chat)
const { lastMessage } = useChatLastMessage(props.chat.messages)
const { counter: notificationsCounter } = useChatCountNotifications(props.chat.messages)

const date = computed<string>(() => {
  if (DateTime && lastMessage.value) {
    return DateTime.intlFormat(DateTime.parseJSON(lastMessage.value.createdAt), {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return ''
})
</script>

<template>
  <article>
    <div class="column-1">
      <img
        class="rounded-circle"
        :src="recipient.thumbnail"
        :alt="`${recipient.name}'s profile picture`"
        width="48"
        height="48"
      />
    </div>
    <div class="column-2">
      <div class="chat-card-header">
        <h6 class="mb-0">{{ recipient.name }}</h6>
        <small :class="['fs-xsmall', { 'is-primary': notificationsCounter }]">{{ date }}</small>
      </div>
      <div class="chat-card-body">
        <small :class="['text-truncate', { 'is-primary': notificationsCounter }]">{{
          lastMessage?.content
        }}</small>
        <VBadge
          v-show="notificationsCounter"
          :aria-label="`${notificationsCounter} of notifications.`"
        >
          {{ notificationsCounter }}
        </VBadge>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
article {
  column-gap: var(--spacing);
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  padding: calc(var(--spacing) * 0.75);
}

.column {
  &-1 {
    align-self: center;
    flex: 0 0 auto;
    max-width: 100%;
    width: fit-content;
  }

  &-2 {
    flex: 1 0 auto;
    max-width: 100%;
    width: 75%;
  }
}

.chat-card {
  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-body {
    display: flex;
    column-gap: var(--spacing);
    justify-content: space-between;
  }
}
</style>
