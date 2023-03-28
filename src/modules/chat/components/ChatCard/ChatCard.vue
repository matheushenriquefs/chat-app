<script setup lang="ts">
import { computed } from 'vue'
import { useDateTimeFacade } from '@/modules/core/composables/facades/useDateTimeFacade'

const props = defineProps<{
  message: {
    id: number
    content: string
    type: string
    date: string
  }
}>()

const DateTime = useDateTimeFacade()

const date = computed<string>(() => {
  if (DateTime) {
    return DateTime.intlFormat(DateTime.parseJSON(props.message.date), {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return ''
})
</script>

<template>
  <article class="">
    <div class="column-1">
      <img
        class="rounded-circle"
        src="https://picsum.photos/id/454/48"
        alt="John Doe's profile picture"
        width="48"
        height="48"
      />
    </div>
    <div class="column-2">
      <div class="chat-card-header">
        <h6 class="mb-0">John Doe</h6>
        <small class="fs-xsmall is-primary">{{ date }}</small>
      </div>
      <div class="chat-card-body">
        <small class="text-truncate">{{ props.message.content }}</small>
        <small class="chat-card-body-notification is-bg-primary fs-xsmall rounded-circle">9</small>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
article {
  column-gap: var(--spacing);
  display: flex;
  padding: calc(var(--spacing) * 0.75);
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

.chat-card {
  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-body {
    display: flex;
    column-gap: var(--spacing);

    &-notification {
      align-items: center;
      color: var(--card-background-color);
      display: flex;
      height: calc(var(--spacing) * 1.5);
      justify-content: center;
      padding: calc(var(--spacing) * 0.75);
      width: calc(var(--spacing) * 1.5);
    }
  }
}
</style>
