// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import './util/rem'
import './style/initial.css'

import './util/auto-import'
import './util/permission'

// import SvgIcon from './components/svg-icon'
Vue.config.productionTip = false

// Vue.component('svg-icon', SvgIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
