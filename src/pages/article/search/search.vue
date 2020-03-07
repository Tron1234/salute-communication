<template>
  <view class="searchBox">
    <search-input @getSearchKey="getSearchKey" />
    <scroll-view :style="{height:(windowHeight-96)+'px'}" scroll-y>
      <search-history :class="hiddenSearch" :searchResult="searchKey" @clearHistory="clearHistory" />
    </scroll-view>
  </view>
</template>

<script>
  import searchInput from 'content/article/search/searchInput'
  import searchHistory from 'content/article/search/searchHistory'
  let history;
  export default {
    name: 'search',
    data() {
      return {
        windowHeight: uni.getSystemInfoSync().windowHeight,
        isShowHistory: false, //是否有历史记录
        search: []
      }
    },
    components: {
      searchInput,
      searchHistory
    },
    methods: {
      getSearchKey(key) {
        //存储搜索关键字进storage
        if (history.length > 0) {
          history.reverse();
        }
        history.push(key);
        uni.setStorageSync('searchKey_article', history);
        this.search = history.reverse();
        this.isShowHistory = true;
        //查询请求
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
      },
      clearHistory() {
        history = [];
        this.search = [];
        uni.removeStorageSync('searchKey_article');
        this.isShowHistory = false;
      }
    },
    computed: {
      searchKey: {
        set(searchKey) {
          searchKey = history;
        },
        get() {
          return this.search;
        }
      },
      hiddenSearch() {
        return this.isShowHistory ? '' : 'hiddenHistory'
      }
    },
    onLoad() {
      /* uni.removeStorageSync('searchKey_article'); */
      history = uni.getStorageSync('searchKey_article');
      if (history == '' || history.length < 1) {
        history = [];
        this.isShowHistory = false;
      }
      if (history.length > 0) {
        this.search = history.reverse();
        this.isShowHistory = true;
      }
    }
  }
</script>

<style scoped>
  .searchBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fcfcfc;
  }

  .hiddenHistory {
    display: none;
  }
</style>
