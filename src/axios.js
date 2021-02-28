import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器
instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => Promise.reject(error));

//  响应拦截器
instance.interceptors.response.use((response) => {
  // 如果请求的数据有误，则返回错误信息,没有则直接返回结果
  console.log(response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error));

export default instance;
