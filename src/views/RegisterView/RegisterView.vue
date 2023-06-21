<script setup lang="ts">
/* eslint vuejs-accessibility/label-has-for: 0 */
import { ref } from 'vue'
import { useStepper } from '@vueuse/core'

import { VPhoneNumberInput } from '@/modules/core/components/VPhoneNumberInput'
import { VOTPInput } from '@/modules/core/components/VOTPInput'

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
  'phone-number': {
    title: 'Verify your phone number',
    subtitle: 'Consequuntur, possimus, accusantium est sequi similique quidem iste',
    isValid: () => true
  },
  verification: {
    title: 'Enter your verification code',
    subtitle: 'Consequuntur, possimus, accusantium est sequi similique quidem iste',
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
          <fieldset v-if="stepper.isCurrent('terms')" class="terms-fieldset">
            <legend>
              {{ stepper.current.value.subtitle }}
            </legend>
            <label for="terms-input">
              Tap "Agree and continue" to accept the
              <a href="#" target="_blank">Terms of Service</a> and
              <a href="#" target="_blank">Privacy Policy</a>
            </label>
            <input id="terms-input" type="submit" name="terms" value="Agree and continue" />
          </fieldset>

          <fieldset v-if="stepper.isCurrent('phone-number')" class="phone-number-fieldset">
            <legend>
              {{ stepper.current.value.subtitle }}
            </legend>
            <VPhoneNumberInput />
            <input type="submit" value="Next" />
          </fieldset>

          <fieldset v-if="stepper.isCurrent('verification')" class="verification-fieldset">
            <legend>
              {{ stepper.current.value.subtitle }}
            </legend>
            <VOTPInput
              id="verification-input"
              blur-on-filled
              @filled="(event) => console.log('event', event)"
            />
            <input type="submit" name="verification" value="Next" />
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
label[for='terms-input'] {
  text-align: center;
}

label[for='terms-input'] {
  margin-bottom: calc(var(--spacing) * 2);
}

form {
  flex-grow: 1;
  margin-bottom: 0;
  position: relative;
}

fieldset {
  display: flex;
  flex-direction: column;
  height: 100%;
}

fieldset,
input:not([type='checkbox'], [type='radio']) {
  margin-bottom: 0;
  margin-top: 0;
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

.terms-fieldset {
  justify-content: flex-end;
}

.phone-number-fieldset legend,
.verification-fieldset legend {
  margin-bottom: var(--spacing);
}

.otp-input {
  margin-bottom: auto;
}
</style>
