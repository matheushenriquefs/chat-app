<template>
  <div class="chat-body">
    <div class="chat-body-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-body {
  flex-grow: 1;
  height: 100%;
  order: 2;
  position: relative;
  width: 100%;

  &-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: var(--spacing);
    position: absolute;
    width: 100%;
  }
}
</style>
