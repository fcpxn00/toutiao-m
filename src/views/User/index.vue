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

    <!-- 昵称 -->
    <van-cell
      is-link
      @click="showNickNamePopup"
      :value="userInfo.name"
      title="昵称"
    />
    <!-- 昵称弹层 -->
    <van-popup
      v-model="isShowEditNickName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 导航区域 -->
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <!-- 输入区域 -->
      <van-field
        v-model="userInfo.name"
        rows="3"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>

    <!-- 性别 -->
    <van-cell
      is-link
      @click="showGenderPopup"
      :value="userInfo.gender ? '男' : '女'"
      title="性别"
    />
    <!-- 性别弹层 -->
    <van-popup
      v-model="isShowEditGender"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-picker
        title="更新性别"
        :default-index="index"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>

    <!-- 生日 -->
    <van-cell
      is-link
      @click="showBirthdayPopup"
      :value="userInfo.birthday"
      title="生日"
    />
    <!-- 生日弹层 -->
    <van-popup
      v-model="isShowEditBirthday"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmBirthday"
        @cancel="onCancelBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi, editUserInfoApi } from '@/api'
import { resolveToBase64 } from '@/utils/index'
import UpdataAvator from './components/UpdataAvator.vue'
import moment from 'moment'
export default {
  name: 'MyUser',
  components: {
    UpdataAvator
  },
  data() {
    return {
      userInfo: {},
      isShowAvthor: false,
      photo: '',
      isShowEditNickName: false,
      isShowEditGender: false,
      isShowEditBirthday: false,
      columns: ['男', '女'],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: '',
      index: ''
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
        const arr = data.data.birthday.split('-')
        // console.log(arr)
        this.currentDate = new Date(arr[0], arr[1] - 1, arr[2])
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
    },
    // 更新昵称
    showNickNamePopup() {
      this.isShowEditNickName = true
    },
    async onClickLeft() {
      // Toast('返回')
      const { data } = await getUserInfoApi()
      this.userInfo = data.data
      this.isShowEditNickName = false
    },
    async onClickRight() {
      try {
        await editUserInfoApi(this.userInfo.name)
        // console.log(res)
        this.$toast.success('更新成功')
        this.isShowEditNickName = false
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },

    // 更改性别
    showGenderPopup() {
      this.isShowEditGender = true
    },
    async onConfirm(value) {
      let val = ''
      if (value === '男') {
        val = 1
      } else {
        val = 0
      }
      try {
        await editUserInfoApi(this.userInfo.name, val)
        const { data } = await getUserInfoApi()
        this.userInfo = data.data

        this.$toast.success('更新成功')
        this.isShowEditGender = false
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.index = index
    },
    async onCancel() {
      this.$toast('取消')
      this.isShowEditGender = false
    },

    // 更新生日
    showBirthdayPopup() {
      this.isShowEditBirthday = true
    },
    async onConfirmBirthday(value) {
      const val = moment(value).format('YYYY-MM-DD')
      try {
        await editUserInfoApi(this.userInfo.name, this.userInfo.gender, val)
        const { data } = await getUserInfoApi()
        this.userInfo = data.data

        this.$toast.success('更新成功')
        this.isShowEditBirthday = false
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    async onCancelBirthday() {
      this.$toast('取消')
      this.isShowEditBirthday = false
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
