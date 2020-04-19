/**
 * 首页页面路由
 */

import Home from '@/page/home'
import GoodsDetail from '@/page/goods-detail'
import Order from '@/page/order'
import Discover from '@/page/discover'
import Info from '@/page/info'

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
    path: '/goods-detail',
    name: 'GoodsDEtail',
    component: GoodsDetail
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
    path: '/order/detail',
    name: 'OrderDetail',
    component: () => import('@/page/order-detail')
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  }
]

export default router
