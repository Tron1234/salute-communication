import i18n from 'lang'
//手机号码有误
function phoneError() {
  uni.showToast({
    title: i18n.t('errorToast.phoneError'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}
//密码格式错误
function passwordError() {
  uni.showToast({
    title: i18n.t('errorToast.passwordError'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}
//输入有误
function contentNotNull() {
  uni.showToast({
    title: i18n.t('errorToast.contentNotNull'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}

//请求超时
function timeOut() {
  uni.showToast({
    title: i18n.t('errorToast.timeOut'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}

//密码不一致
function doublePasswordError() {
  uni.showToast({
    title: i18n.t('errorToast.doublePasswordError'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}
//登录失败
function failLogin() {
  uni.showToast({
    title: i18n.t('errorToast.loginFailed'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}
//接口失效
function interFailure() {
  uni.showToast({
    title: i18n.t('errorToast.interfaceFailure'),
    icon: 'none',
    image: '/static/img/common/error.png',
    mask: true
  });
}

export {
  phoneError,
  passwordError,
  contentNotNull,
  timeOut,
  doublePasswordError,
  failLogin,
  interFailure
}
