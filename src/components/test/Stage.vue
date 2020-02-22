<template>
  <div class="container">
    <div style="display: flex;flex-direction:column">
      <button @click="addScroll(1)">+5000</button>
      <button @click="addScroll(2)">-5000</button>
    </div>
    <div class="wrap" ref="wrap" @scroll="handleScroll">
      <div class="content" ref="content">
        <div
          class="item"
          :style="{height: ele % 3 * 10 + 40 + 'px'}"
          v-for="ele in visibleData"
          :key="ele"
        >
          <span>这是第--</span>
          <span>{{ele}}</span>
          <span>--个元素！！</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const initData = {
  bufferCount: 0,
  data: [],
  estimatedItemHeight: 50, // 预设值。比评价值要小，在展示时减少都是小元素时留白，但会增加渲染条数。
  itemSizeGetter(item) {
    return (item % 3) * 10 + 40
  }
}

const total = 200000
for (let i = 0; i < total; i++) {
  initData.data.push(i)
}

export default {
  data() {
    return {
      ...initData,
      visibleCount: 0, // 可见条数
      visibleData: [], // 需要渲染数据
      cacheItem: { 0: 0 }, // 缓存计算过item顶部padding
      lastMeasure: 0
    }
  },
  methods: {
    addScroll(flag) {
      if (flag === 1) {
        this.$refs.wrap.scrollTop = this.$refs.wrap.scrollTop + 5000 * 50
      } else {
        this.$refs.wrap.scrollTop = this.$refs.wrap.scrollTop - 5000 * 50
      }
    },
    // // 总高度
    // contentHeight() {
    //   return this.estimatedItemHeight * (this.data.length - this.visibleCount - this.lastMeasure) +
    //     this.cacheItem[this.lastMeasure]
    // },
    // 二分查找 ---> 找到对应区间[result, -----target-----, target+1)
    binarySearch(target) {
      let left = 0
      let right = Object.keys(this.cacheItem).length - 1
      while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (this.cacheItem[mid] === target) {
          return mid
        } else if (this.cacheItem[mid] > target) {
          right = mid - 1 // 未匹配到时，right < left 且 right < target
        } else {
          left = mid + 1
        }
      }
      return right
    },
    // 找到滚动栏顶部停留在item的index（起始位置显示的item）
    findNearestItemIndex(offsetStart) {
      if (this.cacheItem[this.lastMeasure] >= offsetStart) {
        return this.binarySearch(offsetStart)
      } else {
        let sum = this.cacheItem[this.lastMeasure]
        for (let i = this.lastMeasure, len = this.data.length; i < len; i++) {
          sum += this.itemSizeGetter(this.data[i])
          this.cacheItem[i + 1] = sum // 更新缓存
          this.lastMeasure = i + 1
          if (sum >= offsetStart) {
            return i
          }
        }
        return 0
      }
    },
    getItemOffset(index) {
      const { lastMeasure, cacheItem } = this
      if (lastMeasure >= index) {
        return cacheItem[index]
      } else {
        let sum = cacheItem[lastMeasure]
        for (let i = lastMeasure; i <= index; i++) {
          sum += this.itemSizeGetter(this.data[i])
          this.cacheItem[i + 1] = sum // 更新缓存
          this.lastMeasure = i + 1
        }
        return sum
      }
    },
    updateVisibleData(offsetStart) {
      const start = this.findNearestItemIndex(offsetStart)
      // const end = start + this.visibleCount + 1 // +1 在滑动过程中，可能出现start、end各一半。实际显示元素+1
      const end = this.findNearestItemIndex(offsetStart + this.$refs.wrap.clientHeight) + 1
      this.visibleData = this.data.slice(start, end + 1)
      this.$refs.content.style.paddingTop = this.getItemOffset(start) + 'px'
      // 总高度 paddingTop + visibleHeight + paddingBottom
      this.$refs.content.style.paddingBottom =
        (this.data.length - this.lastMeasure) * this.estimatedItemHeight +
        this.cacheItem[this.lastMeasure] -
        this.cacheItem[end] +
        'px'
    },
    handleScroll() {
      // 滚动事件
      const offsetStart = this.$refs.wrap.scrollTop
      this.updateVisibleData(offsetStart)
    }
  },
  mounted() {
    this.visibleCount = Math.ceil(this.$refs.wrap.clientHeight / this.estimatedItemHeight) + this.bufferCount
    this.handleScroll()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.wrap {
  width: 300px;
  height: 500px;
  border: 1px solid pink;
  overflow-y: scroll;
}

.item {
  // height: 49px;
  // text-align: center;
  border-bottom: 1px solid #999;
}
</style>
