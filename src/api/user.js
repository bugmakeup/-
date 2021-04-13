// 对于用户操作的接口管理
import axios from '@/axios';

export default {
  login(params) {
    // params是传递过来的信息
    return axios.post('/passport/login', params);
  },
};
