<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'

import { ChatCard } from '@/modules/chat/components/ChatCard'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'

const router = useRouter()
const store = useChatsStore()

const handleNavigation = (chatId: number) => {
  store.setIsActive(chatId, true)
  router.push('/chat')
}
</script>

<template>
  <ul>
    <li v-for="chat of store.chats" :key="chat.id">
      <RouterLink class="unstyled" to="/chat" @click.prevent="handleNavigation(chat.id)">
        <ChatCard :chat="chat" />
      </RouterLink>
      <hr role="separator" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
li {
  margin-bottom: 0;
}

hr {
  margin-bottom: 0;
  margin-top: 0;
}
</style>
