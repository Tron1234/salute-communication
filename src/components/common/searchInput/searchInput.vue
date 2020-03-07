<template>
  <view class="searchInputBox flexVerCenter">
    <view class="searchInput flexVerCenter">
      <view class="flexVerCenter">
        <slot name="searchIcon"></slot>
        <input class="searchInputStyle" focus type="text" v-model="searchKey" :placeholder="searchPlaceholder"
          placeholder-class="searchPlaceholder" confirm-type="search" @confirm="getSearchKey" @input="seekValue" />
      </view>
      <view v-show="isClear">
        <my-icons class="clearInput" type="search-clear" size="15" color="#c4c4c4" @tap="clearSearch" />
      </view>
    </view>
    <text :class="cancelBtn" @tap="cancelInput">{{cancel}}</text>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  export default {
    name: 'searchInput',
    props: {
      searchPlaceholder: {
        type: String,
        require: true
      },
      cancel: {
        type: String,
        require: true
      }
    },
    components: {
      myIcons
    },
    data() {
      return {
        color: this.$store.state.chooseMainColor,
        searchKey: '',
        isClear: false
      }
    },
    methods: {
      cancelInput() {
        uni.navigateBack({
          animationType: 'slide-out-top'
        })
      },
      getSearchKey(e) {
        this.$emit('getSearchKey', e.detail.value);
      },
      seekValue(e) {
        if (this.searchKey.length > 0) {
          this.isClear = true;
        } else {
          this.isClear = false;
        }
      },
      clearSearch() {
        this.searchKey = "";
        this.isClear = false;
      }
    },
    computed: {
      cancelBtn() {
        let temp = ['color_orange', 'color_blue', 'color_green', 'color_pink'];
        return this.utils.mainColorStyle(this.color, temp);
      }
    }
  }
</script>

<style scoped>
  /* #ifndef MP*/
  .searchInputBox {
    margin-top: 10rpx;
    border-bottom: 1px solid #dedede;
    z-index: 2;
  }

  /* #endif*/
  /* #ifdef MP*/
  .searchInputBox {
    margin-top: 70rpx;
    border-bottom: 1px solid #dedede;
    z-index: 2;
  }

  /* #endif*/
  .searchInput {
    width: 80%;
    font-size: 32rpx;
    margin: 10rpx 14rpx;
    padding: 6rpx 12rpx;
    border-radius: 30rpx;
    text-overflow: ellipsis;
    background-color: #f3f3f3;
    color: #757575;
    justify-content: space-between;
  }

  .searchInputStyle {
    width: 85%;
  }

  .searchPlaceholder {
    font-size: 28rpx;
    color: #b1b1b1;
  }

  .clearInput {
    position: relative;
    top: 2rpx;
  }
</style>
