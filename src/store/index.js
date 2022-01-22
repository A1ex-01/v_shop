import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from "./user"
import userManager from "./userManager"
export default new Vuex.Store({
  modules: {
    // 分块管理
    user,
    userManager
  }
})
