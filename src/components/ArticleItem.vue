<template>
  <!-- 每一篇文章 -->

  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <!-- 只有一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="150" height="75" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 三张图片 -->
  <van-cell v-else :title="articleInfo.title">
    <template #label>
      <div class="imgs">
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="105"
          height="75"
          :src="item"
        />
      </div>
      <p>
        {{ label }}
      </p>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticlesItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style scoped lang="less">
.imgs {
  display: flex;
  justify-content: space-between;
}
</style>
