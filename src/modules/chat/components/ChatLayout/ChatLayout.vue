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
  <main class="container-fluid">
    <div class="row">
      <div class="col-lg-4 pl-0 pr-0" v-if="props.visibility.column1">
        <slot name="column-1"></slot>
      </div>
      <div class="col-lg-8 pl-0 pr-0" v-if="props.visibility.column2">
        <slot name="column-2"></slot>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main,
.row {
  height: 100%;
}

.row {
  --bs-gutter-x: calc(var(--spacing) * 2);
}
</style>
