<template>
  <view>
    <uni-nav-bar left-icon="back" :left-text="$t('back')" fixed :title="$t('profile.settings.title')" status-bar @clickLeft="backPage" color="#505050" backgroundColor="#fcfcfc"></uni-nav-bar>
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
      uni.navigateBack()
    }
  }
}
</script>

<style>
</style>
