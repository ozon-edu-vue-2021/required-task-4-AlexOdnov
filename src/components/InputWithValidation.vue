<template>
  <b-field
    v-bind="$attrs"
    :customClass="labelClass"
    :type="{ 'is-danger': error }"
    :message="error ? message : ''"
  >
    <b-input
      v-bind="$attrs"
      :value="value"
      @blur="validation(value)"
      @input="onInput"
    />
  </b-field>
</template>

<script>
export default {
  name: 'InputWithValidation',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: 'Форма не валидна',
    },
    rules: {
      type: String,
      required: true,
    },
    labelClass: {
      type: String,
      default: '',
    },
    validationId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: false,
      isValidateBefore: false,
    };
  },
  methods: {
    onInput(val) {
      if (this.isValidateBefore) {
        this.validation(val);
      }
      this.$emit('input', val);
    },
    validation(val) {
      const regex = new RegExp(this.rules);
      const error = !val || !regex.test(val);
      this.error = error;
      this.isValidateBefore = true;
      this.changeValidStatus(!error);
    },
    changeValidStatus(status) {
      this.$emit('changeValidStatus', {
        validationId: this.validationId,
        validationStatus: status,
      });
    },
  },
  created() {
    if (this.value) {
      this.validation(this.value);
    } else {
      this.changeValidStatus(false);
    }
  },
  beforeDestroy() {
    this.changeValidStatus(true);
  },
};
</script>

<style></style>
