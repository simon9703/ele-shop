<template>
  <header class="wrap" ref="header">
    <div class="header-nav">
      <div class="header-nav-container">
        <ul>
          <li
            class="item"
            v-for="(item, index) in list[mainCurrent]&&list[mainCurrent].data"
            :key="item"
            :class="{'active': subCurrent === index}"
            @click="choose(index)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="dropdown">
        <svg-icon @click.native="toggleMenu" icon-name="dropdown-line"></svg-icon>
      </div>
    </div>

    <!-- 弹出菜单 -->
    <pop-menu :showMenu.sync="showMenu">
      <section class="hunt-menu">
        <div class="header">
          <h3>请选择分类</h3>
          <svg-icon @click.native="toggleMenu" icon-name="close"></svg-icon>
        </div>
        <div class="container">
          <div class="main-menu">
            <ul>
              <li
                v-for="(element, index) in list"
                :key="element.id"
                :class="{'active': mainCurrent === index}"
                @click="chooseMain(index)"
              >
                <span class="title">{{element.title}}</span>
                <span class="count">{{element.count}}</span>
              </li>
            </ul>
          </div>
          <div class="sub-menu">
            <ul>
              <li
                v-for="(item, index) in list[mainCurrent]&&list[mainCurrent].data"
                :key="item.id"
                :class="{'active': subCurrent === index}"
                @click="chooseSub(index)"
              >
                <div class="photo">
                  <img :src="item.photo" alt />
                </div>
                <span class="title">{{item.title}}</span>
                <span class="count">{{item.count}}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </pop-menu>
    <!-- <hunt-menu :showMenu.sync="showMenu" :list="list"></hunt-menu> -->
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
      categoryList: ['全部', '甜品饮品', '地方小吃', '咖啡', '可乐', '包子粥铺'],
      list: [], // 菜单列表
      mainCurrent: 0, // 主菜单选中项
      subCurrent: 0, // 子菜单选中项 + 水平菜单导航
      showMenu: false
    }
  },
  methods: {
    // 打开下拉菜单
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    // 选中水平导航菜单
    choose(index) {
      this.subCurrent = index
    },
    // 选中主菜单
    chooseMain(index) {
      this.mainCurrent = index
      this.subCurrent = 0 // 切换主菜单时重置
    },
    // 选中子菜单
    chooseSub(index) {
      this.subCurrent = index
      this.toggleMenu()
    }
  },
  created() {
    this.$request.post('/categories').then(({ data }) => {
      this.list = data.data.list
      this.list.forEach(item => {
        // 每条子菜单添加全部选项。
        item.data.unshift({
          title: '全部',
          count: item.count,
          photo: item.photo
        })
      })
    })
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
      opacity: 0.8;

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

// 呼出菜单
// 标题栏
.header {
  padding: 0 20px;
  height: 40px;
  background: $gray;
  @include display-flex($justify: space-between);

  h3 {
    flex: 1;
    font-size: 14px;
    font-weight: bold;
  }

  svg {
    flex: none;
    font-size: 16px;
    color: $slight;
  }
}

// 菜单内容：双滚动列表
.container {
  display: flex;
  height: 60vh;
  background: white;

  .main-menu {
    flex: none;
    position: relative;
    width: 140px;
    overflow-y: scroll;
    @include onepx($position: right);
  }

  .sub-menu {
    flex: 1;
    overflow-y: scroll;
  }
}

// 主|子菜单通用样式
.base-menu {
  ul {
    li {
      height: 48px;
      font-size: 14px;
      color: $normal;
      @include display-flex($justify: flex-start);

      .title {
        flex: 1;
        padding-left: 14px; // 保留选中时，与li同高度位置。
        border-left: 2px solid transparent;
      }

      .count {
        flex: none;
        position: relative;
        display: inline-block;
        margin-right: 12px;
        padding: 2px 4px;
        width: 10px * 3;
        font-size: 10px;
        border-radius: 10px;
        color: $slight;
        @include display-flex;
        @include onepx-round($color: $ignore, $radius: 10px);
      }
    }
  }
}

// 主菜单
.main-menu {
  @extend .base-menu;
  // 选中状态
  ul {
    li.active {
      .title {
        border-left: 2px solid $primary;
      }
    }
  }
}

// 子菜单
.sub-menu {
  @extend .base-menu;

  .photo {
    flex: none;
    margin-left: 12px;
    width: 32px;
    height: 32px;
    background: $gray;

    img {
      width: 100%;
      height: 100%;
    }
  }

  // 选中状态
  ul {
    li.active {
      .title {
        font-weight: bold;
        color: $primary;
      }

      .count {
        color: white;
        background: $primary;
        @include onepx-round($color: $primary, $radius: 10px);
      }
    }
  }
}
</style>
