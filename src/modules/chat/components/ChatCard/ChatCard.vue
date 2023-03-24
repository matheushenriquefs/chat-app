<template>
  <article class="row">
    <div class="col-3 pl-0">
      <img
        class="rounded-circle"
        src="https://picsum.photos/id/454/48"
        alt="John Doe's profile picture"
        width="48"
        height="48"
      />
    </div>
    <div class="col-9 pr-0 pl-0">
      <div class="chat-card-header">
        <h6 class="mb-0">John Doe</h6>
        <small class="fs-xsmall is-primary">7:50PM</small>
      </div>
      <div class="chat-card-body">
        <small class="text-truncate"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nisl et odio tincidunt
          imperdiet.</small
        >
        <small class="chat-card-body-notification is-bg-primary fs-xsmall rounded-circle">9</small>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.chat-card {
  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-body {
    display: flex;
    column-gap: var(--spacing);

    &-notification {
      align-items: center;
      color: var(--card-background-color);
      display: flex;
      height: calc(var(--spacing) * 1.5);
      justify-content: center;
      padding: calc(var(--spacing) * 0.75);
      width: calc(var(--spacing) * 1.5);
    }
  }
}
</style>
