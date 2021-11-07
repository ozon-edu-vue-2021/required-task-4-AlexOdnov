<template>
  <validation-observer v-slot="{ handleSubmit }" slim>
    <form
      class="grid container is-max-widescreen box"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <h2 class="title is-4 span-6">Личные данные</h2>

      <input-with-validation
        class="span-2"
        label="Фамилия"
        labelClass="is-medium"
        v-model="formData.lastName"
        vid="lastName"
        rules="required|cyrilic"
      />

      <input-with-validation
        class="span-2"
        label="Имя"
        labelClass="is-medium"
        v-model="formData.name"
        vid="name"
        rules="required|cyrilic"
      />

      <input-with-validation
        class="span-2"
        label="Отчество"
        labelClass="is-medium"
        v-model="formData.surName"
        vid="surName"
        rules="required|cyrilic"
      />

      <date-picker-with-validation
        class="span-3"
        label="Дата рождения"
        labelClass="is-medium"
        v-model="formData.birthday"
        vid="birthday"
        rules="required|date"
        placeholder="дд.мм.гггг"
        locale="ru-RU"
        editable
      />

      <input-with-validation
        class="span-3"
        label="E-mail"
        labelClass="is-medium"
        v-model="formData.email"
        type="email"
        vid="email"
        rules="required|email"
      />

      <b-field class="span-6" label="Пол" custom-class="is-medium">
        <b-radio
          v-model="formData.sex"
          name="sex"
          type="is-info"
          nativeValue="мужской"
        >
          Мужской
        </b-radio>
        <b-radio
          v-model="formData.sex"
          name="sex"
          type="is-info"
          nativeValue="женский"
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
        vid="citizenship"
        :rules="`required|oneOf:${citizenships
          .map((el) => el.content)
          .join(',')}`"
      />

      <div class="grid span-6" v-if="formData.citizenship === 'Russia'">
        <input-with-validation
          class="span-1"
          label="Серия паспорта"
          labelClass="is-medium"
          v-model="formData.pasSeries"
          :has-counter="false"
          vid="pasSeries"
          rules="required|digits:4"
          :maxlength="4"
        />

        <input-with-validation
          class="span-2"
          label="Номер паспорта"
          labelClass="is-medium"
          v-model="formData.pasNumber"
          :has-counter="false"
          vid="pasNumber"
          rules="required|digits:6"
          :maxlength="6"
        />

        <date-picker-with-validation
          class="span-3"
          label="Дата выдачи"
          labelClass="is-medium"
          v-model="formData.pasDate"
          vid="pasDate"
          rules="required|date"
          placeholder="дд.мм.гггг"
          locale="ru-RU"
          editable
        />
      </div>

      <div class="grid span-6" v-else>
        <input-with-validation
          class="span-3"
          label="Фамилия на латинице"
          labelClass="is-medium"
          v-model="formData.latinLastName"
          vid="latinLastName"
          rules="required|latin"
          key="latinLastName"
        />

        <input-with-validation
          class="span-3"
          label="Имя на латинице"
          labelClass="is-medium"
          v-model="formData.latinName"
          vid="latinName"
          rules="required|latin"
          key="latinName"
        />

        <input-with-validation
          class="span-2"
          label="Номер паспорта"
          labelClass="is-medium"
          v-model="formData.pasForeignNumber"
          vid="pasForeignNumber"
          rules="required|numeric"
          key="pasForeignNumber"
        />

        <search-select-with-validation
          class="span-2"
          label="Страна выдачи"
          labelClass="is-medium"
          v-model="formData.pasCountry"
          :optionsList="citizenships"
          vid="pasCountry"
          :rules="`required|oneOf:${citizenships
            .map((el) => el.content)
            .join(',')}`"
        />

        <search-select-with-validation
          class="span-2"
          label="Тип паспорта"
          labelClass="is-medium"
          v-model="formData.pasType"
          :optionsList="pasTypes"
          vid="pasTypes"
          :rules="`required|oneOf:${pasTypes
            .map((el) => el.content)
            .join(',')}`"
        />
      </div>

      <b-field
        class="span-6"
        label="Меняли ли фамилию или имя?"
        customClass="is-medium"
      >
        <b-radio
          v-model="formData.isNameChange"
          name="isNameChange"
          type="is-info"
          :nativeValue="true"
          >Да</b-radio
        >
        <b-radio
          v-model="formData.isNameChange"
          name="isNameChange"
          type="is-info"
          :nativeValue="false"
        >
          Нет
        </b-radio>
      </b-field>

      <template v-if="formData.isNameChange">
        <input-with-validation
          class="span-3"
          label="Фамилия"
          labelClass="is-medium"
          v-model="formData.initialLastName"
          vid="initialLastName"
          rules="required"
        />

        <input-with-validation
          class="span-3"
          label="Имя"
          labelClass="is-medium"
          v-model="formData.initialName"
          vid="initialName"
          rules="required"
        />
      </template>

      <b-button class="button-submit span-6" type="is-info" nativeType="submit"
        >Отправить</b-button
      >
    </form>
  </validation-observer>
</template>

<script>
import citizenships from '../assets/data/citizenships.json';
import pasTypes from '../assets/data/passport-types.json';
import { ValidationObserver } from 'vee-validate';
import InputWithValidation from './InputWithValidation.vue';
import DatePickerWithValidation from './DatePickerWithValidation.vue';
import SearchSelectWithValidation from './SearchSelectWithValidation.vue';

export default {
  components: {
    ValidationObserver,
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
      this.$buefy.toast.open({
        duration: 2000,
        message: `Форма отправлена!`,
        type: 'is-info',
      });
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
.span-1 {
  grid-column: span 1;
  align-self: end;
}
.span-2 {
  grid-column: span 2;
  align-self: end;
}
.span-3 {
  grid-column: span 3;
  align-self: end;
}
.span-6 {
  grid-column: span 6;
  align-self: end;
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
@media (max-width: 600px) {
  .span-1,
  .span-2 {
    grid-column: span 3;
  }
}
@media (max-width: 420px) {
  .span-1,
  .span-2,
  .span-3 {
    grid-column: span 6;
  }
}
</style>
