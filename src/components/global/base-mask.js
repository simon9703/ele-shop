import Vue from 'vue'
import BaseMask from '@/components/common/BaseMask'
import { pxConvertToUnit, unitConvertToPx } from '@/util/common' // 使用自适应单位
let BaseMaskConstrucor = Vue.extend(BaseMask) // 组件
let instance = null // 当前实例（单例）
let closeRelationFn // 调用组件关闭时，回调函数
let stayScrollDistance // 保留lockBody时vm单位
/**
 * body设置fixed，阻止滑动
 */
function lockBody() {
  let top = document.documentElement.scrollTop || document.body.scrollTop // 获取fixed前滚动距离
  stayScrollDistance = pxConvertToUnit(top)
  document.body.style.position = 'fixed'
  // document.body.style.top = `-${top}px`
  document.body.style.top = `-${stayScrollDistance}`
  document.body.style.width = '100%'
}

/**
 * body恢复正常文档流
 */
function unlockBody() {
  document.body.style.position = ''
  document.body.style.width = ''
  // document.documentElement.scrollTop = document.body.scrollTop = -parseFloat(document.body.style.top) // -npx 转化成数值
  document.documentElement.scrollTop = document.body.scrollTop = unitConvertToPx(stayScrollDistance)
  document.body.style.top = ''
}

/**
 * 关闭body-fixed
 */
function close() {
  if (!instance) return
  unlockBody()

  closeRelationFn && closeRelationFn() // 关闭回调
  instance.$el.parentNode.removeChild(instance.$el)
  instance = null
}

function install(vue, options) {
  // options: Vue.use时传入参数

  Vue.prototype.$mask = function(fn) {
    if (instance) return // 当前实例已经存在时跳过
    closeRelationFn = fn // 关闭时，触发父组件函数
    instance = new BaseMaskConstrucor()
    instance.$mount() // 可挂载到指定节点，指定如#app(替换)。
    document.body.appendChild(instance.$el) // 在内存中创建后，手动挂载。
    lockBody()
  }

  // 设置在function $mask中的static属性
  Vue.prototype.$mask.open = Vue.prototype.$mask
  Vue.prototype.$mask.close = close
}

export default install
