<template>
  <div>
    <header-nav @left-click="con">
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
      <filtrate></filtrate>
      <shop-list></shop-list>
    </main>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import Exhibition from './Exhibition'
import ShopList from './ShopList'
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
    con() {
      console.log(123)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
