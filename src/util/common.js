/**
 * px 转 自适应单位
 * @param {*} px
 */
export function pxConvertToUnit(px) {
  let width = window.innerWidth
  let percent = 100
  let unit = 'vw'
  return px / (width / percent) + unit
}

/**
 * 自适应单位 转 px
 * @param {*} unit
 */
export function unitConvertToPx(unit) {
  let width = window.innerWidth
  let percent = 100
  return parseFloat(unit) * (width / percent)
}

/**
 * 随机整数
 * @param {*} start  一个参数: [0,start]
 * @param {*} end  两个参数: [start,end]
 */
export function random(start = 0, end = 0) {
  let gap
  if (end === 0) {
    gap = start
    start = 0
  } else {
    gap = end - start
  }
  return Math.floor(Math.random() * (gap + 1)) + start
}

/**
 * 随机色彩
 * @param {透明度是否变化} alpha
 */
export function randomColor(alpha = false) {
  if (typeof alpha === 'number' || typeof alpha === 'string') {
    return `rgba(${random(255)}, ${random(255)}, ${random(255)}, ${alpha})`
  } else if (!alpha) {
    return `rgba(${random(255)}, ${random(255)}, ${random(255)})`
  } else {
    return `rgba(${random(255)}, ${random(255)}, ${random(255)}, ${Math.random()})`
  }
}
