/**
 * 存储的是 角色对应的权限名称
 */
const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  },
  {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  },
  {
    name: 'Category',
  }, {
    name: 'ProductEdit',
  }],
};

// 用来返回一个最终需要的路由
/**
 * 过滤没有权限的路由
 * @param {String} role
 * @param {Array} routers
 */
export default function getMenuRouter(role, routes) {
  const allowRouteName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;// 这里浅层克隆了一下
    if (allowRouteName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRouteName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
