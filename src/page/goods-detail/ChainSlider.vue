<template>
  <section class="chain">
    <div class="tabs">
      <div
        class="tabs-item"
        v-for="(element, index) in lists"
        :key="element.id"
        :class="{'active': current === index}"
        @click="choose(index)"
      >{{element.name}}</div>
    </div>
    <div class="content" ref="content">
      <div class="content-item" ref="content-item" v-for="element in lists" :key="element.id">
        <dl>
          <dt>
            <h3>{{element.name}}</h3>
          </dt>
          <dd>
            <div class="goods" v-for="item in element.data" :key="item.id">
              <div class="photo">
                <img src alt />
              </div>
              <div class="detail">
                <p class="title">{{item.title}}</p>
                <p class="describe">{{item.describe}}</p>
                <p class="price">{{item.price}}</p>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      lists: [],
      contentHeight: []
    }
  },
  methods: {
    choose(index) {
      this.current = index
      this.$refs['content'].scrollTop = this.contentHeight[index]
    }
  },
  created() {
    for (let i = 0; i < 8; i++) {
      let temp = { id: i, name: '果汁甜品' + i, data: [] }
      for (let j = 0; j <= i; j++) {
        let id = `${i}-${j}`
        let temp2 = {
          id: id,
          img: '',
          title: 'xxxx' + id,
          describe: 'ddddddddddddd' + id
          // price: 18
        }

        temp.data.push(temp2)
      }
      this.lists.push(temp)
    }
  },
  mounted() {
    // 初始化滚动列表
    this.contentHeight = [0]
    let contentItems = this.$refs['content-item']
    for (let i = 0, sum = 0, len = this.lists.length; i < len; i++) {
      let { height } = contentItems[i].getBoundingClientRect()
      sum += height
      this.contentHeight.push(sum)
    }
    console.log('items height: ', this.contentHeight)

    // 列表滚动级联
    this.$refs['content'].addEventListener('scroll', e => {
      let scrollTop = e.target.scrollTop
      console.log(scrollTop)
      for (let i = 0, len = this.contentHeight.length; i < len; i++) {
        if (this.contentHeight[i] < scrollTop && this.contentHeight[i + 1] > scrollTop) {
          this.current = i
          break
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.chain {
  height: 70vh;
  margin-top: 12px;
  border: 1px solid green;
  display: flex;
  // position: fixed;
  // top: 20px;

  .tabs {
    flex: none;
  }

  .content {
    flex: 1;

    position: sticky;
    top: 20px;
  }
}

.tabs {
  background: #f5f6f7;

  &-item {
    width: 80px;
    line-height: 3;
    text-align: center;
    font-size: 14px;
    color: $normal;

    border-right: 2px solid transparent;
    &.active {
      border-right-color: blue;
    }
  }
}

.content {
  margin: 0 8px;
  overflow: scroll;

  dt {
    position: sticky; // 只有当dl在视口内时，变为sticky
    top: 0px;
    line-height: 30px;
    background: #f5f6f7;
  }

  .goods {
    height: 60px;
    border-bottom: 1px solid blue;
  }
}
</style>
