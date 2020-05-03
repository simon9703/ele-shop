<template>
  <section class="nav">
    <div class="content">
      <div
        class="item"
        v-for="(element, index) in lists"
        :key="element.id"
        @click="choose(index)"
      >{{element.name}}</div>

      <div class="slider">
        <div class="solid" :style="{'left': current * 54 + 'px'}"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      lists: [
        {
          id: 0,
          name: '点餐'
        },
        {
          id: 1,
          name: '评论'
        },
        {
          id: 2,
          name: '商家'
        }
      ]
    }
  },
  methods: {
    choose(index) {
      this.current = index
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  @include display-flex; // 固定选项卡宽度
  @include onepx($position: bottom);
}

.content {
  $item-width: 54px;
  position: relative;

  @include display-flex();

  .item {
    width: $item-width;
    line-height: 2;
    text-align: center;
  }

  .slider {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;

    .solid {
      position: absolute;
      left: 0;
      bottom: 0;
      width: $item-width;
      height: 2px;
      background: $primary-light;
      transition: 0.2s ease-in-out;
    }
  }
}
</style>
