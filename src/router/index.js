import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const ayn

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 子路由
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// 路由导航钩子
// 跳转路由之前使用的回调函数
router.beforeEach((to, from, next) => {
  // 不是登录页面就需要判断是否登录,没有登录信息就跳转到登录页面
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
