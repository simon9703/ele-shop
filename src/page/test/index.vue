<template>
  <div>{{val}}</div>
</template>

<script>
import variable from '@/style/variable.scss'

export default {
  data() {
    return {
      count: 1,
      val: variable
    }
  },
  methods: {
    add() {}
  }
}
</script>

<style lang="scss" scoped>
</style>
