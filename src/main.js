// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './style/initial.css'

import axios from './util/api'
import './util/auto-import'
import './util/permission'

Vue.config.productionTip = false
Vue.prototype.request = axios // 全局注册 ==> this.xx

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
