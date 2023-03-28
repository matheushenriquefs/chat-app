<script setup lang="ts">
import { ChatLayout } from '@/modules/chat/components/ChatLayout'
import { ChatCard } from '@/modules/chat/components/ChatCard'

const message = {
  id: new Date().getTime(),
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nisl et odio tincidunt imperdiet.',
  type: 'text',
  date: new Date().toISOString()
}
</script>

<template>
  <ChatLayout>
    <template #column-1>
      <ul>
        <li>
          <ChatCard :message="message" />
        </li>
      </ul>
    </template>
  </ChatLayout>
</template>
