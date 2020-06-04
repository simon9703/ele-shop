<template>
  <nav>
    <header class="header">
      <div class="container">
        <svg-icon class="menu" icon-name="close" :class="{'anim': showMenu}" @click.native="toggle"></svg-icon>
      </div>
    </header>
    <transition name="navopen">
      <div class="content" v-if="showMenu">
        <div class="condition">
          <div>
            <div class="search-info" v-show="!showForm">
              <p>Search</p>
            </div>
          </div>
          <div class="search-form" v-show="showForm">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="products">
          <ul>
            <li v-for="element in list" :key="element">
              <div>
                <div>{{element}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
// 模仿苹果官网导航栏[https://www.apple.com/]
// 来源[https://codepen.io/theaftermath87/pen/meZgzM?__cf_chl_jschl_tk__=28f69d85faf60d3882abdb41edeea20bbfad6e8b-1590022770-0-AUzgHSE-uPfLEYVOrj8DNp_Rr32Jyc3O0MtGjm-hccKJNu0G9mTg98Yfd9wGvIEhm6yfnIHNhMdplsP7Yub2RFYOjyaDrzVNVa3HkaBL-BcbgAzpzHlPl4npJJj8XMwrdZYA8rGhPZJXRxA2h8Um3JIN4uqdvFPwfZ90hc79IrbKD9e_BMMnchCMTPkGqsnMrTJA1j46AI6AxnCZxjzjbOJY7bOIJLozs-W2FOUrKJJ7pyR9ymkkZLh_usTlS_x-OaYIY7FKp2GvStbgo4ED1uoluRvvthJXyE4zyBeBoeLQMVr7SXrhfEgBN4SeP7m__GuCUguZt9jaqxGPvJoQXlaXFdLpf6J40F81C0aoFH7JicT2GTjv-8bHcV71HnLC_g]

export default {
  data() {
    return {
      showMenu: true,
      showForm: false,
      list: ['Mac', 'iPad', 'iPhone', 'Watch', 'TV', 'Music', 'Support']
    }
  },
  methods: {
    toggle() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 48px;
$time: 1s;
$time-val: 1;

nav {
  color: white;
}

.header {
  height: $header-height;

  .container {
    position: fixed;
    top: 0;
    left: 0;
    height: $header-height;
    width: 100%;
    background: black;

    .menu {
      position: absolute;
      top: $header-height / 2 - 12px;
      left: 16px;
      font-size: 24px;
      transform: rotate(45deg);
      transition: $time;

      &.anim {
        transform: rotate(0deg);
      }
    }
  }
}

.content {
  position: fixed;
  top: $header-height;
  left: 0;
  height: calc(100vh - 48px);
  width: 100%;
  background: black;
}

.condition {
  position: relative;
  height: 50px;
  @include onepx($position: bottom, $color: #666);

  .search-info {
    p {
      padding: 0 24px;
      font-size: 20px;
      line-height: 1.8;
      background: #444;
    }
  }

  .search-form {
    input {
      width: 100%;
      height: 36px;
    }
  }
}

.products {
  $height: 44px;
  margin: 0 40px;
  overflow: hidden;

  ul {
    li {
      position: relative;
      line-height: $height;
      @include not-last {
        @include onepx($position: bottom, $color: #666);
      }
    }
  }
}

.navopen {
  &-enter-active,
  &-leave-active {
    transition: $time cubic-bezier(0, 0.7, 0.7, 1);

    .search-info {
      transform-origin: top;
      transition: $time;
    }

    li {
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition: #{($time-val - ($i * $time-val) / 10)}s #{$i * $time-val / 10}s;
        }
      }

      // transition: 2s 1s;
    }
  }

  &-enter-to,
  &-leave {
    // opacity: 1;
  }

  &-enter,
  &-leave-to {
    // opacity: 0;
    // transform: translateY(-100%);
    // height: 0;

    .search-info {
      transform: scaleY(0);
    }

    li {
      opacity: 0.5;
      transform: translateY(-40px);
    }
  }
}
</style>
