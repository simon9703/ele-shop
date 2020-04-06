<template>
  <div class="info">
    <section class="header">
      <div class="photo">
        <img src="/static/drink/yinliao_8.png" alt />
      </div>
      <div class="describe">
        <p class="name">用户TDNCLSD09</p>
        <p class="phone">
          <svg-icon icon-name="phone" />131****1234
        </p>
      </div>
      <svg-icon class="link" icon-name="arrow-right" />
    </section>

    <section class="discount">
      <div class="discount-item">
        <p class="amount">
          <span>4</span>个
        </p>
        <p>红包</p>
      </div>
      <div class="discount-item">
        <p class="amount">
          <span>24</span>个
        </p>
        <p>金币</p>
      </div>
    </section>

    <section class="profile">
      <profile-cell icon="dizhi" text="我的地址" />
    </section>

    <section class="profile">
      <profile-cell icon="shangcheng" text="金币商城" />
      <profile-cell icon="liwu" text="礼品红包" />
    </section>

    <section class="profile">
      <profile-cell icon="kefu" text="联系客服" />
      <profile-cell icon="anquan" text="安全中心" />
      <profile-cell icon="guize" text="业务规则" />
    </section>

    <footer-nav></footer-nav>
  </div>
</template>

<script>
import ProfileCell from './profile-cell'

export default {
  components: { ProfileCell }
}
</script>

<style lang="scss" scoped>
.info {
  min-height: 100vh;
  background: $background;
}

.header {
  display: flex;
  align-items: center;
  padding: 24px;
  color: white;
  background: linear-gradient(to right, $primary-light, $primary);

  .photo {
    flex: none;
    width: 64px;
    height: 64px;
    padding: 8px; // 图片位置
    border-radius: 50%;
    overflow: hidden;
    background: #f5f6f7;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .describe {
    flex: 1;
    margin-left: 12px;

    .name {
      font-size: 20px;
      font-weight: 700;
    }

    .phone {
      display: flex;
      align-items: center;
      margin-top: 6px;
      font-size: 12px;
    }
  }

  .link {
    flex: none;
    font-size: 18px;
  }
}

// 红包 + 金币 提示
.discount {
  display: flex;
  background: white;

  &-item {
    position: relative;
    flex: 1;
    height: 80px;
    font-size: 12px;
    color: $normal;

    @include display-flex($direction: column);
    @include onepx($position: right, $color: #ddd);

    p {
      font-size: 12px;
      font-weight: 700;
    }

    .amount {
      margin-bottom: 2px;

      span {
        margin-right: 4px;
        font-size: 24px;
      }
    }

    &:nth-child(1) {
      // 红包
      .amount {
        color: $red;
      }
    }

    &:nth-child(2) {
      // 金币
      .amount {
        color: $green;
      }
    }
  }
}

// 选项
.profile {
  margin-top: 12px;
  background: white;
}
</style>
