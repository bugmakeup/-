<template>
  <div class="home">
    <left-menu :key="key"></left-menu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slider-nav />
      <!-- 右侧路由渲染 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {
      collapsed: false,
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>

<style lang="less">
// ~表示当前路径需要模块是模块
@import url("~@/assets/css/home.less");
</style>
