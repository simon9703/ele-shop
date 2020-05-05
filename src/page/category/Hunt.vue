<template>
  <header class="wrap" ref="header">
    <div class="header-nav">
      <div class="header-nav-container">
        <ul>
          <li
            class="item"
            v-for="(item, index) in categoryList"
            :key="item"
            :class="{'active': current === index}"
            @click="choose(index)"
          >{{item}}</li>
        </ul>
      </div>
      <div class="dropdown">
        <svg-icon @click.native="displayMenu" icon-name="dropdown-line"></svg-icon>
      </div>
    </div>

    <hunt-menu :showMenu.sync="showMenu"></hunt-menu>
  </header>
</template>

<script>
import HuntMenu from './HuntMenu'

export default {
  components: {
    HuntMenu
  },
  data() {
    return {
      current: 0,
      categoryList: ['全部', '甜品饮品', '地方小吃', '咖啡', '可乐', '包子粥铺'],
      showMenu: false
    }
  },
  methods: {
    choose(index) {
      this.current = index
    },
    displayMenu() {
      this.showMenu = true
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 44px;

// 在正常文档流中的占位，让body中的元素margin空出标题栏高度。
.wrap {
  width: 100%;
  height: $height;
}

// 定位
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: $height;
  background: linear-gradient(to right, $primary-light, $primary);
  z-index: 100; // 设置较高层级
}

// 水平滚动菜单
.header-nav-container {
  margin-right: $height + 12px; // 为下拉按钮留白，且加上子item的BFC距离
  overflow-x: scroll;

  // &::-webkit-scrollbar {
  //   display: none;
  // }

  ul {
    width: 100%;
    height: $height;
    @include display-flex($justify: flex-start);

    .item {
      flex: none;
      margin: 0 12px;
      padding: 7px 0; // 设置底线位置
      line-height: 1;
      font-size: 14px;
      color: white;
      opacity: 0.75;

      // 选中状态
      &.active {
        font-weight: bold;
        border-bottom: 2px solid white;
        opacity: 1;
      }
    }
  }
}

// 下拉菜单按钮
.dropdown {
  position: absolute;
  top: ($height - 28px) / 2;
  right: 0;
  width: $height;
  height: 28px;
  font-size: 24px;
  color: white;
  @include display-flex;
  @include onepx($position: left, $color: rgba(255, 255, 255, 0.5));

  svg {
    margin-top: -3px; // svg绘制在中线一下，需要上移一点，以至居中。
  }
}
</style>
