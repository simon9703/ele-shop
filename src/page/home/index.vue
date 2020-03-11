<template>
  <div>
    <header-nav @left-click="search">
      饿了么
      <template #left>
        <svg-icon icon-name="search"></svg-icon>
      </template>
      <template #right>
        <svg-icon icon-name="location"></svg-icon>
      </template>
    </header-nav>

    <main>
      <exhibition></exhibition>
      <section class="divide"></section>
      <section class="shop-list-title">
        <span class="shop-list-title-content">推荐商家</span>
      </section>
      <filtrate></filtrate>
      <shop-list></shop-list>
    </main>

    <footer-nav></footer-nav>
  </div>
</template>

<script>
import Exhibition from './Exhibition'
import ShopList from '@/components/shops/ShopList'
import Filtrate from './Filtrate'

export default {
  components: {
    Exhibition,
    Filtrate,
    ShopList
  },
  data() {
    return {}
  },
  methods: {
    search() {
      console.log('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.divide {
  width: 100%;
  height: 15px;
  background: #f5f6f7;
}

.shop-list-title {
  // @include display-flex;
  text-align: center;
  font-size: 15px;
  line-height: 36px;
  color: $emphasize;

  &-content {
    @include display-flex;
    &::before,
    &::after {
      display: block;
      content: '';
      width: 30px;
      height: 1px;
      background: $emphasize;
    }

    &::before {
      margin-right: 16px;
    }
    &::after {
      margin-left: 16px;
    }
  }
}
</style>
