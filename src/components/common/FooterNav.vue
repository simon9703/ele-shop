<template>
  <footer class="wrap">
    <div class="footer-nav" ref="nav">
      <div class="footer-nav-container">
        <section
          v-for="item in list"
          :key="item.id"
          @click="go(item.id)"
          :class="{active: item.id === current}"
          class="footer-nav-item"
        >
          <svg-icon class="icon" :icon-name="item.icon"></svg-icon>
          <span>{{item.desc}}</span>
        </section>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      current: 'home',
      list: [
        // 每项id需要和route中路由对应
        {
          id: 'home',
          icon: 'shouye',
          desc: '首页'
        },
        {
          id: 'discover',
          icon: 'faxian',
          desc: '发现'
        },
        {
          id: 'order',
          icon: 'dingdan',
          desc: '订单'
        },
        {
          id: 'info',
          icon: 'wode',
          desc: '我的'
        }
      ]
    }
  },
  methods: {
    go(path) {
      this.$router.push(`/${path}`)
    }
  },
  created() {
    this.list.forEach(item => {
      if (this.$route.path.startsWith(`/${item.id}`)) {
        this.current = item.id // 根据路由==>对应id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
// 在正常文档流中的占位，让body中的元素滚动到底。
.wrap {
  width: 100%;
  height: 8px * 2 + 20px + 2px + 10px * 1.2;
}

// 定位
.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100; // 设置较高层级
}

// 内容
.footer-nav-container {
  display: flex;
  background: white;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);

  .footer-nav-item {
    flex: 1;
    padding: 8px 0;
    text-align: center;
    color: $normal;

    @include display-flex($direction: column);

    .icon {
      font-size: 20px;
    }

    span {
      margin-top: 2px;
      font-size: 10px;
    }
  }
}

// 选中样式
.footer-nav-item.active {
  color: $active;
}
</style>
