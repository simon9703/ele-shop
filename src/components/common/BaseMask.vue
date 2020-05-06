<template>
  <div class="mask" @click="closeMask"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    closeMask() {
      this.$mask.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
