<template>
  <svg class="svg-icon">
    <use :href="iconFinalName" />
  </svg>
</template>

<script>
/**
 * SVG图标公共组件。
 */
export default {
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    iconFinalName() {
      return `#icon-${this.iconName}`
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em; // 宽高随父布局字体大小缩放
  height: 1em;
  fill: currentColor; // 随父布局color
}
</style>
