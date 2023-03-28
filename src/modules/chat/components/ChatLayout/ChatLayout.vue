<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-lg-4">
        <slot name="column-1"></slot>
      </div>
      <div class="col-lg-8">
        <slot name="column-2"></slot>
      </div>
    </div>
  </main>
</template>
