<template>
  <view>
    <uni-status-bar :backgroundColor="chooseFontBg.backgroundColor"/>
    <view class="navBox" :style="{backgroundColor:chooseFontBg.backgroundColor}">
      <view class="navSide" @tap="backPage">
        <uni-icons :color="chooseFontBg.leftColor" type="back" size="24" />
        <text :style="{ color: chooseFontBg.leftColor, fontSize: '16px' }" decode>{{$t('back')}}</text>
      </view>
      <!--#ifndef MP -->
      <view class="navSide">
        <!-- 字体设置，背景设置-->
        <my-icons class="navIcon" type="font-size" size="26" :color="chooseFontBg.rightFont" @tap="popupShow"></my-icons>
        <!-- 三点菜单-->
        <my-icons class="navIcon" type="menu" size="26" :color="chooseFontBg.rightMenu" @tap="menuShow"></my-icons>
      </view>
      <!--#endif -->
    </view>
  </view>
</template>

<script>
  import fontBg from '@/static/js/fontBackground';
  import myIcons from "common/my-icons/my-icons";
  import uniStatusBar from "common/navBar/uni-status-bar/uni-status-bar";
  import uniIcons from "common/navBar/uni-icons/uni-icons";
  export default {
    name: 'navBar',
    props:{
      index:{
        type:Number,
        default:0,
        require:true
      }
    },
    components: {
      uniStatusBar,
      uniIcons,
      myIcons
    },
    methods: {
      backPage() {
        uni.navigateBack();
      },
      popupShow(){
        this.$emit('openPopup');
      },
      menuShow(){
        this.$emit('openMenu');
      }
    },
    computed: {
      chooseFontBg(){
        if(this.index==2){
          uni.setNavigationBarColor({
            frontColor:'#ffffff',
            backgroundColor:fontBg.fontStyles[this.index].backgroundColor
          })
        }else{
          uni.setNavigationBarColor({
            frontColor:'#000000',
            backgroundColor:fontBg.fontStyles[this.index].backgroundColor
          })
        }
        return fontBg.fontStyles[this.index];
      }
    }
  }
</script>

<style lang="scss" scoped>
  $nav-height: 44px;
  .navBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: $nav-height;
    line-height: $nav-height;
    overflow: hidden;
  }

  .navSide {
    padding: 0 6px;
    display: flex;
    align-items: center;
  }

  .navIcon {
    padding: 0 20rpx;
  }
</style>
