<template>
  <div>
    <van-cell
      v-for="(item, index) in highligthSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from '@/api'
import { debounce } from 'lodash'

export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  computed: {
    highligthSuggestions() {
      const reg = new RegExp(this.keywords, 'gi')
      return this.SearchSuggestion.map((ele) =>
        ele.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  },
  data() {
    return {
      SearchSuggestion: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 防抖, lodash 实现
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionApi(this.keywords)
        console.log(data)
        // this.SearchSuggestion = data.data.options.fliter((str) => Boolean(str))
        this.SearchSuggestion = data.data.options.fliter(Boolean)
      } catch (err) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
