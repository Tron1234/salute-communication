<template>
  <view class="registerBox">
    <view>
      <input-phone class="inputBox" :inputTitle="$t('register.inputPhoneTitle')" :placeholder="$t('register.inputPhonePlaceholder')"
        @getPhone="getPhone" />
      <input-password showTip :inputTip="$t('register.inputPasswordTip')" class="inputBox" :inputTitle="$t('register.inputPasswordTitle')"
        :placeholder="$t('register.inputPasswordPlaceholder')" @getPassword="getPassword" />
      <input-code :inputTitle="$t('register.inputVerCodeTitle')" :placeholder="$t('register.inputVerCodePlaceholder')"
        :phoneNum="phoneNum" @getInputCode="getInputCode" />
    </view>
    <view>
      <next-button :text="$t('register.registerText')">
        <template v-slot:buttonIcon>
          <my-icons class="buttonIcon" type="next" size="25" color="#fff" @tap="register" />
        </template>
      </next-button>
    </view>
  </view>
</template>

<script>
  import inputPhone from 'common/input/inputPhone/inputPhone';
  import inputPassword from 'common/input/inputPassword/inputPassword';
  import inputCode from 'common/input/inputCode/inputCode';
  import nextButton from 'common/nextButton/nextButton';
  import myIcons from "common/my-icons/my-icons";
  let time = 60;
  export default {
    name: 'inputRegister',
    components: {
      inputPhone,
      inputPassword,
      inputCode,
      nextButton,
      myIcons
    },
    data() {
      return {
        phone: '',
        password: '',
        inputCode: ''
      }
    },
    methods: {
      //获取手机号
      getPhone(phoneNum) {
        this.phone = phoneNum;
        if (this.checkInputContent()) {
          this.$emit('changeGif', true);
        } else {
          this.$emit('changeGif', false);
        }
      },
      getPassword(password) {
        this.password = password;
        if (this.checkInputContent()) {
          this.$emit('changeGif', true);
        } else {
          this.$emit('changeGif', false);
        }
      },
      getInputCode(inputCode) {
        this.inputCode = inputCode;
        if (this.checkInputContent()) {
          this.$emit('changeGif', true);
        } else {
          this.$emit('changeGif', false);
        }
      },
      //如果三个输入框都正确则gif转变成登录的
      checkInputContent() {
        if (this.phoneNum != '' && this.password != '' && this.inputCode != '') {
          return true;
        } else {
          return false;
        }
      },
      //注册事件
      register() {
        //判断为空检查
        if (this.checkInputContent()) {
          //请求注册操作
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
  .registerBox {
    position: absolute;
    top: 628rpx;
    left: 0;
    right: 0;
    bottom: 20rpx;
    margin: 0 50rpx 16rpx 50rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .buttonIcon {
    position: relative;
    top: 6rpx;
  }
</style>
