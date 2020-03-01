<template>
  <svg :class="iconFinalClass">
    <use :href="iconFinalName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconFinalName() {
      return `#icon-${this.iconName}`
    },
    iconFinalClass() {
      return this.iconClass ? this.iconClass : 'svg-icon'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 32px;
  height: 32px;
}
</style>
