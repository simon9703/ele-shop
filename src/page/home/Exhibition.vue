<template>
  <nav>
    <div class="content">
      <router-link
        v-for="element in categoryList"
        :key="element.desc"
        :to="element.url"
        class="item"
      >
        <img :src="element.img" alt />
        <p>{{element.desc}}</p>
      </router-link>
    </div>
  </nav>
</template>

<script>
/**
 * 商品分类导航
 */
export default {
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    for (let i = 1; i < 8; i++) {
      let item = {
        url: '/',
        desc: '食物' + i,
        img: `/static/food/shiwu_${i}.png`
      }
      this.categoryList.push(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;

  .item {
    flex: 0 0 25%;
    padding: 10px 0;
    overflow: hidden;
    @include display-flex($direction: column);
  }
}

.item {
  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-top: 4px;
    font-size: 12px;
    @include ellipsis;
  }
}
</style>
