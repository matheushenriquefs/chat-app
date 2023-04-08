<script setup lang="ts">
import { computed, ref, watch, onBeforeMount } from 'vue'
import { watchOnce } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { Send as SendIcon } from 'lucide-vue-next'

import { ChatBody } from '@/modules/chat/components/ChatBody'
import { ChatMessages } from '@/modules/chat/components/ChatMessages'
import { ChatInput } from '@/modules/chat/components/ChatInput'
import { useChatsStore } from '@/modules/chat/composables/stores/useChatsStore'
import type { Chat } from '@/modules/chat/types/Chat'

type ChatParams = Omit<Chat, 'others' | 'messages' | 'type'>

const isLoading = ref(true)
const store = useChatsStore()
const { lastActiveChatId } = storeToRefs(store)
const chat = computed<Chat | null>(() => store.getActiveChat())

const handleSetIsActive = (chats: ChatParams[]) => {
  if (chats.length > 1) {
    store.$patch(() => {
      chats.forEach((chat) => {
        if (chat.id) {
          store.setIsActive(chat.id, chat.isActive)
        }
      })
    })

    return
  }

  if (chats.length === 1) {
    const [chat] = chats

    if (chat.id) {
      store.setIsActive(chat.id, chat.isActive)
    }
  }
}

/**
 * Set isActive flag when user navigates from chats list to chat page.
 */
onBeforeMount(() => {
  isLoading.value = true
  handleSetIsActive([{ id: lastActiveChatId.value, isActive: true }])
  setTimeout(() => (isLoading.value = false), 500)
})

/**
 * Set isActive flag when user reloads chat page.
 */
watchOnce(
  () => store.chats,
  () => {
    isLoading.value = true
    handleSetIsActive([{ id: store.lastActiveChatId, isActive: true }])
    setTimeout(() => (isLoading.value = false), 500)
  }
)

/**
 * Set isActive flag when user switches between chats by clicking on a chats list's item.
 */
watch(lastActiveChatId, (newChatId, oldChatId) => {
  handleSetIsActive([
    { id: oldChatId, isActive: false },
    { id: newChatId, isActive: true }
  ])
})
</script>

<template>
  <section>
    <header>
      <div class="column-1">
        <img
          class="rounded-circle"
          src="https://picsum.photos/id/454/40"
          alt="John Doe's profile picture"
          width="40"
          height="40"
        />
      </div>
      <div class="column-2">
        <div>
          <h6 class="mb-0">John Doe</h6>
          <small class="fs-xsmall">John Dee, Ernest Willow</small>
        </div>
      </div>
    </header>
    <ChatBody>
      <div v-show="isLoading" class="loading-lg" :aria-busy="isLoading"></div>
      <ChatMessages v-show="!isLoading" :messages="chat?.messages ? chat.messages : []" />
    </ChatBody>
    <footer>
      <form>
        <ChatInput />
        <button>
          <SendIcon />
        </button>
      </form>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 0;
}

header {
  background-color: var(--card-background-color);
  column-gap: var(--spacing);
  display: flex;
  order: 1;
  padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 0.75);
}

footer {
  background-color: var(--card-background-color);
  order: 3;
  padding: calc(var(--spacing) * 0.75);
}

form {
  align-items: flex-end;
  column-gap: var(--spacing);
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 0;

  label {
    flex-grow: 1;
  }

  button {
    height: calc(var(--spacing) * 3.125);
    margin-bottom: 0;
    padding: calc(var(--spacing) * 0.75);
    width: auto;
  }
}

.loading-lg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.column {
  &-1 {
    align-self: center;
    flex: 0 0 auto;
    max-width: 100%;
    width: fit-content;
  }

  &-2 {
    flex: 1 0 auto;
    max-width: 100%;
    width: 75%;
  }
}
</style>
