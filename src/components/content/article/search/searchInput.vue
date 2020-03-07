<template>
  <view>
    <uni-status-bar />
    <search-input :searchPlaceholder="$t('article.search.searchPlaceholder')" :cancel="$t('cancel')" @getSearchKey="getSearchKey">
      <template v-slot:searchIcon>
        <my-icons class="searchIcon" type="search-icon" size="20" color="#b1b1b1"/>
      </template>
    </search-input>
  </view>
</template>

<script>
  import myIcons from "common/my-icons/my-icons";
  import uniStatusBar from "common/navBar/uni-status-bar/uni-status-bar";
  import searchInput from 'common/searchInput/searchInput'
  export default {
    name: 'searchInput',
    components: {
      searchInput,
      uniStatusBar,
      myIcons
    },
    methods: {
      getSearchKey(key) {
        this.$emit('getSearchKey', key);
      }
    }
  }
</script>

<style scoped>
  .searchIcon {
    margin: 0 6rpx;
    position: relative;
    top:4rpx;
  }
</style>
