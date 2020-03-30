<template>
  <div class="cell">
    <svg-icon class="indicate" :icon-name="icon" />
    <p>{{text}}</p>
    <svg-icon class="link" icon-name="arrow-right" />
  </div>
</template>

<script>
/**
 * 选项列表
 */
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  $height: 48px;

  position: relative;
  display: flex;
  align-items: center;
  height: $height;
  margin-left: 20px;
  @include onepx($position: bottom);

  .indicate {
    flex: none;
    font-size: 18px;
  }

  p {
    flex: 1;
    margin-left: 12px;
    font-size: 16px;
    color: $emphasize;
  }

  .link {
    flex: none;
    margin-right: 18px;
    font-size: 12px;
    color: $slight;
  }
}
</style>
