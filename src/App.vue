<template>
  <div id="app" class="">
    <custom-form />
  </div>
</template>

<script>
import CustomForm from './components/CustomForm.vue';

export default {
  name: 'App',
  components: {
    CustomForm,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

html {
  overflow: hidden;
}

#app {
  padding: 1rem;
  overflow-y: auto;
}

.input:focus {
  border-color: rgb(15, 119, 234);
  box-shadow: 0 0 0 0.125em rgba(15, 119, 234, 0.25);
}

.b-radio.radio:not(.button) {
  margin-right: 1.5em;
}

.field {
  margin-bottom: 0.75rem;
}
</style>
