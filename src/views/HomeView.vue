<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'

import { ChatLayout } from '@/modules/chat/components/ChatLayout'
import { ChatCard } from '@/modules/chat/components/ChatCard'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'

const router = useRouter()
const store = useChatsStore()

const handleNavigation = (chatId: number) => {
  store.updateById(chatId, { isActive: true })
  router.push('/chat')
}
</script>

<template>
  <ChatLayout>
    <template #column-1>
      <ul>
        <li v-for="chat of store.chats" :key="chat.id">
          <RouterLink class="unstyled" to="" @click.prevent="handleNavigation(chat.id)">
            <ChatCard :chat="chat" />
          </RouterLink>
        </li>
      </ul>
    </template>
  </ChatLayout>
</template>
