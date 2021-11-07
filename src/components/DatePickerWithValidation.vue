<template>
  <validation-provider
    mode="passive"
    :rules="rules"
    v-slot="{ errors }"
    :vid="vid"
    slim
  >
    <b-field
      v-bind="$attrs"
      :customClass="labelClass"
      :type="{ 'is-danger': errors[0] }"
      :message="errors"
    >
      <b-datepicker v-bind="$attrs" :value="value" @input="onInput" />
    </b-field>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'DatePickerWithValidation',
  inheritAttrs: false,
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      required: true,
    },
    vid: {
      type: String,
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style></style>
