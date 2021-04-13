import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  // 状态管理
  state: {
    // 用于切换菜单的闭合状态,false表示不闭合
    collapsed: false,
    // 用户信息，一进入页面就需要获取用于信息
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  // 改变状态的一些方法;mutations是同步的
  mutations: {
    // 点击菜单改变收缩状态
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 改变用户状态的方法
    setUserInfo(state, userInfo) {
      state.user = userInfo;
      setCookie(userInfo);
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
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      // 把userInfo设置到cookie里
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      // 退出登陆时调用，就移除用于信息
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
