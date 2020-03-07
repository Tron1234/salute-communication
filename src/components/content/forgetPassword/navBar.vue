<template>
  <view>
    <uni-nav-bar left-icon="back" :left-text="$t('back')" fixed :title="$t('forgetPassword.forgetPasswordText')" status-bar @clickLeft="backPage" :color="color"></uni-nav-bar>
  </view>
</template>

<script>
  import uniNavBar from 'common/navBar/uni-nav-bar/uni-nav-bar'
  export default{
    name:'navBar',
    components:{
      uniNavBar
    },
    methods:{
      backPage(){
        uni.navigateBack();
      }
    },
    computed:{
      color(){
        return this.$store.getters.getHexColor;
      }
    }
  }
</script>

<style>
</style>
