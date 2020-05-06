<template>
  <section class="pop-menu" v-show="showMenu">
    <slot></slot>
  </section>
</template>

<script>
// 顶部或底部，弹出菜单组件。
export default {
  props: {
    showMenu: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeMenu() {
      this.$emit('update:showMenu', false)
    }
  },
  watch: {
    // 打开|关闭菜单时，相应遮罩处理。
    showMenu(val) {
      if (val) {
        // 父组件
        this.$mask.open(() => {
          this.closeMenu()
        })
      } else {
        // emit-update ==> 父组件触发sync ==> 回到子组件，改变值为false。
        this.$mask.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 120;
}
</style>
