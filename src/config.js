let network = { // 有效配置项只有三个
  baseURL: 'http://www.flyyn2.top:7300/mock/5e5b702b301a912abe7951c1', //baseURL
  timeout: 1111, // 超时时间
  header: {
    'x-custom-header': 'x-custom-header'
  } // 设置请求头，建议放在请求拦截器中
}

export default {
  network
}
