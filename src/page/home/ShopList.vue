<template>
  <section>
    <div class="shoplist">
      <div
        class="shoplist-item"
        v-for="element in shopsList"
        :key="element.id"
        @click="showDetail(element.id)"
      >
        <div class="shoplist-item-container">
          <div class="info">
            <img :src="element.img" alt />
          </div>
          <div class="main">
            <section class="line title">
              <h5 class="title-name">无印良品</h5>
              <div class="title-others">
                <svg-icon icon-name="others"></svg-icon>
              </div>
            </section>
            <section class="line evaluate">
              <div class="rate">
                <div class="star-wrap">
                  <svg-icon icon-name="star"></svg-icon>
                  <svg-icon icon-name="star"></svg-icon>
                  <svg-icon icon-name="star" />
                </div>
                <span class="star-score">4.5</span>
                <span class="sail">月售502单</span>
              </div>
              <div class="deliver">
                <span>美团快送</span>
              </div>
            </section>
            <section class="line detail">
              <div class="limit">
                <span>¥</span>
                <span class="limit-price">25起送</span>
                <span class="detail-split">|</span>
                <span class="limit-factor">夜间配送7元</span>
              </div>
              <div class="distance">
                <span>1000m</span>
                <span class="detail-split">|</span>
                <span>42分钟</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * 首页所有商店列表
 */
export default {
  data() {
    return {
      shopsList: []
    }
  },
  methods: {
    showDetail(id) {
      console.log(`查看第${id}项!`)
    }
  },
  created() {
    for (let i = 1; i < 20; i++) {
      let item = {
        id: i,
        img: `/static/drink/yinliao_${i}.png`
      }
      this.shopsList.push(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.shoplist {
}

// 每条内容容器
.shoplist-item {
  position: relative;
  padding: 15px 10px;
  @include onepx($position: bottom);
}

// 每条内容内容
.shoplist-item-container {
  display: flex;

  .info {
    //左侧固定宽高
    flex: none;
    margin-right: 10px;
  }
  .main {
    //右侧弹性放缩，与左侧等高
    flex: 1;
  }
}

.info {
  img {
    width: 64px;
    height: 64px;
    vertical-align: middle; // 与段落同底
    background: rgba(0, 0, 0, 0.05); // 图片占位颜色
  }
}

.main {
  // 指定高度内，每段section竖直均分。
  display: flex;
  justify-content: space-between;
  flex-direction: column; //竖直方向

  // 基础字体大小
  font-size: 11px;
  color: $normal;

  .line {
    // section使用左右布局
    @include display-flex($justify: space-between);
  }

  .title {
    //标题
    &-name {
      font-size: 15px;
      font-weight: 700;
      line-height: 1.5;
      color: $emphasize;
    }

    &-others {
      padding: 0 8px;
    }
  }

  .evaluate {
    // 评分
    .rate {
      display: flex;

      .star-wrap {
        display: flex;
        margin-right: 4px;
        color: #ffbe00;
      }

      .star-score {
        margin-right: 6px;
      }
    }

    // 派送方
    .deliver {
      font-size: 10px;
      padding: 0 2px;
      line-height: 1.2 * 11px; // 与左侧说明等高
      border-radius: 2px;
      color: white;
      background: linear-gradient(to right, transparentize($primary-light, 0.2), $primary-light);
    }
  }

  .detail {
    .limit {
      display: flex;
    }

    // 距离和配送时间
    .distance {
      display: flex;
      color: $slight;
    }

    &-split {
      padding: 0 4px;
      color: $ignore;
    }
  }
}
</style>
