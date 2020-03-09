<template>
  <view>
    <view class="inputTitle">
      <text decode>{{inputTitle}}</text>
    </view>
    <view class="inputPhone">
      <input class="inputText" type="number" :placeholder="placeholder" placeholder-class="placeholderStyle" maxlength="11"
        confirmType="next" @blur="checkPhoneNum" />
      <my-icons :class="hidden" type="right" size="20" :color="color" />
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
      }
    },
    data() {
      return {
        phoneIsTrue: false,
        phoneNum: ''
      }
    },
    components:{
      myIcons
    },
    methods: {
      checkPhoneNum(e) {
        if (e.detail.value.length > 5) {
          if (this.utils.checkMobile(e.detail.value)) {
            this.phoneIsTrue = true;
            this.phoneNum = e.detail.value;
            this.$emit('getPhone', this.phoneNum);
          } else {
            this.phoneNum = '';
            this.$emit('getPhone', this.phoneNum);
          }
        } else {
          this.phoneIsTrue = false;
          this.phoneNum = '';
          this.$emit('getPhone', this.phoneNum);
        }
      }
    },
    computed: {
      hidden() {
        return this.phoneIsTrue ? '' : 'hidden';
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

  .inputPhone {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background-color: #f5f7f9;
    border-radius: 16rpx;
  }

  .hidden {
    visibility: hidden;
  }

  .placeholderStyle {
    color: #cfcfcf;
  }
</style>
