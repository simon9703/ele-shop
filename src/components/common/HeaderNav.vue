<template>
  <header class="wrap">
    <div class="header-nav">
      <div class="header-nav-container">
        <h3 class="center">
          <slot></slot>
        </h3>
        <div class="left" @click="leftClick">
          <slot name="left"></slot>
        </div>
        <div class="right" @click="rightClick">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {},
  methods: {
    leftClick() {
      // 左侧点击事件
      this.$emit('left-click')
    },
    rightClick() {
      // 右侧点击事件
      this.$emit('right-click')
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 48px;

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
  z-index: 50; // 设置较高层级
}

// 内容
.header-nav-container {
  color: white;

  .left,
  .right {
    position: absolute;
    top: 0;
    height: 100%;
    width: $height; //左右图标，以高度为准的正方形居中。方便插槽div。
    font-size: 20px; // 图标大小
    overflow: hidden;
    @include display-flex;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .center {
    font-size: 18px;
    line-height: $height;
    text-align: center;
  }
}
</style>
