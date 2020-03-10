<template>
  <section>
    <div class="container">
      <div
        id="condition"
        class="item"
        :class="{active: 'condition'===current}"
        @click="select('condition')"
      >
        <div class="item-desc">
          <span>综合排序</span>
          <svg-icon icon-name="dropdown-solid"></svg-icon>
        </div>
      </div>
      <div id="sail" class="item" :class="{active: 'sail'===current}" @click="select('sail')">
        <div class="item-desc">
          <span>销量最高</span>
        </div>
      </div>
      <div
        id="distance"
        class="item"
        :class="{active: 'distance'===current}"
        @click="select('distance')"
      >
        <div class="item-desc">
          <span>离我最近</span>
        </div>
      </div>
      <div
        id="preparation"
        class="item"
        :class="{active: 'preparation'===current}"
        @click="select('preparation')"
      >
        <div class="item-desc">
          <span>筛选</span>
          <svg-icon icon-name="preparation"></svg-icon>
        </div>
        <section></section>
      </div>
    </div>

    <!-- v-show="current === 'condition'" -->
    <section class="dropdown" v-show="showCondition">
      <dl class="condition-dl">
        <dd
          class="condition-dd"
          :class="{active: element.id === currentCondition}"
          v-for="element in conditionList"
          :key="element.id"
          @click="chooseCondition(element.id)"
        >
          <div class="condition-dd-slip">
            <span class>{{element.desc}}</span>
            <svg-icon class="icon" icon-name="success"></svg-icon>
          </div>
        </dd>
      </dl>
    </section>
  </section>
</template>

<script>
/**
 * 商店条件过赛选
 */
export default {
  data() {
    return {
      current: '',
      currentCondition: '',
      showCondition: false,
      conditionList: [
        {
          id: 1,
          desc: '综合排序'
        },
        {
          id: 2,
          desc: '好评优先'
        },
        {
          id: 3,
          desc: '最近更新'
        },
        {
          id: 4,
          desc: '配送时间最低'
        },
        {
          id: 5,
          desc: '订单数量最多'
        }
      ]
    }
  },
  methods: {
    select(id) {
      this.current = id
      console.log(id)

      if (id === 'condition') {
        this.showCondition = !this.showCondition
      }
    },
    chooseCondition(id) {
      this.currentCondition = id
      this.showCondition = false
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 42px;

section {
  position: sticky;
  left: 0;
  right: 0;
  top: 48px;
  z-index: 100;
}

.container {
  display: flex;
  align-items: center;
  background: white;
  @include onepx($color: $ignore);

  .item {
    flex: 1;
    height: $height;
    overflow: hidden;
    @include display-flex;

    &-desc {
      position: relative;
      display: block;
      width: 100%;
      font-size: 14px;
      line-height: 1.5;
      color: $normal;
      @include display-flex; // 文字 + 图标居中
      @include ellipsis();
      @include onepx($position: right, $color: $ignore);
    }
  }
}

// 激活状态
.item.active .item-desc {
  color: $primary-light;
  font-weight: 700;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  .condition-dl {
    $padding: 24px; // 左右间隙
    $bg: white;

    padding-left: $padding; // 只设置左边间隙，右边留着画底线。
    font-size: 14px;
    color: $normal;
    background: $bg;

    .condition-dd {
      position: relative;
      line-height: 40px;
      @include onepx; // 画底线

      &-slip {
        padding-right: $padding;
        @include display-flex($justify: space-between);
      }

      .icon {
        font-size: 16px;
        color: $bg;
      }
    }
  }
}

// 条件下拉选中
.condition-dd.active .condition-dd-slip {
  color: $primary-light;

  .icon {
    color: $primary-light;
  }
}
</style>
