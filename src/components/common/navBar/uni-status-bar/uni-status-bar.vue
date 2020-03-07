<template>
  <view :style="{ height: statusBarHeight,backgroundColor:backgroundColor}" class="uni-status-bar">
    <slot />
  </view>
</template>

<script>
  var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
  export default {
    name: 'UniStatusBar',
    props: {
      backgroundColor: {
        type:String,
        default:'transparent'
      }
    },
    data() {
      return {
        statusBarHeight: statusBarHeight
      }
    }
  }
</script>

<style lang="scss" scoped>
  .uni-status-bar {
    width: 750rpx;
    height: 20px;
    // height: var(--status-bar-height);
  }
</style>
