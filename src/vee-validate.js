import {
  required,
  email,
  digits,
  numeric,
  oneOf,
} from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'Это поле необходимо заполнить',
});

extend('email', {
  ...email,
  message: 'Это поле должно быть валидным e-mail',
});

extend('digits', {
  ...digits,
  message: 'Это поле должно состоять из {length} цифр',
});

extend('numeric', {
  ...numeric,
  message: 'Это поле должно состоять из цифр',
});

extend('oneOf', {
  ...oneOf,
  message: 'Выберите значение из списка',
});

extend('cyrilic', {
  validate: (value) => {
    const regex = new RegExp('^[А-Яа-яё]+$');
    return regex.test(value);
  },
  message: 'Это поле должно состоять из кирилических букв',
});

extend('latin', {
  validate: (value) => {
    const regex = new RegExp('^[A-Za-z]+$');
    return regex.test(value);
  },
  message: 'Это поле должно состоять из латинских букв',
});

extend('date', {
  validate: (value) => {
    const dateNow = Date.now();
    const dateVal = Date.parse(value);
    return dateVal < dateNow;
  },
  message: 'Укажите дату не позднее сегодняшнего числа',
});
