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
      :is="templates[message.type]"
      v-for="message of props.messages"
      :key="message.id"
      :message="message"
    ></component>
  </div>
</template>
