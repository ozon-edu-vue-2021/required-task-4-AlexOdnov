<template>
  <b-field
    v-bind="$attrs"
    :customClass="labelClass"
    :type="{ 'is-danger': error }"
    :message="error ? message : ''"
  >
    <b-datepicker
      v-bind="$attrs"
      :value="value"
      @blur="validation"
      @input="onInput"
    />
  </b-field>
</template>

<script>
export default {
  name: 'DatePickerWithValidation',
  inheritAttrs: false,
  props: {
    value: {
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
      message: 'Укажите дату не позднее сегодняшнего числа',
    };
  },
  methods: {
    onInput(val) {
      this.$emit('input', val);
    },
    validation() {
      const dateNow = Date.now();
      const dateVal = Date.parse(this.value);
      const error = !this.value || dateVal > dateNow;
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
