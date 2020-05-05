<template>
  <section class="hunt-menu" v-show="showMenu">
    <div class="header">
      <h3>请选择分类</h3>
      <svg-icon @click.native="closeMenu" icon-name="close"></svg-icon>
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
</template>

<script>
export default {
  props: {
    showMenu: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      mainCurrent: 0,
      subCurrent: 0,
      list: []
    }
  },
  methods: {
    closeMenu() {
      this.$emit('update:showMenu', false)
    },
    chooseMain(index) {
      this.mainCurrent = index
      this.subCurrent = 0 // 切换主菜单时重置
    },
    chooseSub(index) {
      this.subCurrent = index
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
      console.log(this.list)
    })
  }
}
</script>

<style lang="scss" scoped>
.hunt-menu {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  right: 0;
  z-index: 120;
}

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
      }
    }
  }
}
</style>
