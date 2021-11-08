<template>
  <div class="search-select">
    <ul
      v-if="isOpen"
      class="search-select__list"
      v-click-outside="clickOutside"
    >
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
      :type="{ 'is-danger': error }"
      :message="error ? message : ''"
    >
      <b-input
        v-bind="$attrs"
        :value="value"
        @input="onInput"
        @click.native.stop="openOptions"
        :icon-right="icon"
      />
    </b-field>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { debounce } from '../helpers/debounce';

export default {
  name: 'SearchSelectWithValidation',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
    optionsList: {
      type: Array,
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
      isOpen: false,
      error: false,
      message: 'Выберите значение из списка',
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
    openOptions(e) {
      e.target.select();
      this.isOpen = true;
    },
    hideOptions() {
      this.isOpen = false;
    },
    clickOutside() {
      this.validation(this.value);
      this.hideOptions();
    },
    selectOptions(val) {
      this.$emit('input', val);
      this.validation(val);
      this.hideOptions();
    },
    validation(val) {
      const variants = this.optionsList.map((el) => el.content);
      const error = !val || !variants.some((el) => el === val);
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
