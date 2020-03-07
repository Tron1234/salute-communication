<template>
  <view class="loginBox">
    <view>
      <input-phone class="inputBox" :inputTitle="$t('login.inputPhoneTitle')" :placeholder="$t('login.inputPhonePlaceholder')"
        @getPhone="getPhone" />
      <input-password :inputTitle="$t('login.inputPasswordTitle')" :placeholder="$t('login.inputPasswordPlaceholder')"
        @getPassword="getPassword" />
      <view class="flexVerCenter otherChoose">
        <navigator animation-type="slide-in-left" hover-class="none" url="/pages/forgetPassword/index">{{$t('login.forgetPassword')}}</navigator>
        <navigator animation-type="slide-in-right" hover-class="none" url="/pages/register/index"><text decode>{{$t('login.register')}}</text></navigator>
      </view>
    </view>
    <view>
      <next-button :text="$t('login.loginText')">
        <template v-slot:buttonIcon>
          <my-icons class="buttonIcon" type="next" size="25" color="#fff" @tap="login"/>
        </template>
      </next-button>
    </view>
  </view>
</template>

<script>
  import inputPhone from 'common/input/inputPhone/inputPhone';
  import inputPassword from 'common/input/inputPassword/inputPassword';
  import nextButton from 'common/nextButton/nextButton';
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'inputLogin',
    components: {
      inputPhone,
      inputPassword,
      nextButton,
      myIcons
    },
    data() {
      return {
        phoneNum: '',
        password: ''
      }
    },
    methods: {
      //获得手机号
      getPhone(phoneNum) {
        this.phoneNum = phoneNum;
      },
      //获取密码
      getPassword(password) {
        this.password = password;
      },
      //登录事件
      login() {
        //判断为空检查
        if (this.phoneNum != '' && this.password != '') {
          uni.switchTab({
              url: '/pages/article/index/index'
          });
          //请求登录操作
          /* uni.request({
            url: '',
            date: {
          
            },
            success(data) {
              if (data.success) {
                
              }
            },
            fail() {
              this.error.timeOut();
            }
          }) */
        } else {
          this.error.contentNotNull();
        }
      }
    }
  }
</script>

<style scoped>
  /* #ifndef MP*/
  .loginBox {
    position: absolute;
    top: 620rpx;
    left: 0;
    right: 0;
    bottom: 196rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 50rpx 10rpx 50rpx;
  }

  /* #endif*/
  /* #ifdef MP*/
  .loginBox {
    position: absolute;
    top: 700rpx;
    left: 0;
    right: 0;
    bottom: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 50rpx 10rpx 50rpx;
  }

  /* #endif*/
  .buttonIcon {
    position: relative;
    top: 6rpx;
  }

  .otherChoose {
    margin: 14rpx 20rpx;
    font-size: 30rpx;
    color: #a4a4a4;
    justify-content: space-between;
  }
</style>
