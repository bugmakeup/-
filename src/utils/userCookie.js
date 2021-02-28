import Cookies from 'js-cookie';
/**
 * 信息
 * @param {*} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

// 获取用户的cookie信息
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}
//
export function setUserCookie({
  username, appkey, role, email,
}) {
  Cookies.set('username', username);
  Cookies.set('appkey', appkey);
  Cookies.set('role', role);
  Cookies.set('email', email);
}

// 移除cookie信息
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
