/**
 * 首页页面路由
 */

import Home from '@/page/home'
import Category from '@/page/category'
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
    component: () => import('@/page/goods-detail')
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
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
