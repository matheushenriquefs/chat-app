<script setup lang="ts">
import type { ChatMessage } from '@/modules/chat/types/Chat'

type ChatTextMessageProps = {
  message: ChatMessage
}

const props = withDefaults(defineProps<ChatTextMessageProps>(), {
  message: () => ({
    id: 0,
    content: '',
    type: 'text',
    date: ''
  })
})
</script>

<template>
  <p>{{ props.message.content }}</p>
</template>
