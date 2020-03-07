<template>
  <view>
    <view class="inputTitle">
      <text decode>{{inputTitle}}</text>
    </view>
    <view class="inputCode">
      <input class="inputText" type="number" maxlength="4" :placeholder="placeholder" placeholder-class="placeholderStyle"
        confirmType="done" @blur="getInputCode">
      <button :disabled="!isCanGetCode" class="getCode" @tap="getCode">{{verCodeBtn}}</button>
    </view>
  </view>
</template>

<script>
  import lang from 'lang'
  let time = 60;
  export default {
    name: 'inputCode',
    props: {
      inputTitle: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        require: true
      },
      phoneNum: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        verCodeBtn: lang.i18n.t('register.inputVerCodeButton'),
        isCanGetCode: true,
        inputCode: ''
      }
    },
    methods: {
      //获得验证码
      getCode() {
        //判断手机号是否正确
        if (this.phoneNum != '') {
          this.sixtyTime();
          //获得短信验证码
          /* uni.request({
            url: '',
            date: {
      
            },
            success(data) {
              if (data.success) {
                this.sixtyTime();
              }
            },
            fail() {
              this.error.timeOut();
            }
          }) */
        } else {
          this.error.phoneError();
        }
      },
      //获得输入的验证码
      getInputCode(e) {
        if (e.detail.value.length > 3) {
          this.inputCode = e.detail.value;
          this.$emit('getInputCode', this.inputCode);
        } else {
          this.inputCode = '';
          this.$emit('getInputCode', this.inputCode);
        }
      },
      //60s业务逻辑
      sixtyTime() {
        let that = this;
        if (time <= 0) {
          //按钮可用
          this.isCanGetCode = true;
          this.verCodeBtn = lang.i18n.t('register.inputVerCodeButton');
          time = 60;
          return;
        } else {
          this.isCanGetCode = false;
          this.verCodeBtn = time + 'S';
          time--;
        }
        setTimeout(function() {
          that.sixtyTime();
        }, 1000);
      },
    }
  }
</script>

<style scoped>
  .inputTitle {
    font-size: 26rpx;
    color: #a4a4a4;
    margin: 14rpx 0 14rpx 20rpx;
  }

  .inputCode {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .inputText {
    width: 60%;
    padding: 20rpx;
    border-radius: 16rpx;
    background-color: #f5f7f9;
  }

  .placeholderStyle {
    color: #cfcfcf;
  }

  .getCode {
    line-height: 2.3;
    border-radius: 16rpx;
    margin: 0;
    margin-left: 12rpx;
    padding: 0 20rpx;
    font-size: 36rpx;
    border: 1px solid rgba(0, 0, 0, .2);
    white-space: nowrap;
  }

  .getCode:after {
    border: none;
  }
</style>
