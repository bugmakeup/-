// 产品接口文件

import axios from '@/axios';

export default {
  // 获取列表
  list(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
  add(params) {
    return axios.post('/products/add', params);
  },
  detail(id) {
    return axios.get(`/products/${id}`);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
};
