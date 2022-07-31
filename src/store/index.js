import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
// vuex
//  - 本质就是仓库，存放数据
//  - vuex的数据是响应式的

// 怎么修改vuex里的数据
//  - vuex的数据是自产自销的，必须在vuex里修改
//  - mutations 定义方法去修改，在外界调用这个方法
//  - mutations 方法建议是大写
//  - mutations里的方法 可以接收到两个参数，一个是state，一个是payload
//  - $store.commit('方法名字')用于触发mutations里的方法
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    // payload 形参  接受外界调用时传递过来的值
    SET_NUM(state, payload) {
      // 将token存入vuex
      state.tokenObj = payload
      // token存入本地存储中
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
