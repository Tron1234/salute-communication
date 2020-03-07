<template>
  <view class="fixed" :style="{height:windowHeight+'px'}">
    <nav-bar />
    <view class="flexHorCenter">
      <img class="imgWidth" :src="imgSrc">
    </view>
    <input-register @changeGif="changeGif" />
  </view>
</template>

<script>
  import inputRegister from 'content/register/inputRegister'
  import navBar from 'content/register/navBar'
  export default {
    name: 'register',
    data() {
      return {
        windowHeight: uni.getSystemInfoSync().windowHeight,
        imgSrc: '/static/img/common/register/register.gif'
      }
    },
    methods: {
      //改变gif
      changeGif(temp) {
        if (temp) {
          this.imgSrc = '/static/img/common/login/login.gif';
        } else {
          this.imgSrc = '/static/img/common/register/register.gif';
        }
      }
    },
    components: {
      inputRegister,
      navBar
    }
  }
</script>

<style scoped>
</style>
