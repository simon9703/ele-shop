/**
 * px 转 自适应单位
 * @param {*} px
 */
export function pxConvertToUnit(px) {
  let width = 375
  let percent = 100
  let unit = 'vw'
  return px / (width / percent) + unit
}

/**
 * 自适应单位 转 px
 * @param {*} unit
 */
export function unitConvertToPx(unit) {
  let width = 375
  let percent = 100
  return parseFloat(unit) * (width / percent)
}
