/**
 * 异常页面路由
 */

import NotFound from '@/page/404'

let router = [
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export default router
