<template>
  <div class="container">
    <div class="wrap" ref="wrap">
      <div class="nav">
        <div
          @click="select(i)"
          :class="{'active': i===currentIndex}"
          class="nav-item"
          v-for="({title}, i) in arr"
          :key="title+i"
        >{{title}}</div>
      </div>
    </div>

    <div class="wrap" ref="wrap">
      <!-- 子元素必须为一个div -->
      <div class="content" ref="content">
        <div class="list" ref="list" v-for="{title, child} in arr" :key="title">
          <p class="title" ref="title">这是第{{title}}个！</p>
          <div class="child">
            <div class="child-item" v-for="atom in child" :key="atom">{{atom}}</div>
          </div>
        </div>
      </div>
      <!-- scroll时，滚动距离不连续，不能以此实时修改距离。需改为抽象点的固定-->
      <div
        :style="{'display': currentIndex < 0 ? 'none': 'block'}"
        class="fix-bar"
        ref="fixed"
      >这是第{{arr[currentIndex] && arr[currentIndex].title}}个！</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'HelloWorld',
  data() {
    // let arr = [{ titlx: 'xx', child: [] }]
    let arr = []
    for (let i = 0; i < 50; i++) {
      let item = { title: i, child: [] }
      for (let j = 0; j < Math.random() * 10 + 1; j++) {
        item.child.push(`${i}----${j}`)
      }
      arr.push(item)
    }
    return {
      bs: null,
      options: {
        mouseWheel: true,
        scrollbar: true,
        probeType: 3
      },
      arr: arr,
      currentIndex: 0, // 当前选项
      heights: [0],
      titles: []
    }
  },
  methods: {
    scroll({ y }) {
      console.log(y)
      let len = this.arr.length
      if (y > 0) {
        this.currentIndex = -1
        // this.$refs.fixed.style.display = `none`
      }
      for (let i = 0; i < len; i++) {
        let pre = this.heights[i]
        let next = this.heights[i + 1]
        if (pre > y && y > next) {
          this.currentIndex = i
          let diff = y - next > this.titles[i].offsetHeight ? 0 : this.titles[i].offsetHeight - (y - next)
          console.log(y - next, this.titles[i].offsetHeight, diff)
          this.$refs.fixed.style.transform = `translateY(-${diff}px)`
          return
        }
      }
    },
    select(index) {
      this.bs.scrollTo(0, this.heights[index], 300)
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrap, this.options)
    this.bs.on('scroll', this.scroll)
    this.$refs.list.reduce((pre, current) => {
      let result = pre - current.offsetHeight
      this.heights.push(result)
      return result
    }, 0)
    this.titles.push(...this.$refs.title)
    console.log('heights:', this.heights)
    console.log('titles:', this.titles)
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
  position: relative; // 接收滚动条
  height: 570px;
  border: 1px solid dodgerblue;
  overflow: hidden;
}

.nav {
  width: 100px;
  &-item {
    padding-left: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid #e0e0e0;
    &.active {
      color: white;
      background: dodgerblue;
    }
  }
}

.fix-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 2rem;
  background: #e0e0e0;
  // opacity: 0.6;
}

.list {
  width: 200px;
  .title {
    margin: 0;
    line-height: 2rem;
    background: #e0e0e0;
  }
  .child {
    &-item {
      padding: 1rem;
      border: 1px solid pink;
    }
  }
}
</style>
