<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import type { Ref } from 'vue'

import { ChatLayout } from '@/modules/chat/components/ChatLayout'
import { ChatContainer } from '@/modules/chat/components/ChatContainer'
import { useBreakpoints } from '@/modules/core/composables/browser/useBreakpoints'

const breakpoints = useBreakpoints()
const visibility: Ref<{ column1: boolean; column2: boolean } | undefined> = ref(undefined)

onBeforeMount(() => {
  visibility.value = {
    column1: breakpoints.greaterOrEqual('lg').value ? true : false,
    column2: true
  }
})

watch(breakpoints.greaterOrEqual('lg'), (value) => {
  if (visibility.value) {
    visibility.value.column1 = value
  }
})
</script>

<template>
  <ChatLayout :visibility="visibility">
    <template #column-1>
      <ul>
        <li>
          <p>Chat view</p>
        </li>
      </ul>
    </template>
    <template #column-2>
      <ChatContainer />
    </template>
  </ChatLayout>
</template>
