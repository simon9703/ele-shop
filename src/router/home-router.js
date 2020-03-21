/**
 * 首页页面路由
 */

import Home from '@/page/home'
import Order from '@/page/order'
import Discover from '@/page/discover'
import Info from '@/page/info'

import Test from '@/page/test'
let router = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

export default router
