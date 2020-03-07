<template>
  <view>
    <search-history :searchResult="searchResult" :historyTitle="$t('article.search.historyTitle')" :clearTitle="$t('article.search.clearHistory')" @clearHistory="clearHistory" />
  </view>
</template>

<script>
  import searchHistory from 'common/searchInput/searchHistory'
  export default {
    name: 'searchHistory',
    props: {
      searchResult: {
        type: Array,
        require: true
      }
    },
    components: {
      searchHistory
    },
    methods: {
      clearHistory() {
        this.$emit('clearHistory');
      }
    }
  }
</script>

<style>
</style>
