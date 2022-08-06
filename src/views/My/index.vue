<template>
  <div>
    <!-- 头部 -->
    <header class="login" v-if="isLogin">
      登录后的盒子
      <button @click="$router.push('/user')">编辑资料</button>
    </header>
    <header class="logout" v-else>未登录盒子</header>
    <!-- 中间 -->
    <main>收藏/历史/消息通知/小智同学</main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MyMy',
  computed: {
    isLogin() {
      // 两个 !! 转化为布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
