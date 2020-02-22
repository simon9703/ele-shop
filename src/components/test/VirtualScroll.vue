<template>
  <div class="container">
    <div class="buttons">
      <button @click="add">添加元素</button>
      <button @click="scrollTo">to</button>
      <button @click="scrollBy">by</button>
      <button @click="scrollToElement">滑动元素</button>
    </div>
    <div class="wrap" ref="wrap" @scroll="dblog(i)">
      <!-- 子元素必须为一个div -->
      <div class="content">
        <div
          class="item"
          ref="item"
          v-for="i in arr"
          :key="i"
          @dblclick="dblog(i)"
          @click="log(i)"
        >这是第{{i}}个！</div>
        <div class="item">已经到底了</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Test',
  data() {
    let arr = []
    for (let i = 0; i < 20; i++) {
      arr.push(i)
    }
    return {
      arr: arr,
      bs: null,
      options: {
        startY: -300,
        scrollX: true
        // freeScroll: true
      }
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs['wrap'], {
      // startY: 20,
      scrollX: true,
      click: true,
      dblclick: true,
      mouseWheel: true,
      // bounce: {
      //   top: true,
      //   right: false,
      //   bottom: false,
      //   left: false
      // },
      momentum: true,
      probeType: 3
      // bindToWrapper: false
      // eventPassthrough: 'horizontal'
      // freeScroll: true
    })
    this.bs.on('scrollStart', p => {
      console.log(`start in position:`, this.bs.y)
    })
    this.bs.on('scroll', p => {
      console.log(`in position:`, this.bs.y)
    })
    this.bs.on('scrollEnd', p => {
      console.log(`scrollEnd in position:`, this.bs.y)
    })
    this.bs.on('touchEnd', p => {
      console.log(`touchEnd in position:`, this.bs)
    })
    this.bs.on('pullingUp', () => {})
    console.log(this.bs)
  },
  methods: {
    add() {
      let length = this.arr.length
      this.arr.push(...[length, length + 1, length + 2, length + 3, length + 4])
      console.log(this.bs)

      this.bs.refresh()
    },
    scrollTo() {
      this.bs.scrollTo(0, -1000, 250)
    },
    scrollBy() {
      this.bs.scrollBy(0, -100, 250)
    },
    scrollToElement() {
      let index = this.$refs.item
      this.bs.scrollToElement(index[15], 250, 100, -100)
    },
    log(i) {
      console.log(i)
    },
    dblog(i) {
      console.log('db:', i)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.wrap {
  width: 202px;
  height: 570px;
  border: 1px solid dodgerblue;
  overflow: hidden;
  // overflow-x: auto;
  // overflow-y: hidden; // 必须
}

.content {
  width: 200px + 2px;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 1px solid black;
}

button {
  display: block;
  margin-top: 16px;
}
</style>
