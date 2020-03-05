<template>
  <svg class="svg-icon">
    <use :href="iconFinalName" />
  </svg>
</template>

<script>
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
  fill: currentColor; // 随父布局color
}
</style>
