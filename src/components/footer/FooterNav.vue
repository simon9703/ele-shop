<template>
  <footer>
    <div class="footer-nav">
      <router-link to="/" class="footer-nav-item">1</router-link>
      <router-link to="/" class="footer-nav-item">2</router-link>
      <router-link to="/" class="footer-nav-item">3</router-link>
      <router-link to="/" class="footer-nav-item">4</router-link>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;

  &-item {
    flex: 1;
    height: 40px;
  }
}
</style>
