<template>
  <view class="forgetPasswordBox">
    <input-phone class="inputBox" :inputTitle="$t('forgetPassword.inputPhoneTitle')" :placeholder="$t('forgetPassword.inputPhonePlaceholder')"
      @getPhone="getPhone" />
    <input-password showTip :inputTip="$t('forgetPassword.inputPasswordTip')" class="inputBox" :inputTitle="$t('forgetPassword.inputPasswordTitle')"
      :placeholder="$t('forgetPassword.inputPasswordPlaceholder')" @getPassword="getPassword" />
    <input-password class="inputBox" :inputTitle="$t('forgetPassword.inputRepasswordTitle')" :placeholder="$t('forgetPassword.inputRepasswordPlaceholder')"
      @getPassword="getRepassword" />
    <input-code class="inputBox" :inputTitle="$t('forgetPassword.inputVerCodeTitle')" :placeholder="$t('forgetPassword.inputVerCodePlaceholder')"
      :phoneNum="phoneNum" @getInputCode="getInputCode" />
    <next-button class="nextButton" :text="$t('forgetPassword.forgetPasswordText')">
      <template v-slot:buttonIcon>
        <my-icons class="buttonIcon" type="next" size="25" color="#fff" @tap="updatePassword" />
      </template>
    </next-button>
  </view>
</template>

<script>
  import inputPhone from 'common/input/inputPhone/inputPhone';
  import inputPassword from 'common/input/inputPassword/inputPassword';
  import inputCode from 'common/input/inputCode/inputCode';
  import nextButton from 'common/nextButton/nextButton';
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'inputForgetPassword',
    data() {
      return {
        phone: '',
        password: '',
        repassword: '',
        inputCode: ''
      }
    },
    components: {
      inputPhone,
      inputPassword,
      inputCode,
      nextButton,
      myIcons
    },
    methods: {
      getPhone(phoneNum) {
        this.phone = phoneNum;
      },
      getPassword(password) {
        this.password = password;
        this.checkDoublePassword();
      },
      getRepassword(repassword) {
        this.repassword = repassword;
        this.checkDoublePassword();
      },
      getInputCode(inputCode) {
        this.inputCode = inputCode;
      },
      updatePassword() {
        if (this.checkDoublePassword() && this.phoneNum != '' && this.inputCode != '') {
          //请求修改密码操作
          /* uni.request({
            url: '',
            date: {
          
            },
            success(data) {
              if (data.success) {}
            },
            fail() {
              this.error.timeOut();
            }
          }) */
        } else {
          this.error.contentNotNull();
        }
      },
      checkDoublePassword() {
        if (this.password != '' && this.repassword != '') {
          if (this.password == this.repassword) {
            return true;
          } else {
            this.error.doublePasswordError();
            return false;
          }
        }
      }
    },
    computed: {
      phoneNum: {
        set(phoneNum) {
          phoneNum = '';
        },
        get() {
          return this.phone;
        }
      }
    }
  }
</script>

<style scoped>
  .forgetPasswordBox {
    position: absolute;
    top: 160rpx;
    left: 0;
    right: 0;
    bottom: 200rpx;
    margin: 16rpx 50rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .buttonIcon {
    position: relative;
    top: 6rpx;
  }

  .nextButton {
    margin: 50rpx 0;
  }
</style>
