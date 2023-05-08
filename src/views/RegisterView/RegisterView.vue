<script setup lang="ts">
/* eslint vuejs-accessibility/label-has-for: 0 */
import { ref } from 'vue'
import { useStepper } from '@vueuse/core'

const form = ref({
  termsAccepted: false
})

const stepper = useStepper({
  terms: {
    title: 'Terms of service',
    subtitle:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae aut recusandae ratione numquam aliquid natus iure.',
    isValid: () => true
  },
  'phone-number-verification': {
    title: 'Verify your phone number',
    subtitle:
      'Consequuntur, possimus, accusantium est sequi similique quidem iste veritatis ut, maxime a voluptates? Numquam quae repellat eius perferendis, quas in blanditiis excepturi.',
    isValid: () => true
  }
})

const handleSubmit = () => {
  if (stepper.current.value.isValid()) stepper.goToNext()
}
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Register</h1>
      <h2>{{ stepper.current.value.title }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-wrapper-inner">
          <fieldset v-if="stepper.isCurrent('terms')">
            <legend>
              {{ stepper.current.value.subtitle }}
            </legend>
            <label for="terms">
              Tap "Agree and continue" to accept the
              <a href="#" target="_blank">Terms of Service</a> and
              <a href="#" target="_blank">Privacy Policy</a>
            </label>
            <input id="terms" type="submit" name="terms" value="Agree and continue" />
          </fieldset>

          <fieldset v-if="stepper.isCurrent('phone-number-verification')">
            <legend>
              {{ stepper.current.value.subtitle }}
            </legend>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2,
legend,
label[for='terms'] {
  text-align: center;
}

label[for='terms'] {
  margin-bottom: calc(var(--spacing) * 2);
}

form {
  flex-grow: 1;
  margin-bottom: 0;
  position: relative;
}

form,
.container,
.form-wrapper,
.form-wrapper-inner {
  height: 100%;
}

.container {
  padding-top: calc(var(--spacing) * 2);
  padding-bottom: calc(var(--spacing) * 2);
}

.form-wrapper {
  display: flex;
  flex-direction: column;
}

.form-wrapper-inner {
  position: absolute;
}

fieldset {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
}

fieldset,
input:not([type='checkbox'], [type='radio']) {
  margin-bottom: 0;
}
</style>
