<script setup lang="ts">
type VBadgeProps = {
  variant?: 'primary'
}

const props = withDefaults(defineProps<VBadgeProps>(), {
  variant: 'primary'
})
</script>

<template>
  <span
    role="status"
    aria-atomic="true"
    aria-live="polite"
    :class="['rounded-circle', 'fs-xsmall', `is-bg-${props.variant}`]"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
span {
  align-items: center;
  display: inline-flex;
  height: calc(var(--spacing) * 1.5);
  justify-content: center;
  line-height: 1;
  padding: calc(var(--spacing) * 0.75);
  vertical-align: baseline;
  width: calc(var(--spacing) * 1.5);
  white-space: nowrap;
}

.is-bg {
  &-primary {
    color: var(--card-background-color);
  }
}
</style>
