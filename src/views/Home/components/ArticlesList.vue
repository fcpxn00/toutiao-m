<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articles-item
          v-for="item in Articles"
          :key="item.art_id"
          :articleInfo="item"
        ></articles-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesApi } from '@/api'
// 引入组件
import ArticlesItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticlesList',
  components: {
    ArticlesItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      Articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取第一页的数据
    async getFirstPageArticle() {
      try {
        const { data } = await getArticlesApi(this.id, +new Date())
        this.Articles = data.data.results

        this.pre_timestamp = data.data.pre_timestamp
        console.log(data)
      } catch (err) {
        this.$toast.fail('请刷新后重新获取')
      }
    },
    // 加载下一页文章
    async loadNextPageArticle() {
      try {
        const { data } = await getArticlesApi(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        if (timestamp === null) {
          this.finished = true
        }
        if (this.refreshing) {
          this.Articles.unshift(...results)
        } else {
          this.Articles.push(...results)
        }

        this.pre_timestamp = timestamp
        // console.log(data)
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
