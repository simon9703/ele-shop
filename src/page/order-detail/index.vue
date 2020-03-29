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
          <h3>订单已经送达！</h3>
          <svg-icon icon-name="arrow-right" />
        </div>
        <p class="thanks">感谢您对饿了吗外卖的信任，期待再次光临。</p>
      </section>
      <section class="restaurant card">
        <div class="brand">
          <div class="title">
            <img src="/static/drink/yinliao_2.png" alt />
            <span>无印良品</span>
          </div>
          <svg-icon icon-name="arrow-right" />
        </div>
        <ul class="goods list">
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
              <span class="price">-¥13</span>
            </div>
          </li>
        </ul>
        <div class="summery">
          <div class="call">
            <svg-icon icon-name="phone"></svg-icon>
            <span>联系商家</span>
          </div>
        </div>
        <p class="pay">
          实付
          <span class="money">¥89.5</span>
        </p>
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
            <span class="name">骑士:</span>
            <div class="text">
              <div class="call">
                <svg-icon icon-name="phone"></svg-icon>
                <span>联系商家</span>
              </div>
              <span class="spliter">|</span>
              <span class="people">小牛</span>
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
.order-detail {
  background: $background;
  min-height: 100vh;
}

.card {
  margin: 12px;
  padding: 8px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

.status {
  &-info {
    position: relative;
    display: flex;
    align-items: center;
    @include onepx($position: bottom);
  }
}
</style>
