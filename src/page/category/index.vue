<template>
  <section>
    <hunt></hunt>
    <filtrate></filtrate>
    <shop-list></shop-list>
  </section>
</template>

<script>
import ShopList from '@/components/shops/ShopList'
import Filtrate from '@/components/shops/Filtrate'
import Hunt from './Hunt'
export default {
  components: { ShopList, Filtrate, Hunt }
}
</script>

<style lang="scss" scoped>
</style>
