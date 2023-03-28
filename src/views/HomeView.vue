<script setup lang="ts">
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
  <main class="container-fluid">
    <div class="row">
      <div class="col-lg-4">
        <ul>
          <li>
            <ChatCard :message="message" />
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
