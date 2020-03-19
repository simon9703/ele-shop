/**
 * 首页页面路由
 */

import Home from '@/page/home'
import Test from '@/page/test'
let router = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

export default router
