<script setup lang="ts">
import { ChatLayout } from '@/modules/chat/components/ChatLayout'
import { ChatCard } from '@/modules/chat/components/ChatCard'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'

const store = useChatsStore()
</script>

<template>
  <ChatLayout>
    <template #column-1>
      <ul>
        <li v-for="chat of store.chats" :key="chat.id">
          <ChatCard :chat="chat" />
        </li>
      </ul>
    </template>
  </ChatLayout>
</template>
