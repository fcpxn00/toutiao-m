<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            native-type="button"
            class="code-btn"
            v-if="isShowCode"
            @click="sendCode"
          >
            获取验证码
          </van-button>
          <van-count-down
            :time="60 * 1000"
            format="ss 秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCodeApi } from '@/api'

export default {
  name: 'MyLogin',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // 表单验证不成功  不会触发

      // q1: res是什么？
      // - axios封装的对象，它把服务端返回的数据放在res.data里

      // q2: res是什么？
      // - Promise的resolve的值

      // q3: error是什么？
      // - Promise的reject的结果
      // - axios封装的error
      // - error.response.data是服务端返回的数据
      // - error.response.status 是服务端返回的状态码
      this.loading()
      try {
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        // console.log(res)
        this.$store.commit('SET_TOKEN', token)
        this.$router.push('/my')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        console.log(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 1. 验证手机号
      this.$refs.from.validate('mobile').then(async () => {
        this.loading()

        try {
          // 2. 发送请求
          await getCodeApi(this.mobile)
          this.$toast.success('获取验证码成功')
          // 显示验证码
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'

          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// 穿透样式
// 语法：
// :deep(需穿透的类名)
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-button--info {
  background-color: #6db4fb;
  border: 0.02667rem solid #6db4fb;
}
.toutiao {
  font-size: 0.48rem;
}
:deep(.from) {
  .van-field__label {
    flex: 1;
    margin-right: 0.1rem;
  }
  .van-cell__value {
    flex: 20;
  }
}

// 验证码样式
.code-btn {
  padding: 0 0.26667rem;
  background-color: #eee;
  color: #917b66;
}
</style>
