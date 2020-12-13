<template>
    <div class='form-confirmPopUp'>
      <p class='form-confirmPopUp__description'>Клиент успешно создан!</p>
      <button @click='closeConfirmPopUp' class='form-confirmPopUp__button'>Подтвердить</button>
    </div>
</template>

<script>
export default {
  name: 'confirmPopUpForForm',
  methods: {
    closeConfirmPopUp() {
      this.$emit('closeConfirmPopUp');
    },
  },
};
</script>

<style scoped lang="sass">
.form-confirmPopUp
  position: fixed
  display: flex
  flex-wrap: wrap
  justify-content: flex-end
  border: 1px solid
  box-shadow: 0 0 10px rgba(0,0,0,0.5)
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background: white
  height: 150px
  width: 500px

  .form-confirmPopUp__description
    font-size: 20px
    padding: 0 20px
    width: 100%
    text-align: left

  .form-confirmPopUp__button
    margin: 10px 10px
    color: #ffffff
    background: #22b2ea
    border: none
    padding: 5px 15px
    text-align: center
    text-decoration: none
    font-size: 18px
    font-weight: bold
    outline-style: none
    -webkit-transition-duration: 0.4s /* Safari */
    transition-duration: 0.4s
    user-select: none

    &:hover
      background-color: darken(#22b2ea, 12.50%)
      color: white

  @media (max-width: 860px)
    box-sizing: border-box
    width: 300px
</style>
