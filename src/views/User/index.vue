<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 用户信息 -->
    <!-- input:file的属性 -->
    <!-- accept: 限制file选择的文件后缀名; hidden: 隐藏input -->
    <van-cell title="头像" is-link>
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="userInfo.photo"
        @click="$refs.file.click()"
      />
      <!-- 用户选择文件的表单 -->
      <input
        type="file"
        hidden
        accept=".png,.jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvthor"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <updata-avator
        :photo="photo"
        v-if="isShowAvthor"
        @uploadAvatar="userInfo.photo = $event"
      ></updata-avator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import UpdataAvator from './components/UpdataAvator.vue'
import { resolveToBase64 } from '@/utils/index'
export default {
  name: 'MyUser',
  components: {
    UpdataAvator
  },
  data() {
    return {
      userInfo: {},
      isShowAvthor: false,
      photo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoApi()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail('获取用户信息失败，请刷新重试')
      }
    },
    // 用户选择了图片
    async selectPhoto(e) {
      // 1.获取用户选择的图片的文件对象
      // - e.target 是触发事件的元素
      //! - e.target.files 伪数组，存储的用户选择所有的文件对象
      // console.log(e.target.files)

      const file = e.target.files[0]

      // 2.把file文件对象处理成img标签可识别的url
      //! window.URL.createObjectURL(file) --> img标签可识别的url
      // const url = window.URL.createObjectURL(file)

      const url = await resolveToBase64(file)

      // 3.传递url
      this.photo = url
      // 4.清空value，让用户可以选择同一张图片
      e.target.value = ''
      // 展示弹层
      this.isShowAvthor = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
