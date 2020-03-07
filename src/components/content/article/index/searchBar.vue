<template>
  <view>
    <uni-status-bar />
    <view class="searchBox flexVerCenter">
      <my-icons class="myIcons" type="search" size="25" color="#707070" @tap="search"/>
    </view>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  import uniStatusBar from "common/navBar/uni-status-bar/uni-status-bar";
  export default {
    name: 'searchBar',
    props: {
      searchTo: {
        type: String,
        require: true
      }
    },
    data() {
      return {

      }
    },
    components: {
      uniStatusBar,
      myIcons
    },
    methods: {
      search() {
        uni.navigateTo({
          url: this.searchTo,
          animationType: 'slide-in-top'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $nav-height: 44px;
  /* #ifndef MP*/
  .searchBox {
    display: flex;
    justify-content: flex-end;
    height: $nav-height;
    line-height: $nav-height;
    margin-right: 40rpx;
    overflow: hidden;
  }

  /* #endif*/
  /* #ifdef MP*/
  .searchBox {
    display: flex;
    justify-content: flex-start;
    height: $nav-height;
    line-height: $nav-height;
    margin-left: 40rpx;
    overflow: hidden;
  }

  /* #endif*/
  .myIcons{
    margin-top: 8rpx;
  }
</style>
