<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round class="search-btn" icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannel" :key="item.id" :title="item.name">
        <articles-list :id="item.id"></articles-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannel="myChannel"
        @change="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelApi,
  delMyChannel,
  addChannel,
  setMyChannelToLoacl,
  getMyChannelByLoacl
} from '@/api'
import ArticlesList from './components/ArticlesList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'MyHome',
  components: {
    ArticlesList,
    ChannelPopup
  },
  data() {
    return {
      active: 0,
      myChannel: [],
      show: false
    }
  },
  created() {
    this.initMyChannel()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    // 初始化频道
    initMyChannel() {
      if (this.isLogin) {
        // 用户登录
        this.getMyChannel()
      } else {
        // 用户未登录
        const myChannel = getMyChannelByLoacl()
        if (myChannel) {
          // 有数据
          this.myChannel = myChannel
        } else {
          // 没有数据
          this.getMyChannel()
        }
      }
    },

    async getMyChannel() {
      try {
        const { data } = await getMyChannelApi()
        this.myChannel = data.data.channels
        // console.log(data)
      } catch (err) {
        console.dir(err)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    // 删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })

      try {
        const newMyChannel = this.myChannel.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delMyChannel(id)
        } else {
          setMyChannelToLoacl(newMyChannel)
        }

        this.myChannel = newMyChannel
        this.$toast.success('删除频道成功~')
      } catch (err) {
        this.$toast.fail('删除频道失败！')
      }
    },
    // 增加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })

      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannel.length)
        } else {
          setMyChannelToLoacl([...this.myChannel, channel])
        }

        this.myChannel.push(channel)
        this.$toast.success('添加频道成功~')
      } catch (err) {
        this.$toast.fail('添加频道失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 1.2267rem;
  left: 0;
  z-index: 99;
  padding-right: 66px;
  background-color: #fff;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: fixed;
  top: 1.2rem;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 1.3333rem;
  overflow: auto;
}
</style>
