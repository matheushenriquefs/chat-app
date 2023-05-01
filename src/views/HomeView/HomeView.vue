<script setup lang="ts">
import { ChatLayout } from '@/modules/chat/components/ChatLayout'
import { ChatCardList } from '@/modules/chat/components/ChatCardList'
</script>

<template>
  <ChatLayout>
    <template #column-1>
      <ChatCardList />
    </template>
  </ChatLayout>
</template>
