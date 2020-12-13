<template>
  <form ref='formClient' id='form-client' @submit.prevent='submitHandler'>
    <div class="main-information">
      <div class='wrap-label'>
        <label>Ваше имя: <span class='required'>*</span>
          <input type='text'
                 :class="$v.labels.firstName.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.firstName'
                 name='demand[firstName]'
                 form='form-client'
                 placeholder='Введите ваше имя'>
        </label>
        <p v-if='$v.labels.firstName.$dirty && !$v.labels.firstName.required'
           class='form-error'>Это поле обязательно для заполнения.</p>
        <p v-if='$v.labels.firstName.$dirty && !$v.labels.firstName.minLength'
           class='form-error'>Это поле не должно содержать менее 2 букв.</p>
      </div>
      <div class='wrap-label'>
        <label>Ваша фамилия: <span class='required'>*</span>
          <input type='text'
                 :class="$v.labels.secondName.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.secondName'
                 name='demand[secondName]'
                 form='form-client'
                 placeholder='Введите вашу фамилию'>
        </label>
        <p v-if='$v.labels.secondName.$dirty && !$v.labels.secondName.required'
           class='form-error'>Это поле обязательно для заполнения.</p>
        <p v-if='$v.labels.secondName.$dirty && !$v.labels.secondName.minLength'
           class='form-error'>Это поле не должно содержать менее 2 букв.</p>
      </div>
      <div class='wrap-label'>
        <label>Ваше отчество:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.lastName'
                 name='demand[lastName]'
                 form='form-client'
                 placeholder='Введите ваше отчество'>
        </label>
        <p v-if='$v.labels.lastName.$dirty && !$v.labels.lastName.minLength'
           class='form-error'>Это поле не должно содержать менее 2 букв.</p>
      </div>
      <div class='wrap-label wrap-label__date'>
        <label>Дата вашего рождения: <span class='required'>*</span></label>
        <input type='number'
               class='form-input'
               :class="$v.labels.birthday.day.$error ? 'invalid' : ''"
               v-model.trim='labels.birthday.day'
               name='demand[birthdayDay]'
               form='form-client'
               placeholder='День'>
        <select form='form-client'
                class='form-input'
                v-model.trim='labels.birthday.month'
                name='demand[birthdaymonth]'>
          <option v-for='(month, key) in months' :key='key' :value='key'>{{ month }}</option>
        </select>
        <input type='number'
               :class="$v.labels.birthday.year.$error ? 'invalid' : ''"
               class='form-input'
               v-model.trim='labels.birthday.year'
               name='demand[birthdayYear]'
               form='form-client'
               placeholder='Год'>
      </div>
      <p v-if='$v.labels.birthday.year.$dirty && !$v.labels.birthday.year.required
               || $v.labels.birthday.day.$dirty && !$v.labels.birthday.day.required'
        class='form-error'>Это поле обязательно для заполнения.</p>
      <p v-if='$v.labels.birthday.year.$dirty && $v.labels.birthday.year.$error
               || $v.labels.birthday.day.$dirty && $v.labels.birthday.day.$error'
         class='form-error'>Некорректная дата.</p>
      <div class='wrap-label'>
        <label>Ваш номер телефона: <span class='required'>*</span>
          <input type='text'
                 :class="$v.labels.phoneNumber.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.phoneNumber'
                 name='demand[phoneNumber]'
                 form='form-client'
                 placeholder='Введите ваш номер телефона'>
        </label>
        <p v-if='$v.labels.phoneNumber.$dirty && !$v.labels.phoneNumber.required'
           class='form-error'>Это поле обязательно для заполнения.</p>
        <p v-if='$v.labels.phoneNumber.$dirty && !$v.labels.phoneNumber.numeric'
           class='form-error'>В поле 'номер телефона' - могут содержаться только цифры.</p>
        <p v-if='$v.labels.phoneNumber.$dirty && !$v.labels.phoneNumber.firstNumIsSeven'
           class='form-error'>Телефон должен начинаться с 7.</p>
        <p v-if='$v.labels.phoneNumber.$dirty && !$v.labels.phoneNumber.minLength
            || !$v.labels.phoneNumber.maxLength'
           class='form-error'>В телефоне может быть только 11 цифр.</p>
      </div>
      <div class='wrap-label wrap-label__male'>
        <span>Ваш пол:</span>
        <span><input name='male'
                     form='form-client'
                     type='radio'
                     value='demand[male]'
                     checked> Мужской</span>
        <span><input name='male'
                     form='form-client'
                     type="radio"
                     value='demand[female]'> Женский</span>
      </div>
      <div class='wrap-label'>
        <label>Выберете группы клиентов:
          <select name='demand[clientGroup]'
                  :class="$v.labels.clientGroup.$error ? 'invalid' : ''"
                  class='form-input form-input__multiple'
                  v-model.trim='labels.clientGroup'
                  multiple
                  form='form-client'>
            <option v-for='(clientGroup, key) in clientGroups' :key='key' :value='key'>
              {{ clientGroup }}
            </option>
          </select>
        </label>
        <p v-if='$v.labels.clientGroup.$dirty && !$v.labels.clientGroup.required'
           class='form-error'>Выберете группы клиентов.</p>
      </div>
      <div class='wrap-label'>
        <label>Выберете лечащего врача:
          <select name='demand[medic]'
                  class='form-input'
                  v-model.trim='labels.medic'
                  form='form-client'>
            <option v-for='(medic, key) in medics' :key='key' :value='key'>{{ medic }}</option>
          </select>
        </label>
      </div>
      <div class='wrap-label wrap-label__sms'>
        <label>Не отправлять СМС
          <input type='checkbox'
                 name='demand[sms]'
                 value='sms'
                 form='form-client'
                 placeholder='Индекс'>
        </label>
      </div>
    </div>
    <div class="address-information">
      <span class='form-subtitle'>Адрес</span>
      <hr>
      <div class='wrap-label'>
        <label>Ваш индекс:
          <input type='text'
                 class='form-input'
                 :class="$v.labels.index.$error ? 'invalid' : ''"
                 v-model.trim='labels.index'
                 name='demand[index]'
                 form='form-client'
                 placeholder='Введите ваш индекс'>
        </label>
        <p v-if='$v.labels.index.$dirty && !$v.labels.index.numeric'
           class='form-error'>В поле 'индекс' - могут содержаться только цифры.</p>
      </div>
      <div class='wrap-label'>
        <label>Ваша страна:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.country'
                 name='demand[country]'
                 form='form-client'
                 placeholder='Введите вашу страну'>
        </label>
      </div>
      <div class='wrap-label'>
        <label>Ваша область:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.region'
                 name='demand[region]'
                 form='form-client'
                 placeholder='Введите вашу область'>
        </label>
      </div>
      <div class='wrap-label'>
        <label>Ваш город: <span class='required'>*</span>
          <input type='text'
                 :class="$v.labels.city.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.city'
                 name='demand[city]'
                 form='form-client'
                 placeholder='Введите ваш город'>
        </label>
        <p v-if='$v.labels.city.$dirty && !$v.labels.city.required'
           class='form-error'>Это поле обязательно для заполнения.</p>
      </div>
      <div class='wrap-label'>
        <label>Ваша улица:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.street'
                 name='demand[street]'
                 form='form-client'
                 placeholder='Введите вашу улицу'>
        </label>
      </div>
      <div class='wrap-label'>
        <label>Ваш дом:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.house'
                 name='demand[house]'
                 form='form-client'
                 placeholder='Введите номер вашего дома'>
        </label>
      </div>
    </div>
    <div class="passport-information">
      <span class='form-subtitle'>Паспорт</span>
      <hr>
      <div class='wrap-label'>
        <label>Тип документа: <span class='required'>*</span>
          <select name='demand[documentType]'
                  :class="$v.labels.documentType.$error ? 'invalid' : ''"
                  v-model.trim='labels.documentType'
                  class='form-input'
                  form='form-client'>
            <option v-for='(document, key) in documents' :key='key' :value='key'>
                    {{ document }}</option>
          </select>
        </label>
        <p v-if='$v.labels.documentType.$dirty && !$v.labels.documentType.required'
           class='form-error'>Это поле обязательно для заполнения.</p>
      </div>
      <div class='wrap-label'>
        <label>Введите серию:
          <input type='text'
                 :class="$v.labels.documentSeria.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.documentSeria'
                 name='demand[documentSeria]'
                 form='form-client'
                 placeholder='Серия'>
        </label>
        <p v-if='$v.labels.documentSeria.$dirty && !$v.labels.documentSeria.numeric'
           class='form-error'>В поле 'серия' - могут содержаться только цифры.</p>
      </div>
      <div class='wrap-label'>
        <label>Введите номер:
          <input type='text'
                 :class="$v.labels.documentNumber.$error ? 'invalid' : ''"
                 class='form-input'
                 v-model.trim='labels.documentNumber'
                 name='demand[documentNumber]'
                 form='form-client'
                 placeholder='Номер'>
        </label>
        <p v-if='$v.labels.documentNumber.$dirty && !$v.labels.documentNumber.numeric'
           class='form-error'>В поле 'номер' - могут содержаться только цифры.</p>
      </div>
      <div class='wrap-label'>
        <label>Кем выдан:
          <input type='text'
                 class='form-input'
                 v-model.trim='labels.documentFrom'
                 name='demand[documentFrom]'
                 form='form-client'
                 placeholder='Кем выдан'>
        </label>
      </div>
      <div class='wrap-label wrap-label__date'>
        <label>Дата выдачи: <span class='required'>*</span></label>
        <input type='number'
               :class="$v.labels.documentIssure.day.$error ? 'invalid' : ''"
               class='form-input'
               v-model.trim='labels.documentIssure.day'
               name='demand[documentFromDay]'
               form='form-client'
               placeholder='День'>
        <select name='demand[documentFromMonth]'
                class='form-input'
                v-model.trim='labels.documentIssure.month'
                form='form-client'>
          <option v-for='(month, key) in months' :key='key' :value='key'>
            {{ month }}
          </option>
        </select>
        <input type='number'
               :class="$v.labels.documentIssure.year.$error ? 'invalid' : ''"
               class='form-input'
               v-model.trim='labels.documentIssure.year'
               name='demand[documentFromYear]'
               form='form-client'
               placeholder='Год'>
      </div>
      <p v-if='$v.labels.documentIssure.year.$dirty && !$v.labels.documentIssure.year.required
               || $v.labels.documentIssure.day.$dirty && !$v.labels.documentIssure.day.required'
        class='form-error'>Это поле обязательно для заполнения.</p>
      <p v-if='$v.labels.documentIssure.year.$dirty && $v.labels.documentIssure.year.$error
               || $v.labels.documentIssure.day.$dirty && $v.labels.documentIssure.day.$error'
         class='form-error'>Некорректная дата.</p>
    </div>
    <p><span class='required'>*</span> - Поле обязательное для заполнения.</p>
    <div class='wrap-label'>
      <button type='submit'
              :class='["form-button", $v.labels.$error ? "form-button__error" : ""]'
              form='form-client'>Отправить</button>
      <p v-if='$v.labels.$error'
         class='form-error form-error__center'>Форма заполнена некорректно.</p>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required, numeric, maxLength, minLength, minValue, maxValue,
} from 'vuelidate/lib/validators';
import { firstNumIsSeven, correctDayInMonth } from '../mixins/customVuelidate';
import data from '../mixins/data';

export default {
  name: 'clientFormVue',
  mixins: [validationMixin, data],
  data() {
    return {
      labels: {
        firstName: '',
        secondName: '',
        lastNames: '',
        birthday: {
          day: '',
          month: 'january',
          year: '',
        },
        phoneNumber: '',
        clientGroup: [],
        medic: 'noSelect',
        index: '',
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        documentType: 'pasport',
        documentSeria: '',
        documentNumber: '',
        documentFrom: '',
        documentIssure: {
          day: '',
          month: 'january',
          year: '',
        },
      },
      minYear: new Date().getFullYear() - 120,
      maxYear: new Date().getFullYear() - 18,
      showConfirmPopUp: false,
    };
  },
  methods: {
    submitHandler() {
      this.$v.labels.$touch();
      if (!this.$v.labels.$error) {
        this.$refs.formClient.reset();
        this.$v.$reset();
        Object.keys(this.labels).forEach((key) => {
          switch (key) {
            case 'medic':
              this.labels[key] = 'noSelect';
              break;
            case 'documentType':
              this.labels[key] = 'pasport';
              break;
            case 'clientGroup':
              this.labels[key] = [];
              break;
            case 'birthday' || 'documentIssure':
              this.labels[key].day = '';
              this.labels[key].month = 'january';
              this.labels[key].year = '';
              break;
            default:
              this.labels[key] = '';
          }
        });
        this.$emit('submitHandler');
      }
    },
    refactoringString(value) {
      if (!value) return '';

      const valueToString = value.toString();
      const capitalizeValue = valueToString.charAt(0).toUpperCase() + value.slice(1);

      return capitalizeValue.replace(/[^А-Яа-яЁё]/g, '');
    },
  },
  watch: {
    'labels.firstName': function (val) {
      this.labels.firstName = this.refactoringString(val);
    },
    'labels.secondName': function (val) {
      this.labels.secondName = this.refactoringString(val);
    },
    'labels.lastName': function (val) {
      this.labels.lastName = this.refactoringString(val);
    },
    'labels.country': function (val) {
      this.labels.country = this.refactoringString(val);
    },
    'labels.region': function (val) {
      this.labels.region = this.refactoringString(val);
    },
    'labels.city': function (val) {
      this.labels.city = this.refactoringString(val);
    },
    'labels.street': function (val) {
      this.labels.street = this.refactoringString(val);
    },
  },
  validations() {
    return {
      labels: {
        firstName: {
          required,
          minLength: minLength(2),
        },
        secondName: {
          required,
          minLength: minLength(2),
        },
        lastName: {
          minLength: minLength(2),
        },
        city: {
          required,
        },
        phoneNumber: {
          required,
          numeric,
          minLength: minLength(11),
          maxLength: maxLength(11),
          firstNumIsSeven,
        },
        clientGroup: {
          required,
        },
        index: {
          numeric,
        },
        documentNumber: {
          numeric,
        },
        documentSeria: {
          numeric,
        },
        documentType: {
          required,
        },
        birthday: {
          day: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(31),
            correctDayInMonth: correctDayInMonth(this.labels.birthday.year,
              this.labels.birthday.month),
          },
          month: {
            required,
          },
          year: {
            required,
            minValue: minValue(this.minYear),
            maxValue: maxValue(this.maxYear),
          },
        },
        documentIssure: {
          day: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(31),
            correctDayInMonth: correctDayInMonth(this.labels.documentIssure.year,
              this.labels.documentIssure.month),
          },
          month: {
            required,
          },
          year: {
            required,
            minValue: minValue(this.minYear),
            maxValue: maxValue(this.maxYear),
          },
        },
      },
    };
  },
};
</script>

<style lang="sass">
input, select
  outline: none

.form-subtitle
  width: 100%
  display: block
  font-size: 30px
  color: #333333
  line-height: 1.2
  text-align: center
  padding-bottom: 25px

label
  display: block
  margin-bottom: 10px
  text-align: left

.form-input
  margin-top: 10px
  padding: 0 25px
  height: 55px
  width: 100%
  border: 1px solid #e6e6e6
  box-sizing: border-box
  font-size: 18px

  &__multiple
    height: 75px
    padding-top: 5px

  &.invalid
    border: solid 2px darkred

.wrap-label
  padding-bottom: 30px

  &__male
    display: flex
    justify-content: space-evenly

  &__date
    display: flex
    justify-content: space-evenly
    flex-wrap: wrap

    & > label
      flex-basis: 100%

    & > select
      width: auto;

      @media (max-width: 860px)
        width: 100%

    & > input
      min-width: 95px;
      width: 18%;

      @media (max-width: 860px)
        width: 100%

  &__sms
    & > label
      text-align: right

.required
  color: darkred

.form-error
  margin: 0
  font-size: 15px
  text-align: right
  color: darkred

  &__center
    margin-top: 15px
    text-align: center

.form-button
  color: #ffffff
  background: #22b2ea
  border: none
  padding: 15px 32px
  text-align: center
  text-decoration: none
  font-size: 20px
  font-weight: bold
  outline-style: none
  -webkit-transition-duration: 0.4s /* Safari */
  transition-duration: 0.4s
  user-select: none

  &:hover
    background-color: darken(#22b2ea, 12.50%)
    color: white

  &__error
    background-color: #f44336

    &:hover
      background-color: darken(#f44336, 12.50%)
</style>
