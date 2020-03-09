<template>
  <view>
    <view class="inputTitle">
      <text decode>{{inputTitle}}</text>
    </view>
    <view class="inputPassword">
      <input class="inputText" type="text" :password="!eyeStatus" :placeholder="placeholder" placeholder-class="placeholderStyle"
        maxlength="20" confirmType="done" @blur="getPassword" />
      <my-icons :type="eyeStatus?'open-eye':'close-eye'" size="20" :color="color" @touchstart="changeOpenEye" @touchend="changeCloseEye" />
    </view>
    <view class="inputTip" :class="inputTipError" v-if="showTip">
      <text decode>{{inputTip}}</text>
    </view>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'inputPhone',
    props: {
      inputTitle: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        require: true
      },
      showTip: {
        type: Boolean,
        default: false
      },
      inputTip: {
        type: String
      }
    },
    data() {
      return {
        eyeStatus: false,
        password: '',
        errorTip: false
      }
    },
    components: {
      myIcons
    },
    methods: {
      changeOpenEye() {
        this.eyeStatus = true
      },
      changeCloseEye() {
        this.eyeStatus = false
      },
      //获取密码
      getPassword(e) {
        //判断密码输入是否为空
        if (e.detail.value.length > 0) {
          if (this.utils.checkPassword(e.detail.value)) {
            this.password = e.detail.value;
            this.errorTip = false;
            this.$emit('getPassword', this.password);
          } else {
            this.password = '';
            this.errorTip = true;
            this.eyeStatus = false;
            this.$emit('getPassword', this.password);
          }
        } else {
          this.password = '';
          this.errorTip = true;
          this.eyeStatus = false;
          this.$emit('getPassword', this.password);
        }
      }
    },
    computed: {
      inputTipError() {
        return this.errorTip ? 'inputTipError' : '';
      },
			color(){
				return this.$store.getters.getHexColor;
			}
    }
  }
</script>

<style scoped>
  .inputTitle {
    font-size: 26rpx;
    color: #a4a4a4;
    margin: 14rpx 0 14rpx 20rpx;
  }

  .inputText {
    width: 90%;
  }

  .inputPassword {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background-color: #f5f7f9;
    border-radius: 16rpx;
  }

  .placeholderStyle {
    color: #cfcfcf;
  }

  .inputTip {
    margin: 8rpx 20rpx 0 20rpx;
    font-size: 24rpx;
    color: #bcbcbc;
  }

  .inputTipError {
    color: #ef4848;
  }
</style>
