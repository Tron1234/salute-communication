<template>
  <view class="searchHistoryBox">
    <view class="historyTitle">
      {{historyTitle}}
    </view>
    <view class="searchHistoryContent">
      <view class="historyRecord" v-for="(item,index) in searchResult" :key="index">
        {{item}}
      </view>
    </view>
    <view class="clearHistory" @tap="clearHistory">
      <my-icons class="clearIcons" type="clear-history" size="15" color="#9a9a9a" />
      {{clearTitle}}
    </view>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'history',
    props: {
      historyTitle: {
        type: String,
        require: true
      },
      searchResult: {
        type: Array,
        require: true
      },
      clearTitle: {
        type: String,
        require: true
      }
    },
    components: {
      myIcons
    },
    methods: {
      clearHistory() {
        this.$emit('clearHistory');
      }
    }
  }
</script>

<style scoped>
  .searchHistoryBox {
    margin: 0 20rpx;
    z-index: 1;
  }

  .searchHistoryContent {
    display: flex;
    flex-wrap: wrap;
  }

  .historyRecord {
    white-space: nowrap;
    border-radius: 30rpx;
    padding: 6rpx 14rpx;
    background-color: #f1f1f1;
    color: #757575;
    margin: 8rpx 20rpx;
  }

  .clearHistory {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 24rpx;
    color: #9a9a9a;
    white-space: nowrap;
  }

  .historyTitle {
    font-size: 28rpx;
    color: #7f7f7f;
    margin: 16rpx 10rpx 10rpx 0rpx;
  }

  .clearIcons {
    position: relative;
    top: 2rpx;
  }
</style>
