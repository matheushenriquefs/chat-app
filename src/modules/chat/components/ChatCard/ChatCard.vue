<script setup lang="ts">
import { computed } from 'vue'

import { useDateTimeFacade } from '@/modules/core/composables/facades/useDateTimeFacade'
import { useChatRecipient } from '@/modules/chat/composables/chat/useChatRecipient'
import type { Chat, ChatMessage } from '@/modules/chat/types/Chat'

const props = defineProps<{
  chat: Chat
}>()

const DateTime = useDateTimeFacade()
const { recipient } = useChatRecipient(props.chat)

const lastUnseenMessage = computed<ChatMessage | null>(() => {
  const reversedMessages = [...props.chat.messages].reverse()
  const message = reversedMessages.find((message) => !message.seenAt)

  return message ? message : null
})

const numberOfNotifications = computed<number>(() => {
  return props.chat.messages.reduce((accumulator, message) => {
    if (!message.seenAt) {
      return accumulator + 1
    }

    return accumulator
  }, 0)
})

const date = computed<string>(() => {
  if (DateTime && lastUnseenMessage.value) {
    return DateTime.intlFormat(DateTime.parseJSON(lastUnseenMessage.value.date), {
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
        <small class="fs-xsmall is-primary">{{ date }}</small>
      </div>
      <div class="chat-card-body">
        <small class="text-truncate">{{ lastUnseenMessage?.content }}</small>
        <small class="chat-card-body-notification is-bg-primary fs-xsmall rounded-circle">{{
          numberOfNotifications
        }}</small>
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

    &-notification {
      align-items: center;
      color: var(--card-background-color);
      display: flex;
      height: calc(var(--spacing) * 1.5);
      justify-content: center;
      padding: calc(var(--spacing) * 0.75);
      width: calc(var(--spacing) * 1.5);
    }
  }
}
</style>
