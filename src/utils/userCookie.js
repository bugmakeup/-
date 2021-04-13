// 该文件用户存储用户信息到cookie
import Cookies from 'js-cookie';
/**
 * 添加cookie
 * @param {Object} info 用户所有信息
 */
export function setCookie(info) {
  // 将info信息转换为二维数组，索引项为0是key值，为1是value值
  const arr = Object.entries(info);
  // 遍历，对key和value的关系进行
  for (let i = 0; i < arr.length; i += 1) {
    // i的第0项作为key值，i的第1项作为value值
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

// 获取用户的cookie信息
export function getUserCookie() {
  return {
    // 调用get方法获取到信息
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

// 设置用户cookie
export function setUserCookie({
  username, appkey, role, email,
}) {
  Cookies.set('username', username);
  Cookies.set('appkey', appkey);
  Cookies.set('role', role);
  Cookies.set('email', email);
}

// 移除用户的cookie信息
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
