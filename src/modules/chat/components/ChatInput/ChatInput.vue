<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const message: Ref<string> = ref('')
const cssVariables = {
  spacing: window.getComputedStyle(document.documentElement).getPropertyValue('--spacing'),
  lineHeight: window.getComputedStyle(document.documentElement).getPropertyValue('--line-height'),
  spacingVertical: window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--form-element-spacing-vertical'),
  borderWidth: window.getComputedStyle(document.documentElement).getPropertyValue('--border-width')
}

const handleInput = (event: Event) => {
  const element = event.target as HTMLTextAreaElement

  if (!message.value) {
    element.setAttribute(
      'style',
      `height: calc(
    1rem * ${cssVariables.lineHeight} + ${cssVariables.spacingVertical} * 2 + ${cssVariables.borderWidth} * 2
  ); max-height: calc(${cssVariables.spacing} * 8);`
    )
  }

  element.setAttribute(
    'style',
    `height: ${element.scrollHeight}px; max-height: calc(${cssVariables.spacing} * 8);`
  )
}
</script>

<template>
  <label>
    <textarea name="message" v-model.trim="message" @input="handleInput"></textarea>
  </label>
</template>

<style lang="scss" scoped>
textarea {
  height: calc(
    1rem * var(--line-height) + var(--form-element-spacing-vertical) * 2 + var(--border-width) * 2
  );
  margin-bottom: 0;
  margin-top: 0;
  padding: var(--form-element-spacing-vertical) var(--form-element-spacing-horizontal);
  resize: none;
}
</style>
