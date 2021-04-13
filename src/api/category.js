// 所有类目接口

import axios from '@/axios';

export default {
  // 列表(列表数据)
  list(params) {
    // get方法第二个参数传的是个对象,aixos拿到数据返回的是一个promise对象
    return axios.get('/category/all', { params });
  },
};
