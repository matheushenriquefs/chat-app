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
    sender: {
      userId: 0
    },
    createdAt: ''
  })
})
</script>

<template>
  <p>{{ props.message.content }}</p>
</template>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
</style>
