<template>
  <view class="flexVerCenter nextButtonBox">
    <view :class="[leftText]">
      <text decode>{{text}}</text>
    </view>
    <view class="flexCenter" :class="[rightButton]">
      <slot name="buttonIcon"></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'nextButton',
    data() {
      return {
        color: this.$store.state.chooseMainColor
      }
    },
    props: {
      text: {
        type: String,
        required: true
      }
    },
    computed: {
      leftText(){
        let temp=['leftText_orange','leftText_blue','leftText_green','leftText_pink'];
        return this.utils.mainColorStyle(this.color,temp);
      },
      rightButton(){
        let temp=['rightButton_orange','rightButton_blue','rightButton_green','rightButton_pink'];
        return this.utils.mainColorStyle(this.color,temp);
      }
    }
  }
</script>

<style scoped>
  .nextButtonBox {
    justify-content: space-between;
  }
</style>
