<script setup lang="ts">
import { ChatInput } from '@/modules/chat/components/ChatInput'

import { Send as SendIcon } from 'lucide-vue-next'
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

    <div class="chat-body">
      <div class="chat-body-messages">
        <p>Message</p>
      </div>
    </div>
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

.chat-body {
  flex-grow: 1;
  height: 100%;
  order: 2;
  position: relative;
  width: 100%;

  &-messages {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: var(--spacing);
    position: absolute;
    width: 100%;
  }
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
