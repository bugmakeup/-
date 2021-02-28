import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态,false表示不闭合
    collapsed: false,
    // 用户信息
    user: {
      username: getUserCookie(),
    },
  },
  mutations: {
    // 点击菜单改变收缩状态
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 改变用户状态的方法
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    // 退出置为空
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
  },
  modules: {
  },
});
