<script setup lang="ts">
import { ChatTextMessage } from '@/modules/chat/components/ChatTextMessage'
import type { ChatMessage } from '@/modules/chat/types/Chat'

const props = defineProps<{
  messages: ChatMessage[]
}>()

const templates = {
  text: ChatTextMessage
}
</script>

<template>
  <div class="chat-messages">
    <div v-for="message of props.messages" :key="message.id" class="chat-message">
      <component
        :is="templates[message.type]"
        :message="message"
        class="chat-message-content"
      ></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  &-messages {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing);
  }

  &-message {
    border-radius: calc(var(--spacing) * 0.375);
    padding: calc(var(--spacing) * 0.5);
    max-width: 95%;
    width: fit-content;

    & > .chat-message-content {
      color: var(--primary-inverse);
    }
  }
}

@media screen and (min-width: 992px) {
  .chat-message {
    max-width: 85%;
  }
}

@media screen and (min-width: 1200px) {
  .chat-message {
    max-width: 65%;
  }
}
</style>
