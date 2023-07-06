<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useEventListener, useVModel } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { useAsyncQuerySelector } from '@/modules/core/composables/elements/useAsyncQuerySelector'

type VDialogProps = {
  modelValue?: boolean
  aria: {
    labelledBy: string
    describedBy: string
  }
}

const props = withDefaults(defineProps<VDialogProps>(), {
  modelValue: false
})
const isOpen = ref(false)
const isMounted = ref(false)
const dialog: Ref<HTMLDialogElement | null> = ref(null)
const article: Ref<HTMLElement | null> = ref(null)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const data = useVModel(props, 'modelValue', emit)
const { activate, deactivate } = useFocusTrap(dialog)
const transitionDelay = 400

const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.cssText = 'visibility:hidden; overflow:scroll;'
  document.body.appendChild(outer)
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth
  outer.remove()

  return scrollbarWidth
}

const handleOpen = async () => {
  const isScrollbarVisible = document.body.scrollHeight > screen.height

  if (isScrollbarVisible) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`)
  }

  document.documentElement.classList.add('modal-is-open', 'modal-is-opening')

  if (dialog.value) {
    dialog.value.setAttribute('open', 'true')
    dialog.value.setAttribute('aria-modal', 'true')

    try {
      activate()
    } catch (error) {
      if (article.value) {
        const articleContent = await useAsyncQuerySelector('*', article.value)

        if (Array.isArray(articleContent) && articleContent.length) {
          activate()
        }
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      document.documentElement.classList.remove('modal-is-opening')
      isMounted.value = true
      resolve(undefined)
    }, transitionDelay)
  })
}

const handleClose = async () => {
  document.documentElement.classList.add('modal-is-closing')

  return new Promise((resolve) => {
    setTimeout(() => {
      document.documentElement.classList.remove('modal-is-open', 'modal-is-closing')
      document.documentElement.style.removeProperty('--scrollbar-width')

      if (dialog.value) {
        dialog.value.removeAttribute('open')
        dialog.value.removeAttribute('aria-modal')
        deactivate()
        isMounted.value = false
        resolve(undefined)
      }
    }, transitionDelay)
  })
}

useEventListener(document, 'keydown', async (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMounted.value) {
    event.preventDefault()
    await handleClose()
    data.value = false
  }
})

useEventListener(document, 'click', async (event: MouseEvent) => {
  if (isMounted.value && event.target === dialog.value) {
    await handleClose()
    data.value = false
  }
})

watch(
  () => [props.modelValue, dialog.value],
  async ([modelValue, dialog]) => {
    if (modelValue) {
      isOpen.value = true

      if (dialog && !isMounted.value) {
        await handleOpen()
      }

      return
    }

    if (dialog && isMounted.value) {
      await handleClose()
    }

    isOpen.value = false
  }
)
</script>

<template>
  <Teleport to="body">
    <dialog
      v-if="isOpen"
      ref="dialog"
      tabindex="-1"
      :aria-labelledby="props.aria.labelledBy"
      :aria-describedby="props.aria.describedBy"
    >
      <article ref="article">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </article>
    </dialog>
  </Teleport>
</template>
