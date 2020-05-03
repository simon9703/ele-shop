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
            <div
              class="goods"
              v-for="item in element.data"
              :key="item.id"
              @click="popGoodsExplain(item.id)"
            >
              <div class="photo">
                <img :src="item.img" alt />
              </div>
              <div class="detail">
                <div class="clearify">
                  <p class="title">{{item.title}}</p>
                  <p class="describe">{{item.describe}}</p>
                  <p class="sail">
                    <span>月销量{{item.amount}}份</span>
                    <span>好评率100%</span>
                  </p>
                </div>
                <div class="bottom">
                  <div class="price">
                    ¥
                    <span>{{item.price}}</span>
                    起
                  </div>
                  <svg-icon icon-name="add"></svg-icon>
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
/*
 数据格式
 lists: [{
          id: 0,
          name: '分类名称',
          data: [
            {
              id: '',
              img: '',
              title: '商品名称',
              describe: '商品描述',
              amount: '已销售数目',
              price: '价钱'
            }
          ]
        }],
*/

export default {
  data() {
    return {
      current: 0,
      scrollByClick: false, // 点击选中导航时，锁住滚动事件监听。
      lists: [],
      contentHeight: [] // 所有子列表顶部，滚动距离集合。
    }
  },
  methods: {
    popGoodsExplain(id) {
      // 商品详情
      console.log('查看商品：', id)
    },
    choose(index) {
      // 点击选中导航
      this.current = index
      this.scrollByClick = true // 锁住滚动事件。防止选中改变srollTop时，被浏览器裁剪1个最小单位，达不到滚动位置。而引起的
      this.$refs['content'].scrollTop = this.contentHeight[index]
    },
    async fetchData() {
      let { data } = await this.$request.post('/goods')
      this.lists = data.data.list

      // 新的list构建成功后，计算列表高度和初始化滚动事件。
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    initScroll() {
      // 计算初始化时，滚动列表高度
      this.contentHeight = [0] // 第一个子列表的scroll在0位置。
      let contentItems = this.$refs['content-item']
      for (let i = 0, sum = 0, len = this.lists.length; i < len; i++) {
        let { height } = contentItems[i].getBoundingClientRect()
        sum += height
        this.contentHeight.push(sum)
      }

      // 列表滚动级联
      this.$refs['content'].addEventListener('scroll', e => {
        // 过滤由导航栏click引起的改变。
        if (this.scrollByClick) {
          this.scrollByClick = false
          return
        }

        // 计算导航栏选项索引
        let scrollTop = e.target.scrollTop
        for (let i = 0, len = this.contentHeight.length; i < len; i++) {
          if (this.contentHeight[i] < scrollTop && this.contentHeight[i + 1] > scrollTop) {
            this.current = i
            break
          }
        }
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
// 左右级联菜单
.chain {
  height: 70vh;
  margin-top: 12px;
  display: flex;

  .tabs {
    flex: none;
  }

  .content {
    flex: 1;
  }
}

// 导航栏
.tabs {
  background: $gray;

  &-item {
    width: 80px;
    padding: 16px 8px;
    text-align: center;
    font-size: 12px;
    color: $normal;

    // 选中状态
    &.active {
      background: white;
    }
  }
}

// 滚动内容
.content {
  overflow: scroll;

  // 分类名称
  dt {
    /* ===> 随滑动吸顶
    position: sticky;  // 只有当dl在视口内时，变为sticky
    top: 0px;
    background: $gray;
    */
    h3 {
      padding: 6px 10px;
      font-size: 12px;
      font-weight: bold;
      color: $normal;
    }
  }

  // 详情
  .goods {
    display: flex;
    justify-content: center;
    padding: 4px 0 8px;

    .photo {
      flex: none;
      width: 80px;
      height: 80px;
      background: #f7f7f7; // 图片默认背景

      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail {
      flex: 1;
      overflow: hidden; // 用于子元素溢出截断

      display: flex;
      justify-content: space-between;
      align-items: stretch;
      flex-direction: column;
      margin: 0 8px;

      .clearify {
        .title {
          font-size: 15px;
          font-weight: bold;
          color: $emphasize;
        }

        .describe,
        .sail {
          margin-top: 2px;
          font-size: 10px;
          color: $slight;
          @include ellipsis;
        }

        .sail {
          display: flex;

          span {
            margin-right: 4px;
          }
        }
      }

      .bottom {
        @include display-flex($justify: space-between, $align: flex-end);

        .price {
          display: flex;
          align-items: flex-end;
          margin-bottom: 4px;
          font-size: 10px;
          color: $red;
          span {
            margin: 0 1px;
            font-size: 14px;
            line-height: 1;
          }
        }

        // 添加按钮
        svg {
          font-size: 20px;
          color: $primary;
        }
      }
    }
  }
}
</style>
