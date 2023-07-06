<script setup lang="ts">
/* eslint vuejs-accessibility/label-has-for: 0 */
import { ref } from 'vue'
import { useStepper, computedEager } from '@vueuse/core'

import { VPhoneNumberInput } from '@/modules/core/components/VPhoneNumberInput'
import { VOTPInput } from '@/modules/core/components/VOTPInput'
import { VDialog } from '@/modules/core/components/VDialog'
import type { FilledEvent } from '@/modules/core/components/VOTPInput'

const form = ref({
  termsAccepted: false,
  phoneNumber: '',
  verificationCode: ''
})
const isDialogOpen = ref(false)

const stepper = useStepper({
  terms: {
    title: 'Terms of service',
    subtitle:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae aut recusandae ratione numquam aliquid natus iure.',
    isValid: () => true
  },
  phoneNumber: {
    title: 'Enter your phone number',
    subtitle: 'Chat app will send a SMS message to verify your phone phunber.',
    isValid: () => !!form.value.phoneNumber
  },
  verificationCode: {
    title: 'Verify',
    subtitle: `Waiting to automatically detect a SMS, sent to`,
    isValid: () => !!form.value.verificationCode && form.value.verificationCode.length === 6
  }
})

const title = computedEager(() => {
  if (stepper.isCurrent('verificationCode')) {
    return `${stepper.current.value.title} ${form.value.phoneNumber}`
  }

  return stepper.current.value.title
})

const subtitle = computedEager(() => {
  if (stepper.isCurrent('verificationCode')) {
    return `${stepper.current.value.subtitle} ${form.value.phoneNumber}.`
  }

  return stepper.current.value.subtitle
})

const handleFilled = (event: FilledEvent) => {
  form.value.verificationCode = event.value
}

const handleSubmit = () => {
  if (stepper.current.value.isValid()) stepper.goToNext()
}
</script>

<template>
  <div class="form-wrapper">
    <slot :stepper="stepper" :title="title"></slot>
    <form @submit.prevent="handleSubmit">
      <div class="form-wrapper-inner">
        <fieldset v-if="stepper.isCurrent('terms')" class="terms-fieldset">
          <legend>
            {{ subtitle }}
          </legend>
          <label for="terms-input">
            Tap "Agree and continue" to accept the
            <a href="#" target="_blank">Terms of Service</a> and
            <a href="#" target="_blank">Privacy Policy</a>
          </label>
          <input id="terms-input" type="submit" name="terms" value="Agree and continue" />
        </fieldset>

        <fieldset v-if="stepper.isCurrent('phoneNumber')" class="phone-number-fieldset">
          <legend>
            {{ subtitle }}
          </legend>
          <VPhoneNumberInput v-model="form.phoneNumber" />
          <input
            type="submit"
            value="Next"
            :disabled="!stepper.current.value.isValid()"
            :aria-disabled="!stepper.current.value.isValid()"
          />
        </fieldset>

        <fieldset v-if="stepper.isCurrent('verificationCode')" class="verification-code-fieldset">
          <legend>
            {{ subtitle }}
            <a
              href="#"
              target="_blank"
              role="button"
              class="unstyled"
              @click.prevent="isDialogOpen = true"
              >Wrong number?</a
            >
          </legend>
          <VOTPInput id="verification-code-input" blur-on-filled @filled="handleFilled" />
          <input
            type="submit"
            name="verification-code"
            value="Next"
            :disabled="!stepper.current.value.isValid()"
            :aria-disabled="!stepper.current.value.isValid()"
          />
        </fieldset>
      </div>
    </form>
    <VDialog
      v-model="isDialogOpen"
      :aria="{
        labelledBy: 'confirm-title',
        describedBy: 'confirm-description'
      }"
    >
      <template #body>
        <h3 id="confirm-title">Confirm your action!</h3>
        <p id="confirm-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt laboriosam cumque
          aspernatur recusandae, itaque, voluptate consequuntur vero est quam dignissimos
          perspiciatis, dolores repudiandae quod voluptas eum modi tempora aut? Excepturi?
        </p>
      </template>
      <template #footer>
        <footer>
          <a href="#confirm" role="button" @click.prevent="isDialogOpen = false">Confirm</a>
          <a href="#cancel" role="button" class="secondary" @click.prevent="isDialogOpen = false"
            >Cancel</a
          >
        </footer>
      </template>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
label[for='terms-input'] {
  margin-bottom: calc(var(--spacing) * 2);
}

form {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin-bottom: 0;
  position: relative;
}

fieldset {
  display: flex;
  flex-direction: column;
  height: 100%;
}

a.unstyled {
  --background-color: transparent;
  background-color: var(--background-color);
  color: var(--primary);
  outline: none;
  text-decoration: underline;
  transition: background-color var(--transition), color var(--transition);
}

fieldset,
input:not([type='checkbox'], [type='radio']) {
  margin-bottom: 0;
  margin-top: 0;
}

form,
.form-wrapper,
.form-wrapper-inner {
  height: 100%;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
}

.form-wrapper-inner {
  position: absolute;
  width: 100%;
}

.terms-fieldset {
  justify-content: flex-end;
}

.phone-number-fieldset legend,
.verification-code-fieldset legend {
  margin-bottom: var(--spacing);
}

.otp-input {
  margin-bottom: auto;
}

@media screen and (min-width: 768px) {
  .form-wrapper {
    margin: 0 auto;
    max-width: calc(var(--spacing) * 32);
  }
}
</style>
