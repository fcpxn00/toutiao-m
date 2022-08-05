<template>
  <div>
    <!-- 搜索框 -->
    <!-- form的作用： 在iOS系统下可以显示搜索按钮-->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 引入组件
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'MySearch',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    componentName() {
      if (!this.keywords) {
        return 'SearchHistory'
      }
      if (!this.isShowSearchResult) {
        return 'SearchSuggestion'
      }
      return 'SearchResult'
    }
  },
  methods: {
    onSearch() {
      console.log('正在搜索')
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
// 搜索框样式
.search {
  // 属性选择器
  [role='button'] {
    color: #fff;
  }
}
</style>
