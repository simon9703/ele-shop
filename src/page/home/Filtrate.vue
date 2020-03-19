<template>
  <section class="sort-bar">
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

    <!--condition列表 -->
    <transition name="model">
      <section class="dropdown" v-show="showCategory === 'condition'">
        <div class="dropdown-wrap">
          <div class="condition-container">
            <dl>
              <dd>
                <div
                  class="condition-item"
                  :class="{active: element.id === condition.current}"
                  v-for="element in condition.list"
                  :key="element.id"
                  @click.stop="chooseCondition(element.id)"
                >
                  <div class="condition-item-content">
                    <span class="tip">{{element.desc}}</span>
                    <svg-icon class="icon" icon-name="success"></svg-icon>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </transition>
    <!-- -->
    <!-- preparation列表 -->
    <transition name="model">
      <section class="dropdown" v-show="showCategory === 'preparation'">
        <div class="dropdown-wrap">
          <div class="preparation-container">
            <dl>
              <dt class="preparation-title">{{preparations.service.name}}</dt>
              <dd>
                <div
                  class="preparation-item"
                  v-for="element in preparations.service.list"
                  :key="element.id"
                  :class="{'active': preparations.service.chooseList.includes(element.id)}"
                >
                  <div @click.stop="choosePreparation('service',element.id)" class="mark">
                    <!-- <svg-icon class="icon" icon-name="success"></svg-icon> -->
                    <span class>{{element.desc}}</span>
                  </div>
                </div>
              </dd>
            </dl>
            <dl>
              <dt class="preparation-title">{{preparations.price.name}}</dt>
              <dd>
                <div
                  class="preparation-item"
                  v-for="element in preparations.price.list"
                  :key="element.id"
                  :class="{'active': preparations.price.chooseList.includes(element.id)}"
                >
                  <div @click.stop="choosePreparation('price',element.id)" class="mark">
                    <!-- <svg-icon class="icon" icon-name="success"></svg-icon> -->
                    <span class>{{element.desc}}</span>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
          <div class="preparation-btns">
            <div
              class="btn clear"
              :class="{'disable':preparationsChooseLiseEmpty}"
              @click="clear"
            >清空</div>
            <div class="btn confirm" @click="confirm">确定</div>
          </div>
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
/**
 * 商店条件过赛选
 */
export default {
  data() {
    return {
      list: ['condition', 'sail', 'distance', 'preparation'],
      current: '', // 当前选中分类
      showCategory: false, // 当前下拉列表
      condition: {
        // 综合排序下拉列表
        current: '', // 单选
        list: [
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
      },
      preparations: {
        // 筛选下拉列表
        service: {
          chooseList: [], // 多选
          name: '商家服务（可多选）',
          list: [
            {
              id: 1,
              desc: '美团专送'
            },
            {
              id: 2,
              desc: '商家品牌'
            },
            {
              id: 3,
              desc: '新店'
            },
            {
              id: 4,
              desc: '开发票'
            },
            {
              id: 5,
              desc: '分期付款'
            },
            {
              id: 6,
              desc: '可预定'
            },
            {
              id: 7,
              desc: '准时达'
            }
          ]
        },
        price: {
          name: '价格列表（多选）',
          chooseList: [], // 多选
          list: [
            {
              id: 1,
              desc: '低于10元'
            },
            {
              id: 2,
              desc: '10元-30元'
            },
            {
              id: 3,
              desc: '30元-50元'
            },
            {
              id: 4,
              desc: '50-100元'
            },
            {
              id: 5,
              desc: '100元以上'
            }
          ]
        }
      }
    }
  },
  /* 筛选条件为空时，清空按钮不可用 */
  computed: {
    preparationsChooseLiseEmpty() {
      return Object.keys(this.preparations).every(item => {
        return this.preparations[item].chooseList && this.preparations[item].chooseList.length === 0
      })
    }
  },
  methods: {
    /* 打开向下拉框后，sticky导航栏要最对上面固定 */
    makeBarInTop() {
      let current = this.$el.getBoundingClientRect().top
      let stickyTop = document.querySelector('#app header').getBoundingClientRect().height // 标题栏高度
      if (current >= stickyTop) {
        let distance = current - stickyTop
        window.scrollBy(0, distance) // 小数点px可能会被忽略一部分，如apple最小单位0.8px * n
      }
    },
    /* 选择不同条件 */
    select(id) {
      this.current = id
      this.makeBarInTop()

      // 打开下拉列表
      if (id === 'condition' || id === 'preparation') {
        this.showCategory = id
        this.$mask.open(() => {
          this.showCategory = '' // 关闭当前下拉列表（回调）
        })
      } else {
        this.$mask.close()
      }
    },
    /* condition下拉列表 */
    chooseCondition(id) {
      // todo 按照条件查询
      this.condition.current = id
      this.$mask.close()
    },
    /* preparation下拉列表 */
    choosePreparation(type, id) {
      let { chooseList } = this.preparations[type]
      let exists = false
      for (let i = 0, len = chooseList.length; i < len; i++) {
        if (id === chooseList[i]) {
          exists = true
          chooseList.splice(i, 1) // 删除已经选中
          return
        }
      }
      !exists && chooseList.push(id) // 添加未选中
    },
    /* 清空筛选条件 */
    clear() {
      Object.keys(this.preparations).forEach(item => {
        this.preparations[item].chooseList && (this.preparations[item].chooseList = [])
      })
    },
    /* 确认筛选条件 */
    confirm() {
      // todo 按照筛选查询
      this.$mask.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 42px; // 条件栏高度

// sticky固定部分
.sort-bar {
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
      width: 100%;
      font-size: 14px;
      line-height: 1.5;
      // line-height: $height;
      color: $normal;
      @include display-flex; // 文字 + 图标居中
      @include onepx($position: right, $color: $ignore);
      // @include ellipsis();

      span {
        @include ellipsis();
      }

      svg {
        flex: none;
      }
    }
  }
}

// 激活状态
.item.active .item-desc {
  color: $primary-light;
  font-weight: 700;
}

// 下拉条件框框
.dropdown {
  position: absolute;
  top: 100%; //相对sticky元素定位
  left: 0;
  right: 0;
  z-index: -10;

  // 用于translate动画。
  background: linear-gradient(
    to bottom,
    white 0%,
    white 50%,
    transparent 50%,
    transparent 100%
  ); //防止BFC: margin-top出现透明背景
  overflow: hidden; // 防止translate时，突出影响其他组件。

  // 用于translate动画。
  .dropdown-wrap {
    background: white;
  }
}

// 综合下拉
.condition-container {
  $padding: 24px; // 左右间隙
  margin-left: $padding; // 只设置左边间隙，右边留着画底线。

  .condition-item {
    position: relative;
    line-height: 40px;
    padding-right: $padding;
    @include onepx; // 画底线

    &-content {
      @include display-flex($justify: space-between);

      .tip {
        font-size: 13px;
        color: $normal;
      }

      .icon {
        font-size: 16px;
        color: white;
      }
    }
    // 条件下拉选中
    &.active {
      .tip {
        color: $primary-light;
      }

      .icon {
        color: $primary-light;
      }
    }
  }
}

// 筛选下拉
.preparation-container {
  $gap: 10px;
  margin: $gap $gap 0 $gap;

  dl {
    margin-bottom: $gap;
    dt {
      padding-left: 1%;
    }
    dd {
      display: flex;
      flex-wrap: wrap;

      .preparation-item {
        flex: 0 0 31.3333%;
        margin: 3px 1%; //上下留白各1vw
      }
    }
  }
}

.preparation-title {
  font-size: 12px;
  line-height: 20px;
  color: $slight;
}

.preparation-item {
  font-size: 13px;
  color: $normal;
  background: #f8f8f8;
  .mark {
    height: 13px * 2.5;
    @include display-flex;
  }

  //激活状态
  &.active {
    font-weight: 700;
    color: $primary-light;
    background: rgba($color: $primary-light, $alpha: 0.1);
  }
}

.preparation-btns {
  position: relative;
  display: flex;
  width: 100%;
  height: $height;
  @include onepx(top, $color: #ddd);

  .btn {
    flex: 1;
    @include display-flex;
    font-size: 16px;
    letter-spacing: 1px;

    &.clear {
      color: $normal;
      background: white;

      &.disable {
        //不可用状态
        opacity: 0.2;
        cursor: not-allowed;
      }
    }

    &.confirm {
      color: white;
      background: $success;
    }
  }
}

.model-enter-active,
.model-leave-active {
  transition: 0.3s ease-in-out;
  .dropdown-wrap {
    transition: 0.3s ease-in-out;
  }
}

.model-enter,
.model-leave-to {
  opacity: 0;
  z-index: -5;

  .dropdown-wrap {
    transform: translateY(-50%);
  }
}
</style>
