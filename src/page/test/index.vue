<template>
  <section>
    <div class="container">
      <div>
        <button class="btn" @click="toggle">切换</button>
        <button class="btn" @click="shuutle">排序</button>
      </div>
      <!-- <div class="dynamic"> -->
      <transition-group name="list" tag="div">
        <span class="it" v-for="item in items" :key="item">{{item}}</span>
      </transition-group>
      <!-- </div> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      msg: 'hello world!',
      count: 10,
      items: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    shuffle(arr) {
      let result = []
      var count = arr.length
      for (var i = 0; i < 10; i++) {
        var index = ~~(Math.random() * count) + i
        result[i] = arr[index]
        arr[index] = arr[i]
        count--
      }
      return result
    },
    toggle() {
      this.count++
      // this.items.push(this.count)
      this.items.splice(3, 1)
    },
    shuutle() {
      this.items = this.shuffle(this.items)
    }
  }
}
</script>

<style lang="scss" scoped>
.it {
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid #f5f6f7;
  transition: 5s;
}

.container {
  margin-top: 200px;
  text-align: center;
}
.btn {
  padding: 12px 16px;
  font-size: 14px;
  margin-bottom: 20px;
}

.dynamic {
  @include display-flex;
}

.list-leave-active {
  transition: 1s;
  position: absolute;
}
.list-enter-active {
  transition: 2s;
}

.list-enter {
  transform: translateY(-150%);
}
.list-enter-to {
  // background: yellow;
  transform: translate(0%);
}

.list-leave-to {
  // background: red;
  transform: translateY(-150%);
}

.list-move {
  transition: transform 10s;
}
</style>
