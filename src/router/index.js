import Router from 'vue-router'
import Vue from 'vue'

import Home from './home-router'
import TestRouter from './test-router'
import ExceptionRouter from './exception-router'
Vue.use(Router)

console.log(TestRouter)

export default new Router({
  routes: [...Home, ...TestRouter, ...ExceptionRouter]
})
