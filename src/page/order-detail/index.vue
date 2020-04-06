<template>
  <div class="order-detail">
    <header-nav @left-click="back">
      订单详情
      <template #left>
        <svg-icon icon-name="arrow-left" />
      </template>
    </header-nav>
    <main>
      <section class="status card">
        <div class="status-info">
          <h3>订单已经送达</h3>
          <svg-icon icon-name="arrow-right" />
        </div>
        <p class="thanks">感谢您对饿了吗外卖的信任，期待再次光临</p>
      </section>
      <section class="restaurant card">
        <div class="brand">
          <div class="title">
            <img src="/static/drink/yinliao_2.png" alt />
            <span>无印良品</span>
          </div>
          <svg-icon icon-name="arrow-right" />
        </div>
        <ul class="list">
          <li>
            <span class="name">草莓盒子</span>
            <div class="text">
              <span class="amount">x2</span>
              <span class="price">¥48</span>
            </div>
          </li>
          <li>
            <span class="name">牛奶</span>
            <div class="text">
              <span class="amount">x1</span>
              <span class="price">¥8</span>
            </div>
          </li>
          <li>
            <div class="name">
              <span class="mark">红</span>
              优惠
            </div>
            <div class="text">
              <span class="price red">-¥13</span>
            </div>
          </li>
        </ul>
        <div class="summery">
          <div class="call">
            <svg-icon icon-name="phone"></svg-icon>
            <span>联系商家</span>
          </div>
          <p class="pay">
            实付
            <span class="money">¥89.5</span>
          </p>
        </div>
      </section>
      <section class="deliver card">
        <p class="title">配送信息</p>
        <ul class="list">
          <li>
            <span class="name">配送时间:</span>
            <p class="text">45分钟</p>
          </li>
          <li>
            <span class="name">送货地址:</span>
            <div class="text">
              <p>张(先生)</p>
              <p>13112341234</p>
              <p>江苏省苏州市吴中区路劲凤凰城19号楼19幢2001</p>
            </div>
          </li>
          <li>
            <span class="name">配送方式:</span>
            <p class="text">美团快送</p>
          </li>
          <li>
            <span class="name">配送骑士:</span>
            <div class="text">
              <div class="phone">
                <div class="call">
                  <svg-icon icon-name="phone"></svg-icon>
                  <span>联系骑士</span>
                </div>
                <span class="spliter">|</span>
                <span class="people">小牛</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="information card">
        <p class="title">订单信息</p>
        <ul class="list">
          <li>
            <span class="name">订单号:</span>
            <p class="text">TX2333971023768749</p>
          </li>
          <li>
            <span class="name">支付方式:</span>
            <p class="text">在线支付</p>
          </li>
          <li>
            <span class="name">下单时间:</span>
            <p class="text">2020-03-01 13:21</p>
          </li>
          <li>
            <span class="name">订单备注:</span>
            <p class="text">多放点土地，多加点辣椒~~</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
$item-height: 42px;

// 列表
ul {
  li {
    position: relative;
    padding: 12px 0;
    min-height: $item-height;
    @include display-flex($justify: space-between);
  }

  // 排除最后一项
  li:not(:last-child) {
    @include onepx($position: bottom);
  }
}

// 打电话样式
.call {
  @include display-flex;
  font-size: 14px;
  color: $primary;

  span {
    margin-left: 4px;
  }
}

// 整体布局
.order-detail {
  background: $background;
  min-height: 100vh;

  @include clearfix($position: after);
}

.card {
  margin: 12px;
  padding: 0 12px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

// 订单状态
.status {
  color: $emphasize;

  &-info {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 20px;
    color: $emphasize;
    @include onepx($position: bottom, $color: #ddd);

    svg {
      color: $slight;
    }
  }

  .thanks {
    padding: 16px 0;
    font-size: 16px;
    color: $normal;
  }
}

// 订单详情
.restaurant {
  .brand {
    position: relative;
    height: $item-height;
    @include display-flex($justify: space-between);
    @include onepx($position: bottom, $color: #ddd);

    .title {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        background: rgba(0, 0, 0, 0.05);
      }

      span {
        margin-left: 6px;
        font-size: 14px;
        color: $emphasize;
      }
    }

    svg {
      font-size: 14px;
      color: $slight;
    }
  }

  .list {
    position: relative;
    @include onepx($position: bottom, $color: #ddd); // 末尾分割线

    // 基础样式
    li {
      color: $emphasize;
      .name {
        @include display-flex($justify: flex-start);
        font-size: 14px;
      }

      .text {
        font-size: 13px;

        span {
          display: inline-block;
          margin-left: 20px;
        }
      }
    }

    // 特殊样式
    li {
      // 优惠
      .mark {
        display: inline-block;
        margin-right: 4px;
        padding: 2px;
        border-radius: 2px;
        font-size: 12px;
        color: white;
        background: $red;
      }

      .red {
        color: $red;
      }
    }
  }

  .summery {
    height: $item-height + 20px;
    @include display-flex($justify: space-between);

    .pay {
      font-size: 13px;
      color: $emphasize;
      span {
        margin-left: 4px;
        font-size: 16px;
      }
    }
  }
}

// 配送信息
.deliver,
.information {
  .title {
    position: relative;
    line-height: $item-height;
    @include onepx($position: bottom, $color: #ddd);
  }

  .list {
    // 基础样式
    li {
      color: $normal;
      font-size: 14px;
      @include display-flex($justify: flex-start);

      .name {
        flex: none;
        margin-right: 12px;
      }

      .text {
        p {
          line-height: 1.5;
        }
      }
    }

    // 特殊样式
    li {
      .phone {
        @include display-flex;

        .spliter {
          color: $ignore;
          margin: 0 8px;
        }
      }
    }
  }
}
</style>
