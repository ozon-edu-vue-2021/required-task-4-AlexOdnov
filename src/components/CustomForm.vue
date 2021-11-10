<template>
  <form
    class="grid container is-max-widescreen box"
    @submit.prevent="submitForm"
  >
    <h2 class="title is-4 span-6">Личные данные</h2>

    <input-with-validation
      class="span-2"
      label="Фамилия"
      labelClass="is-medium"
      v-model="formData.lastName"
      rules="^[А-Яа-яё]+$"
      message="Это поле должно состоять из кирилических букв"
      validationId="lastName"
      @changeValidStatus="onChangeValidStatus"
    />

    <input-with-validation
      class="span-2"
      label="Имя"
      labelClass="is-medium"
      v-model="formData.name"
      rules="^[А-Яа-яё]+$"
      message="Это поле должно состоять из кирилических букв"
      validationId="name"
      @changeValidStatus="onChangeValidStatus"
    />

    <input-with-validation
      class="span-2"
      label="Отчество"
      labelClass="is-medium"
      v-model="formData.surName"
      rules="^[А-Яа-яё]+$"
      message="Это поле должно состоять из кирилических букв"
      validationId="surName"
      @changeValidStatus="onChangeValidStatus"
    />

    <date-picker-with-validation
      class="span-3"
      label="Дата рождения"
      labelClass="is-medium"
      placeholder="дд.мм.гггг"
      v-model="formData.birthday"
      locale="ru-RU"
      editable
      validationId="birthday"
      @changeValidStatus="onChangeValidStatus"
    />

    <input-with-validation
      class="span-3"
      label="E-mail"
      labelClass="is-medium"
      v-model="formData.email"
      type="email"
      rules="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
      message="Это поле должно быть валидным e-mail"
      validationId="email"
      @changeValidStatus="onChangeValidStatus"
    />

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

    <search-select-with-validation
      class="span-3"
      label="Гражданство"
      labelClass="is-medium"
      v-model="formData.citizenship"
      :optionsList="citizenships"
      validationId="citizenship"
      @changeValidStatus="onChangeValidStatus"
    />

    <div class="grid span-6" v-if="formData.citizenship === 'Russia'">
      <input-with-validation
        label="Серия паспорта"
        labelClass="is-medium"
        v-model="formData.pasSeries"
        maxlength="4"
        :has-counter="false"
        rules="\d{4}"
        message="Это поле должно состоять из 4 цифр"
        validationId="pasSeries"
        @changeValidStatus="onChangeValidStatus"
      />

      <input-with-validation
        class="span-2"
        label="Номер паспорта"
        labelClass="is-medium"
        v-model="formData.pasNumber"
        maxlength="6"
        :has-counter="false"
        rules="\d{6}"
        message="Это поле должно состоять из 6 цифр"
        validationId="pasNumber"
        @changeValidStatus="onChangeValidStatus"
      />

      <date-picker-with-validation
        class="span-3"
        label="Дата выдачи"
        labelClass="is-medium"
        placeholder="дд.мм.гггг"
        v-model="formData.pasDate"
        locale="ru-RU"
        editable
        validationId="pasDate"
        @changeValidStatus="onChangeValidStatus"
      />
    </div>

    <div class="grid span-6" v-else>
      <input-with-validation
        class="span-3"
        label="Фамилия на латинице"
        labelClass="is-medium"
        v-model="formData.latinLastName"
        rules="^[A-Za-z]+$"
        message="Это поле должно состоять из латинских букв"
        validationId="latinLastName"
        @changeValidStatus="onChangeValidStatus"
        key="latinLastName"
      />

      <input-with-validation
        class="span-3"
        label="Имя на латинице"
        labelClass="is-medium"
        v-model="formData.latinName"
        rules="^[A-Za-z]+$"
        message="Это поле должно состоять из латинских букв"
        validationId="latinName"
        @changeValidStatus="onChangeValidStatus"
        key="latinName"
      />

      <input-with-validation
        class="span-2"
        label="Номер паспорта"
        labelClass="is-medium"
        v-model="formData.pasForeignNumber"
        maxlength="6"
        :has-counter="false"
        rules="\d"
        message="Это поле должно состоять из цифр"
        validationId="pasForeignNumber"
        @changeValidStatus="onChangeValidStatus"
        key="pasForeignNumber"
      />

      <search-select-with-validation
        class="span-2"
        label="Страна выдачи"
        labelClass="is-medium"
        v-model="formData.pasCountry"
        :optionsList="citizenships"
        validationId="pasCountry"
        @changeValidStatus="onChangeValidStatus"
      />

      <search-select-with-validation
        class="span-2"
        label="Тип паспорта"
        labelClass="is-medium"
        v-model="formData.pasType"
        :optionsList="pasTypes"
        validationId="pasType"
        @changeValidStatus="onChangeValidStatus"
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
      <input-with-validation
        class="span-3"
        label="Предыдущая фамилия"
        labelClass="is-medium"
        v-model="formData.initialLastName"
        rules="^[А-Яа-яё]+$"
        message="Это поле должно состоять из кирилических букв"
        validationId="initialLastName"
        @changeValidStatus="onChangeValidStatus"
      />

      <input-with-validation
        class="span-3"
        label="Предыдущее имя"
        labelClass="is-medium"
        v-model="formData.initialName"
        rules="^[А-Яа-яё]+$"
        message="Это поле должно состоять из кирилических букв"
        validationId="initialName"
        @changeValidStatus="onChangeValidStatus"
      />
    </template>

    <b-button
      class="button-submit span-6"
      type="is-info"
      native-type="submit"
      :disabled="!isValid"
      >Отправить</b-button
    >
  </form>
</template>

<script>
import citizenships from '../assets/data/citizenships.json';
import pasTypes from '../assets/data/passport-types.json';
import DatePickerWithValidation from './DatePickerWithValidation.vue';
import InputWithValidation from './InputWithValidation.vue';
import SearchSelectWithValidation from './SearchSelectWithValidation.vue';

export default {
  components: {
    InputWithValidation,
    DatePickerWithValidation,
    SearchSelectWithValidation,
  },
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
        citizenship: '',
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
      isValid: false,
      validStatus: {
        lastName: true,
        name: true,
        surName: true,
        birthday: true,
        email: true,
        citizenship: true,
        pasSeries: true,
        pasNumber: true,
        pasDate: true,
        pasForeignNumber: true,
        pasCountry: true,
        pasType: true,
        latinName: true,
        latinLastName: true,
        initialName: true,
        initialLastName: true,
      },
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
  watch: {
    validStatus: {
      handler: function () {
        const flag = Object.values(this.validStatus).every((el) => el);
        this.isValid = flag;
      },
      deep: true,
    },
  },
  methods: {
    submitForm() {
      if (!this.isValid) {
        return;
      }
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
        this.formData.pasSeries = this.formData.pasNumber = '';
        this.formData.pasDate = null;
      }
      this.$buefy.toast.open({
        duration: 2000,
        message: `Форма отправлена!`,
        type: 'is-info',
      });
      console.log(JSON.stringify(this.formData));
    },
    onChangeValidStatus(e) {
      this.validStatus[e.validationId] = e.validationStatus;
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
