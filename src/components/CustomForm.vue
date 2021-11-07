<template>
  <form
    class="grid container is-max-widescreen box"
    @submit.prevent="submitForm"
  >
    <h2 class="title is-4 span-6">Личные данные</h2>

    <b-field class="span-2" label="Фамилия" custom-class="is-medium">
      <b-input v-model="formData.lastName" required />
    </b-field>

    <b-field class="span-2" label="Имя" custom-class="is-medium">
      <b-input v-model="formData.name" required />
    </b-field>

    <b-field class="span-2" label="Отчество" custom-class="is-medium">
      <b-input v-model="formData.surName" required />
    </b-field>

    <b-field class="span-3" label="Дата рождения" custom-class="is-medium">
      <b-datepicker
        placeholder="дд.мм.гггг"
        v-model="formData.birthday"
        locale="ru-RU"
        editable
        required
      />
    </b-field>

    <b-field class="span-3" label="E-mail" custom-class="is-medium">
      <b-input v-model="formData.email" type="email" required />
    </b-field>

    <b-field class="span-6" label="Пол" custom-class="is-medium">
      <b-radio
        v-model="formData.sex"
        name="sex"
        type="is-info"
        native-value="мужской"
      >
        Мужской
      </b-radio>
      <b-radio
        v-model="formData.sex"
        name="sex"
        type="is-info"
        native-value="женский"
      >
        Женский
      </b-radio>
    </b-field>

    <h2 class="title is-4 span-6">Паспортные данные</h2>

    <search-select
      class="span-3"
      label="Гражданство"
      custom-class="is-medium"
      v-model="formData.citizenship"
      :optionsList="citizenships"
    />

    <div class="grid span-6" v-if="formData.citizenship === 'Russia'">
      <b-field label="Серия паспорта" custom-class="is-medium">
        <b-input
          v-model="formData.pasSeries"
          maxlength="4"
          :has-counter="false"
          required
        />
      </b-field>

      <b-field class="span-2" label="Номер паспорта" custom-class="is-medium">
        <b-input
          v-model="formData.pasNumber"
          maxlength="6"
          :has-counter="false"
          required
        />
      </b-field>

      <b-field class="span-3" label="Дата выдачи" custom-class="is-medium">
        <b-datepicker
          placeholder="дд.мм.гггг"
          v-model="formData.pasDate"
          locale="ru-RU"
          editable
          required
        />
      </b-field>
    </div>

    <div class="grid span-6" v-else>
      <b-field
        class="span-3"
        label="Фамилия на латинице"
        custom-class="is-medium"
      >
        <b-input v-model="formData.latinLastName" required />
      </b-field>

      <b-field class="span-3" label="Имя на латинице" custom-class="is-medium">
        <b-input v-model="formData.latinName" required />
      </b-field>

      <b-field class="span-2" label="Номер паспорта" custom-class="is-medium">
        <b-input v-model="formData.pasForeignNumber" required />
      </b-field>

      <search-select
        class="span-2"
        label="Страна выдачи"
        custom-class="is-medium"
        v-model="formData.pasCountry"
        :optionsList="citizenships"
      />

      <search-select
        class="span-2"
        label="Тип паспорта"
        custom-class="is-medium"
        v-model="formData.pasType"
        :optionsList="pasTypes"
      />
    </div>

    <b-field
      class="span-6"
      label="Меняли ли фамилию или имя?"
      custom-class="is-medium"
    >
      <b-radio
        v-model="formData.isNameChange"
        name="isNameChange"
        type="is-info"
        :native-value="true"
        >Да</b-radio
      >
      <b-radio
        v-model="formData.isNameChange"
        name="isNameChange"
        type="is-info"
        :native-value="false"
      >
        Нет
      </b-radio>
    </b-field>

    <template v-if="formData.isNameChange">
      <b-field class="span-3" label="Фамилия" custom-class="is-medium">
        <b-input v-model="formData.initialLastName" required />
      </b-field>

      <b-field class="span-3" label="Имя" custom-class="is-medium">
        <b-input v-model="formData.initialName" required />
      </b-field>
    </template>

    <b-button class="button-submit span-6" type="is-info" native-type="submit"
      >Отправить</b-button
    >
  </form>
</template>

<script>
import citizenships from '../assets/data/citizenships.json';
import pasTypes from '../assets/data/passport-types.json';
import SearchSelect from './SearchSelect.vue';

export default {
  components: { SearchSelect },
  name: 'CustomForm',
  data() {
    return {
      formData: {
        lastName: '',
        name: '',
        surName: '',
        birthday: null,
        email: '',
        sex: 'мужской',
        citizenship: 'Russia',
        pasSeries: '',
        pasNumber: '',
        pasDate: null,
        pasForeignNumber: '',
        pasCountry: '',
        pasType: '',
        latinName: '',
        latinLastName: '',
        isNameChange: false,
        initialName: '',
        initialLastName: '',
      },
      citizenships: null,
      pasTypes: null,
    };
  },
  created() {
    this.citizenships = citizenships.map((el) => ({
      id: el.id,
      content: el.nationality,
    }));
    this.pasTypes = pasTypes.map((el) => ({
      id: el.id,
      content: el.type,
    }));
  },
  methods: {
    submitForm() {
      if (!this.formData.isNameChange) {
        this.formData.initialName = this.formData.initialLastName = '';
      }
      if (this.formData.citizenship === 'Russia') {
        this.formData.pasForeignNumber =
          this.formData.pasCountry =
          this.formData.pasType =
          this.formData.latinName =
          this.formData.latinLastName =
            '';
      } else {
        this.formData.pasSeries =
          this.formData.pasNumber =
          this.formData.pasDate =
            '';
      }
      console.log(JSON.stringify(this.formData));
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: min-content;
  column-gap: 1rem;
}
.span-2 {
  grid-column: span 2;
}
.span-3 {
  grid-column: span 3;
}
.span-6 {
  grid-column: span 6;
}
.title {
  margin-bottom: 0.5rem;
}
.title:not(:first-child) {
  margin-top: 1rem;
}
.button-submit {
  justify-self: end;
  margin-top: 1.5rem;
}
</style>
