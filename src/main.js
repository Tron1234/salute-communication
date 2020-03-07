import Vue from 'vue'
import App from './App'
import store from './store'
import lang from 'lang'
import * as utils from 'js/utils'
import * as error from 'js/errorToast'
import config from './config'
import uni_request from 'js/uni_request'

Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype._i18n = lang.i18n
Vue.prototype.utils = utils
Vue.prototype.error = error
Vue.prototype._request = uni_request(config.network)

App.mpType = 'app'

const app = new Vue({
  ...App,
  i18n:lang.i18n,
  store
})
app.$mount()
