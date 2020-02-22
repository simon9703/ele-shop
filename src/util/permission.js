import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // 去掉spiner转圈动画

router.beforeEach((to, from, next) => {
  NProgress.start() // 显示进度条
  next()
})

router.afterEach(() => {
  NProgress.done() // 加载完成
})
