<template>
  <view class="fixed" :style="{height:windowHeight+'px'}">
    <nav-bar/>
    <input-forget-password/>
  </view>
</template>

<script>
  import navBar from 'content/forgetPassword/navBar'
  import inputForgetPassword from 'content/forgetPassword/inputForgetPassword'
  export default {
    name: 'register',
    data() {
      return {
        windowHeight: uni.getSystemInfoSync().windowHeight
      }
    },
    components: {
      navBar,
      inputForgetPassword
    }
  }
</script>

<style scoped>
</style>
