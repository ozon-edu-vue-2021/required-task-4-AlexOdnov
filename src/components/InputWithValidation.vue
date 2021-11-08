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
      @blur="validation"
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
    };
  },
  methods: {
    onInput(val) {
      this.$emit('input', val);
    },
    validation() {
      const regex = new RegExp(this.rules);
      const error = !this.value || !regex.test(this.value);
      this.error = error;
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
    this.changeValidStatus(false);
  },
  beforeDestroy() {
    this.changeValidStatus(true);
  },
};
</script>

<style></style>
