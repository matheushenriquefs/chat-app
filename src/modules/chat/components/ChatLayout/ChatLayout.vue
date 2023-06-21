<script setup lang="ts">
type ChatLayoutProps = {
  visibility?: {
    column1: boolean
    column2: boolean
  }
}

const props = withDefaults(defineProps<ChatLayoutProps>(), {
  visibility: () => ({
    column1: true,
    column2: true
  })
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div v-if="props.visibility.column1" class="col-lg-4 pl-0 pr-0">
        <slot name="column-1"></slot>
      </div>
      <div v-if="props.visibility.column2" class="col-lg-8 pl-0 pr-0">
        <slot name="column-2"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid,
.row {
  height: 100%;
}

.row {
  --bs-gutter-x: calc(var(--spacing) * 2);
}
</style>
