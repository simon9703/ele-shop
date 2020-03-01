<template>
  <!-- <section></section> -->
  <svg class="svg-icon">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 23px;
  height: 16px;
}
</style>
