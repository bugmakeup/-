import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);
// 商品路由，不同权限用户展示不同的路由信息
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'bank',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'bars',

    },
    // 进行懒加载，去到这个路由才加载这个页面，通过回调函数引入即可
    component: () => import('@/views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,

    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,

    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'database',
      hidden: false,
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 给home进行重定向
    redirect: '/index',
    meta: {
      title: '首页',
      // 是否隐藏
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'pie-chart',

      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,

    },
  },
];

const router = new VueRouter({
  routes,
});

// 路由拦截，用于判断是否是登陆过的用于登陆校验
// 是否已经添加过路由，添加过就不往里添加，默认false
let isAddRoutes = false;
// to是要到那个路由的路径上去
router.beforeEach((to, from, next) => {
  // 要去的页面不是登陆页面
  if (to.path !== '/login') {
    // 判断用户信息是否存在
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        // 添加到路由
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    // 没有用户信息就要跳转到登陆页面
    return next('/login');
  }
  // 向下执行
  return next();
});
export default router;
