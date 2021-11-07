<template>
  <validation-provider
    class="search-select"
    mode="passive"
    :rules="rules"
    v-slot="{ errors }"
    :vid="vid"
    tag="div"
  >
    <ul v-if="isOpen" class="search-select__list" v-click-outside="hideOptions">
      <template v-if="filteredOptionsList.length">
        <li
          class="search-select__item"
          v-for="el in filteredOptionsList"
          :key="el.id"
          @click="selectOptions(el.content)"
        >
          {{ el.content }}
        </li>
      </template>
      <li v-else class="search-select__item" @click="hideOptions">
        Ничего не найдено
      </li>
    </ul>
    <b-field
      v-bind="$attrs"
      :customClass="labelClass"
      :type="{ 'is-danger': errors[0] }"
      :message="errors"
    >
      <b-input
        v-bind="$attrs"
        :value="value"
        @input="onInput"
        @click.native.stop="toggleOptions"
        :iconRight="icon"
      />
    </b-field>
  </validation-provider>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { debounce } from '../helpers/debounce';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'SearchSelectWithValidation',
  inheritAttrs: false,
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    optionsList: {
      type: Array,
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
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    icon() {
      return this.isOpen ? 'angle-up' : 'angle-down';
    },
    filteredOptionsList() {
      return this.value
        ? this.optionsList.filter((el) =>
            el.content.toLowerCase().includes(this.value.toLowerCase())
          )
        : this.optionsList;
    },
  },
  methods: {
    onInput: debounce(function (val) {
      this.$emit('input', val);
    }, 200),
    toggleOptions(e) {
      e.target.select();
      this.isOpen = !this.isOpen;
    },
    hideOptions() {
      this.isOpen = false;
    },
    selectOptions(val) {
      this.$emit('input', val);
      this.hideOptions();
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.search-select {
  position: relative;
}
.search-select__list {
  position: absolute;
  z-index: 2;
  bottom: -2px;
  overflow: auto;
  width: 100%;
  max-height: 10rem;
  background: #fff;
  border: 1px solid currentColor;
  border-radius: 4px;
  transform: translate(0, 100%);
  --scrollbarBG: transparent;
  --thumbBG: #255af6;
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) #ececec;
}
.search-select__list::-webkit-scrollbar {
  width: 6px;
}
.search-select__list::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
  border-left: 1px solid currentColor;
}
.search-select__list::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 6px;
  margin: 3px 0;
}
.search-select__item {
  padding: 0.5rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
}
.search-select__item:hover {
  background: rgba(15, 119, 234, 0.25);
}
.search-select__item:not(:last-child) {
  border-bottom: 1px solid currentColor;
}
</style>
