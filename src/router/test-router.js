import HelloWorld from '@/components/test/HelloWorld'
import VirtualScroll from '@/components/test/VirtualScroll'
import Stage from '@/components/test/Stage'
import Home from '@/components/test/Home'

let router = [
  {
    path: '/test',
    name: 'test',
    component: Home,
    children: [
      {
        path: 'hello',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: 'virtual',
        name: 'virtual',
        component: VirtualScroll
      },
      {
        path: 'stage',
        name: 'stage',
        component: Stage
      }
    ]
  }
]
export default router
