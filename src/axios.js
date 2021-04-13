import axios from 'axios';
import store from '@/store/index';

// 创建axios实例
const instance = axios.create({
  // 基础路径
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器，发送数据请求的拦截
instance.interceptors.request.use((config) => {
  // appkey可用写在请求拦截器中
  // 判断当前接口是否是用户信息的接口
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
  // 被拒绝的回调函数
}, (error) => Promise.reject(error));

//  响应拦截器,拿到响应的数据
instance.interceptors.response.use((response) => {
  console.log(response);
  // 如果请求的数据有误，则返回错误信息,没有则直接返回结果
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
