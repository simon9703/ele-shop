function binarySearch(offsetStart) {
  let cacheItem = [0, 40, 90, 140, 190]
  let left = 0
  let right = Object.keys(cacheItem).length - 1
  // debugger
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    // console.log(mid, left, right)

    if (cacheItem[mid] === offsetStart) {
      return mid
    } else if (cacheItem[mid] > offsetStart) {
      right = mid - 1 // 结尾right 《 left
    } else {
      left = mid + 1
    }
  }
  // console.log('unexpected:', left, right)
  return right // 结果在[min, max]之间
}

export default binarySearch
// console.log('result', binarySearch(160))
