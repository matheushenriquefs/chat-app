<script setup lang="ts">
/* eslint vuejs-accessibility/label-has-for: 0 */
import { onMounted } from 'vue'
import { computedEager } from '@vueuse/core'

import { useAsyncQuerySelector } from '@/modules/core/composables/elements/useAsyncQuerySelector'

type VPhoneNumberInputProps = {
  id?: string
  name?: string
}

const props = withDefaults(defineProps<VPhoneNumberInputProps>(), {
  id: 'phone-number-input',
  name: 'phone-number'
})
const labelId = computedEager(() => `${props.id}-label`)

const inputOptions = {
  autocomplete: 'on',
  autofocus: false,
  maxlength: 25,
  placeholder: 'Enter a phone number',
  readonly: false,
  required: false,
  showDialCode: false,
  styleClasses: '',
  tabindex: 0,
  type: 'tel'
}

/**
 * Sets the "style" of an element to adjust its width and opacity.
 *
 * @param {Element} element The element to set the style for.
 * @param {HTMLDivElement} intlTelInputElement The reference to the "HTMLDivElement" representing the input element.
 */
const setStyle = (element: Element, intlTelInputElement: HTMLDivElement) => {
  if (!element.hasAttribute('style')) {
    element.setAttribute('style', `width: ${intlTelInputElement.clientWidth + 1}px; opacity: 1;`)
  }
}

/**
 * Sets the "tabindex", "aria-labelledby" of an element to make it as accessible as possible.
 *
 * @param {Element} element The element to set the attributes for.
 */
const setAttributes = (element: Element) => {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', `0`)
  }

  if (!element.hasAttribute('aria-labelledby')) {
    element.setAttribute('aria-labelledby', labelId.value)
  }
}

/**
 * Handles the "open" event from "VueTelInput" by adjusting the style of the dropdown list element and emitting the "open" event.
 *
 * @throws {Error} - If the dropdown list element cannot be found within the target element/document.
 */
const handleOnOpen = async () => {
  const intlTelInputElement = document.querySelector('.vue-tel-input') as HTMLDivElement
  const dropdownListElement = await useAsyncQuerySelector(
    '.vti__dropdown-list',
    intlTelInputElement
  )

  if (Array.isArray(dropdownListElement)) {
    dropdownListElement.forEach((element) => {
      setStyle(element, intlTelInputElement)
      setAttributes(element)
    })

    return
  }

  setStyle(dropdownListElement, intlTelInputElement)
  setAttributes(dropdownListElement)
}

onMounted(async () => {
  const intlTelInputElement = document.querySelector('.vue-tel-input') as HTMLDivElement
  const inputElement = await useAsyncQuerySelector('.vti__input', intlTelInputElement)

  if (!Array.isArray(inputElement) && !inputElement.getAttribute('aria-labelledby')) {
    inputElement.setAttribute('aria-labelledby', labelId.value)
  }
})
</script>

<template>
  <div class="phone-number-input">
    <label :id="labelId">Phone number</label>
    <vue-tel-input
      :input-options="{
        ...inputOptions,
        'aria-describedby': labelId,
        id: props.id,
        name: props.name
      }"
      @open="handleOnOpen"
    ></vue-tel-input>
  </div>
</template>

<style lang="scss" scoped>
.phone-number-input {
  margin-bottom: auto;
}

.vue-tel-input {
  border: var(--border-width) solid var(--form-element-border-color);
  border-radius: var(--border-radius);
}

:deep(.vti__input) {
  border: none;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 0;
}

:deep(.vti__dropdown) {
  background-color: var(--form-element-background-color);
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  padding: calc(var(--spacing) * 0.5);

  &.open {
    .vti__dropdown-list {
      box-shadow: 0 0 0 var(--outline-width) var(--form-element-focus-color);
    }
  }
}

:deep(.vti__selection) {
  background-color: var(--form-element-background-color);
}

:deep(.vti__dropdown-list) {
  background-color: var(--white);
  border: solid var(--form-element-border-color);
  border-radius: var(--border-radius);
  border-width: var(--border-width) var(--border-width) 0px var(--border-width);
  color: var(--black);
  transition: opacity 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 0;
  overflow-y: auto;
  width: auto;

  &.below {
    top: calc(var(--spacing) * 3.25);
  }

  @media only screen and (prefers-color-scheme: dark) {
    background-color: var(--form-element-background-color);
    color: var(--white);
  }
}

:deep(.vti__dropdown-item) {
  margin-bottom: calc(var(--spacing) * 0.5);
  padding: calc(var(--spacing) * 0.25) calc(var(--spacing) * 0.5);

  strong {
    font-weight: normal;
  }

  &.highlighted {
    background-color: var(--primary);
  }
}
</style>
