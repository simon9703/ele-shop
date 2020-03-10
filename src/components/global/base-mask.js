import Vue from 'vue'
import BaseMask from '@/components/common/BaseMask'

let BaseMaskConstrucor = Vue.extend(BaseMask)
let Mask = {
  initData: {
    // 初始设置
    show: true,
    during: 1200
  },
  timeId: null,
  instance: null, // 当前实例
  close: () => {
    if (!Mask.instance) return
    Mask.instance.$el.parentNode.removeChild(Mask.instance.$el)
    Mask.instance = null
    document.body.style.overflow = ''
    if (Mask.timeId) {
      clearTimeout(Mask.timeId)
    }
  },
  install: (vue, options) => {
    // options: Vue.use时传入参数
    Vue.prototype.$mask = function(message) {
      if (Mask.instance) return // 已经存在时跳过

      Mask.instance = new BaseMaskConstrucor({
        data: {
          // 覆盖组件中的属性
          ...Mask.initData,
          ...options,
          message: message
        }
      })
      console.log('instance:', Mask.instance)

      Mask.instance.$mount() // 可挂载到指定节点，指定如#app(替换)。
      document.body.appendChild(Mask.instance.$el) // 在内存中创建后，手动挂载。
      document.body.style.overflow = 'hidden'

      // Mask.timeId = setTimeout(() => {
      //   // instance.show = false
      //   Mask.close()
      // }, 3000)
    }
    Vue.prototype.$mask.close = Mask.close
  }
}

export default Mask
