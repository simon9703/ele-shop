import Vue from 'vue'

import GlobalMask from '@/components/global/base-mask'
Vue.use(GlobalMask)

const requireAll = ctx => ctx.keys().map(key => ctx(key)) // 引入上下文

/**
 * 自动引入图标SVG
 */
let iconCtx = require.context('@/assets/icon', true, /\.svg$/)
requireAll(iconCtx)

/**
 * 自动引用common下自定义组件
 */
let componentsCtx = require.context('@/components/common', true, /\.vue$/)
componentsCtx.keys().forEach(element => {
  let filename = element.match(/.*\/([\w-]+)\.vue$/)[1] // 组件文件名必须是 helloWorld 或 hello-world 格式
  Vue.component(filename, componentsCtx(element).default)
})
