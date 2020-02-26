// ;(function(designWidth, remWidth) {
//   let doc = document.documentElement
//   let width
//   let count = 1
//   let percent
//   let resize = function() {
//     console.log('change rem!', screen.orientation.angle)
//     width = doc.clientWidth
//     percent = remWidth * (width / designWidth)
//     doc.style.fontSize = `${percent}px`
//   }
//   resize()
//   window.addEventListener(
//     'resize',
//     () => {
//       resize()

//       count++
//       document.getElementById('resize').textContent = `resize: ${count}-- ${percent} -- ${screen.orientation.angle}`
//     },
//     false
//   )
//   // window.addEventListener('orientationchange', () => {})
// })(750, 100)
