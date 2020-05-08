<template>
  <div>
    <div class="gallery-nav">
      <div class="back" @click="back">
        <svg-icon icon-name="arrow-left"></svg-icon>
      </div>
      <div class="brand">
        <img src="/static/drink/yinliao_11.png" alt />
      </div>
    </div>

    <section class="advertise">
      <div class="name">
        <span>无印良品</span>
        <svg-icon class="icon" icon-name="arrow-right"></svg-icon>
      </div>

      <div class="clearify">
        <span>评价4.6</span>
        <span>月销5000单</span>
        <span>美团快送36分钟抵达</span>
      </div>

      <div class="discount">
        <div class="detail">
          <span>30减15</span>
          <span>50减30</span>
          <span>80减55</span>
        </div>

        <div class="other">
          7个优惠
          <svg-icon icon-name="dropdown-solid"></svg-icon>
        </div>
      </div>

      <div class="news">公告：本店推出多件新的单品，均可放心食用。需要发票的请单独备注。</div>
    </section>

    <slider-tabs />
    <chain-slider></chain-slider>
  </div>
</template>

<script>
import SliderTabs from './SliderTabs'
import ChainSlider from './ChainSlider'

export default {
  components: {
    SliderTabs,
    ChainSlider
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
// 图片标题栏
.gallery-nav {
  position: relative;
  height: 100px;
  background: url('/static/background/back7.jpg');
  background-size: 100% 100%;

  // 返回
  .back {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    font-size: 20px;
  }

  // 商标
  .brand {
    position: absolute;
    left: calc(50% - 39px);
    bottom: -18px;
    width: 78px;
    height: 78px;
    background: #f5f6f7;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.advertise {
  margin: 32px 32px 10px;

  // 商店名
  .name {
    color: $emphasize;
    @include display-flex;

    span {
      font-size: 20px;
      font-weight: bold;
      @include ellipsis;
    }

    svg {
      flex: none;
      margin-left: 2px;
      font-size: 16px;
    }
  }

  // 说明
  .clearify {
    margin-top: 8px;
    font-size: 12px;
    color: $normal;
    @include display-flex();

    span:not(:last-of-type) {
      margin-right: 12px;
    }
  }

  // 优惠
  .discount {
    margin-top: 8px;
    font-size: 12px;
    color: $normal;
    width: 100%;
    @include display-flex($justify: space-between);

    .detail {
      margin-right: 12px;
      @include display-flex();

      span {
        position: relative;
        display: inline-block;
        padding: 1px 3px;
        color: $red;
        font-size: 10px;
        @include onepx-round($color: $red, $radius: 2px);

        @include not-last() {
          margin-right: 12px;
        }
      }
    }

    .other {
      @include display-flex;
      color: $slight;

      svg {
        margin-left: 4px;
      }
    }
  }

  // 公告
  .news {
    margin-top: 8px;
    width: 100%;
    font-size: 11px;
    color: $slight;
    @include ellipsis;
  }
}
</style>
