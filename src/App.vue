<template>
  <div id="app">
    <div class='form-wrapper'>
      <span class='form-title'>Форма создания клиента</span>
      <hr>
      <client-form @submitHandler='submitHandler'/>
      <confirm-pop-up-for-form @closeConfirmPopUp='closeConfirmPopUp' v-if='showConfirmPopUp'/>
    </div>
  </div>
</template>

<script>
import confirmPopUpForForm from './components/confirmPopUpForForm.vue';
import clientForm from './components/clientForm.vue';

export default {
  name: 'App',
  components: { confirmPopUpForForm, clientForm },
  data() {
    return {
      showConfirmPopUp: false,
    };
  },
  methods: {
    submitHandler() {
      this.showConfirmPopUp = true;
    },
    closeConfirmPopUp() {
      this.showConfirmPopUp = false;
    },
  },
};
</script>

<style lang="sass">
input, textarea, select
  outline: none

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  font-size: 18px
  color: #2c3e50
  margin-top: 60px

.form-wrapper
  margin: auto
  padding: 30px 40px
  width: 50%
  background: #d7b5a1

  @media (max-width: 860px)
    box-sizing: border-box
    width: 100%

.form-title
  width: 100%
  display: block
  font-weight: bold
  font-size: 35px
  color: #333333
  line-height: 1.2
  text-align: center
  padding-bottom: 45px

  @media (max-width: 900px)
    padding-bottom: 10px
</style>
