<template>
  <section>
    <div class="container">
      <div class="item">
        <span>综合排序</span>
      </div>
      <div class="item">
        <span>销量最高</span>
      </div>
      <div class="item">
        <span>离我最近</span>
      </div>
      <div class="item">
        <span>筛选</span>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * 商店条件过赛选
 */
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  height: 40px;

  .item {
    flex: 1;
    @include display-flex;
  }
}

.item {
  span {
    color: $normal;
    font: 14px;
  }
}
</style>
