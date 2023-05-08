<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

const message: Ref<string> = ref('')
const textAreaElement: Ref<HTMLTextAreaElement | null> = ref(null)
const cssVariables = {
  spacing: window.getComputedStyle(document.documentElement).getPropertyValue('--spacing'),
  lineHeight: window.getComputedStyle(document.documentElement).getPropertyValue('--line-height'),
  spacingVertical: window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--form-element-spacing-vertical'),
  borderWidth: window.getComputedStyle(document.documentElement).getPropertyValue('--border-width')
}

const setStyles = (): void => {
  if (textAreaElement.value) {
    const parentElement = textAreaElement.value.parentElement as HTMLLabelElement

    if (!message.value) {
      const style = `height: calc(
          1rem * ${cssVariables.lineHeight} + ${cssVariables.spacingVertical} * 2 + ${cssVariables.borderWidth} * 2
        ); max-height: calc(${cssVariables.spacing} * 8);`
      textAreaElement.value.setAttribute('style', style)
      parentElement.setAttribute('style', style)

      return
    }

    const style = `height: calc(${textAreaElement.value.scrollHeight}px + 2px); max-height: calc(${cssVariables.spacing} * 8);`
    textAreaElement.value.setAttribute('style', style)
    parentElement.setAttribute('style', style)
  }
}

const handleInput = (): void => setStyles()

onMounted(() => setStyles())
</script>

<template>
  <label for="message">
    <textarea
      id="message"
      ref="textAreaElement"
      v-model.trim="message"
      name="message"
      @input="handleInput"
    ></textarea>
  </label>
</template>

<style lang="scss" scoped>
label {
  margin-bottom: 0;
  margin-top: 0;
}

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
