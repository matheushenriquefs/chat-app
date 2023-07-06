<script setup lang="ts">
import { RegisterForm } from '@/modules/auth/components/RegisterForm'
</script>

<template>
  <div class="container">
    <RegisterForm v-slot="props">
      <h1>Register</h1>
      <h2>{{ props.title }}</h2>
    </RegisterForm>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2 {
  text-align: center;
}

.container {
  height: 100%;
}

.container {
  padding-top: calc(var(--spacing) * 2);
  padding-bottom: calc(var(--spacing) * 2);
}
</style>
