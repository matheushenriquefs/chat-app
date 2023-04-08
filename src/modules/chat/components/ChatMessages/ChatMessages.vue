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
  <div>
    <component
      v-for="message of props.messages"
      :key="message.id"
      :is="templates[message.type]"
      :message="message"
    ></component>
  </div>
</template>
