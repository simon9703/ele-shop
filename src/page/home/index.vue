<template>
  <main>
    <p>首页</p>
    <p class="next">下一页</p>
    <div class="devide"></div>
    <div class="devide"></div>
    <div class="devide"></div>
    <div class="devide"></div>

    <div class="spinner"></div>
    <div class="red">red</div>

    <div class="screen">screen</div>
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.devide {
  margin-top: 4px;
  width: 100%;
  height: 1px;
  background: black;

  &:nth-of-type(1) {
  }

  &:nth-of-type(2) {
    transform: scaleY(0.5);
  }

  &:nth-of-type(3) {
    transform: scaleY(0.3333);
  }

  &:nth-of-type(4) {
    transform: scaleY(0.1);
  }
}

main {
  height: 2000px;
}

.title {
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 2.4;
    color: white;
    text-align: center;
    background: dodgerblue;
  }
}

.next {
  position: relative;
  margin-left: 40px;
  width: 100px;
  line-height: 50px;
  text-align: center;
  // border: 1px solid #333;
  background: yellow;
  @include onePix(round, black);
  // &::before {
  //   content: '';
  //   position: absolute;
  //   left: 0;
  //   // right: 0;
  //   top: 0;
  //   width: 200%;
  //   height: 200%;
  //   border: 1px solid black;
  //   transform-origin: left top;
  //   transform: scale(0.5);
  // }

  // &::after {
  //   content: '';
  //   position: absolute;
  //   top: -(10px / 2);
  //   left: -(10px / 2);
  //   width: 200%;
  //   height: 200%;
  //   border-radius: 12px;
  //   border: 10px solid black;
  //   transform-origin: left top;
  //   transform: scale(0.5);
  // }
}

.red {
  width: 200px;
  height: 100px;
  background: red;
  @media (-webkit-min-device-pixel-ratio: 1) {
    background: black;
  }

  @media (-webkit-min-device-pixel-ratio: 2) {
    background: green;
  }

  @media (-webkit-min-device-pixel-ratio: 3) {
    background: blue;
  }
}
</style>
