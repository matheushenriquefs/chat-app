<script setup lang="ts">
import type { Ref } from 'vue'
import { useTextareaAutosize } from '@vueuse/core'

type TypedEvent = {
  message: string
}

const cssVariables = {
  spacing: window.getComputedStyle(document.documentElement).getPropertyValue('--spacing')
}

const emit = defineEmits<{
  (e: 'typed', { message }: TypedEvent): void
}>()

const onResize = (textareaRef: Ref<HTMLTextAreaElement>) => {
  const style = `height: calc(${textarea.value.clientHeight}px + 4px); max-height: calc(${cssVariables.spacing} * 8);`
  const parentElement = textareaRef.value.parentElement as HTMLLabelElement
  textareaRef.value.setAttribute('style', style)
  parentElement.setAttribute('style', style)
}

const { textarea, input } = useTextareaAutosize({
  onResize: () => onResize(textarea)
})
</script>

<template>
  <label for="message">
    <textarea
      id="message"
      ref="textarea"
      v-model.trim="input"
      name="message"
      @input="() => emit('typed', { message: input })"
    ></textarea>
    <span class="visually-hidden">Type your message</span>
  </label>
</template>

<style lang="scss" scoped>
label {
  margin-bottom: 0;
  margin-top: 0;
}

textarea {
  margin-bottom: 0;
  margin-top: 0;
  padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
  resize: none;
}
</style>
