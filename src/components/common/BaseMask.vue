<template>
  <div class="mask" @click="closeMask">
    <div class="content">
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    openMask() {
      this.show = true
    },

    closeMask() {
      console.log(123)
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
  z-index: 70;
  background: rgba(0, 0, 0, 0.4);
}

.content {
  @include absolute-center;
  min-width: 5rem;
  padding: 8px 4px;
  border-radius: 8px;
  text-align: center;
  color: white;
  background: #333;
}

// 穿透测试
.content {
  height: 100px;
  width: 200px;
  overflow: scroll;
}

.message {
  padding: 200px 0;
}
</style>
