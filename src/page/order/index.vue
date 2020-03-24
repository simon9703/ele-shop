<template>
  <div class="order">
    <main>
      <section class="container">
        <div
          class="goods"
          @click="showDetail(element.id)"
          v-for="element in list"
          :key="element.id"
        >
          <div class="goods-item">
            <div class="goods-item-gallery">
              <img :src="element.img" alt />
            </div>
            <div class="goods-item-content">
              <div class="title">
                <div class="name" @click.stop="gotoGoods(element.id)">
                  <p>{{element.shopName}}</p>
                  <svg-icon icon-name="arrow-right" />
                </div>
                <div class="status">{{element.status}}</div>
              </div>
              <div class="time">{{element.date}}</div>
            </div>
          </div>
          <div class="goods-describe">
            <p class="clarify">{{element.clarify}}</p>
            <p class="price">¥{{element.price}}</p>
          </div>
          <div class="goods-operation">
            <button class="btn" @click.stop="retryOrder(element.id)">再来一单</button>
          </div>
        </div>
      </section>
      <div class="load-more" ref="load">
        <svg-icon class="loading" icon-name="loading" />
      </div>
    </main>
    <footer-nav ref="footer"></footer-nav>
  </div>
</template>

<script>
// let dd = {
//   img: '/static/drink/yinliao_1.png',
//   shopName: '无印良品',
//   status: '订单已送达',
//   date: '2020-01-05 12:45',
//   clarify: '泛泛莓莓等3件商品',
//   price: '52.50'
// }

export default {
  data() {
    return {
      list: [],
      loading: false, // 加载更多状态
      scrollFn: undefined // 加载更多绑定函数，用于删除
    }
  },
  methods: {
    showDetail(id) {
      // 订单详情
      console.log('detail: ', id)
    },
    gotoGoods(id) {
      // 进入商铺
      console.log('go to: ', id)
    },
    retryOrder(id) {
      // 再来一单
      console.log('retry: ', id)
      this.getMore()
    },
    async getMore() {
      let params = {
        sleep: 1000,
        offset: 10,
        limit: 8
      }
      let { data } = await this.request.post('/orders', params)

      this.list.push(...data.data.list)
    }
  },
  created() {
    this.getMore()
  },
  mounted() {
    let scrollFn = () => {
      let rect = this.$refs.load.getBoundingClientRect()
      let footer = this.$refs.footer.$refs.nav.getBoundingClientRect()
      let gap = rect.top - footer.top
      // console.log('scroll', gap)
      if (gap < 0 && !this.loading) {
        this.loading = true
        console.log('loading start.......')

        this.getMore().finally(() => {
          console.log('loading end.......')
          this.loading = false
        })
      }
    }
    window.addEventListener('scroll', scrollFn)
    this.scrollFn = scrollFn
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollFn)
    console.log('destoryed!!')
  }
}
</script>

<style lang="scss" scoped>
.order {
  background: #f5f6f7;
  min-height: 100vh;
  @include clearfix; // 取消列表内首项margin-top的BFC
}

// 订单信息
.goods {
  margin: 8px 0;
  padding: 12px 16px;
  background: white;
}

.goods-item {
  display: flex;
  align-items: flex-start;

  &-gallery {
    flex: none;
  }

  &-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}

// 订单图片信息
.goods-item-gallery {
  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;

    // 图片未加载时占位
    min-width: 32px;
    min-height: 32px;
    background: rgba(0, 0, 0, 0.05);
  }
}

// 订单详细信息
.goods-item-content {
  margin-left: 12px;
  overflow: hidden; // 限制最大宽度不可超过100% - flex:none的width。1

  .title {
    @include display-flex($justify: space-between);

    .name {
      font-size: 16px;
      color: $emphasize;
      overflow: hidden; // 限制最大宽度不可超过100% - flex:none的width。2

      @include display-flex;

      p {
        // 商店名称省略...
        @include ellipsis;
      }

      svg {
        margin-left: 6px;
        font-size: 13px;
        color: $slight;
      }
    }

    .status {
      flex: none;
      margin-left: 12px; // 店名称出现省略...时，与其间距。
      font-size: 13px;
      color: $normal;
    }
  }

  .time {
    margin-top: 7px;
    font-size: 11px;
    color: $slight;
  }
}

// 订单价格 + 描述
.goods-describe {
  @include display-flex($justify: space-between);

  margin-left: 32px + 12px; // 左侧无图片，也偏移相同距离对齐。图片width + 订单详细信息margin-left
  margin-top: 14px;

  .clarify {
    font-size: 13px;
    color: $normal;
  }

  .price {
    font-size: 13px;
    font-weight: 700;
    color: $emphasize;
  }
}

// 按钮组
.goods-operation {
  margin-top: 14px;
  direction: rtl;

  .btn {
    position: relative;
    margin-left: 8px;
    padding: 4px 10px;
    @include onepx-round($color: $primary-light, $radius: 4px);
    font-size: 12px;
    color: $primary-light;
    background: white;
  }
}

// 加载更多
.load-more {
  width: 100%;
  height: 48px;
  background: white;
  @include display-flex;

  .loading {
    font-size: 20px;
    color: $slight;
    animation: 2s loading linear infinite;
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
