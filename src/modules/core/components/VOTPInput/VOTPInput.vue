<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

type VOTPInputProps = {
  id?: string
  name?: string
  length?: number
  placeholder?: string
  blurOnFilled?: boolean
}

export type FilledEvent = {
  otp: string
}

const otp: Ref<string[]> = ref([])
const container: Ref<HTMLDivElement | null> = ref(null)

const props = withDefaults(defineProps<VOTPInputProps>(), {
  id: 'otp-input',
  name: 'otp',
  length: 6,
  placeholder: '',
  blurOnFilled: false
})

const emit = defineEmits<{
  (e: 'filled', { otp }: FilledEvent): void
}>()

const keys = ['Tab', 'ArrowRight', 'ArrowLeft']
const isNumber = new RegExp(/\d/)

/**
 * Handles the switching of focus between one-time password inputs based on the specified index and direction.
 *
 * @param {number} index The index of the current input element.
 * @param {string} [direction = "next"] The direction of the switch, either "previous" or "next".
 *
 * @throws {Error} If an invalid index is provided or the container element is not found.
 */
const handleSwitch = (index: number, direction: 'previous' | 'next' = 'next') => {
  /**
   * Handle "Backspace" press on first input
   */
  if (index === 0 && direction === 'previous') {
    return
  }

  let child = index
  const isLastDigit = index === props.length - 1

  if (direction === 'next' && !isLastDigit) {
    child = index + 1
  }

  if (direction === 'previous') {
    child = index - 1
  }

  if (container.value) {
    const digitLabelElement = container.value.children.item(child)

    if (digitLabelElement) {
      const digitInputElement = digitLabelElement.querySelector('input') as HTMLInputElement
      digitInputElement.focus()
    }
  }
}

/**
 * Handles keyboard events for the one-time password inputs, including key validation, switching focus, and updating the "otp" ref value.
 *
 * @param {KeyboardEvent} event The keyboard event object.
 * @param {number} index The index of the current input element.
 *
 * @throws {Error} If an invalid key is pressed or an invalid index is provided.
 */
const handleKeyboard = (event: KeyboardEvent, index: number) => {
  if (!keys.includes(event.key)) {
    event.preventDefault()
  }

  if ((event.key === 'Backspace' && !otp.value[index]) || event.key === 'ArrowLeft') {
    handleSwitch(index, 'previous')
  }

  if (isNumber.test(event.key) || event.key === 'ArrowRight') {
    handleSwitch(index, 'next')
  }

  if (isNumber.test(event.key)) {
    otp.value[index] = event.key
  }

  if (event.key === 'Backspace') {
    otp.value[index] = ''
  }
}

const emitIsFilled = useDebounceFn(() => {
  emit('filled', { otp: otp.value.join('') })
}, 500)

/**
 * Handles the blur event when all the one-time password inputs are filled. It blurs the active input element.
 */
const handleBlurOnFilled = () => {
  if (document.activeElement && container.value) {
    for (const digitLabelElement of container.value.children) {
      const digitInputElement = digitLabelElement.querySelector('input') as HTMLInputElement

      if (document.activeElement === digitInputElement) {
        digitInputElement.blur()

        break
      }
    }
  }
}

watch(otp.value, (value) => {
  const isFilled = value.length === props.length && value.every((digit) => digit)

  if (isFilled) {
    props.blurOnFilled && handleBlurOnFilled()
  }

  emitIsFilled()
})
</script>

<template>
  <div ref="container" class="otp-input">
    <label v-for="(digit, index) in props.length" :key="index" :for="`${props.id}-${index}`">
      <input
        :id="`${props.id}-${index}`"
        v-model="otp[index]"
        :name="props.name"
        :placeholder="props.placeholder"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        maxlength="1"
        @keydown="(event) => handleKeyboard(event, index)"
      />
      <span class="visually-hidden">One-time password input digit {{ index + 1 }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
label {
  margin-bottom: auto;
}

input {
  max-width: calc(var(--spacing) * 3);
}

.otp-input {
  display: flex;
  justify-content: space-between;
}
</style>
