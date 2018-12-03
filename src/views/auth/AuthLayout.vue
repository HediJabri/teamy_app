<template lang="html">
  <div class="banner">
    <div class="banner-nav">
      <dropdown-language :iconWhite="true" />
    </div>
    <div class="banner-wrapper">
      <div class="banner-logo-wrapper">
        <a href="https://teamy.us">
          <img src="../../assets/img/teamy-logo-white.png" class="logo">
        </a>
      </div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import DropdownLanguage from '@/components/global/DropdownLanguage'

export default {
  name: 'AuthLayout',
  components: {
    DropdownLanguage
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-image: linear-gradient(to bottom, #1f69bd, $blue);
  min-height: 100vh;
  @include flex-center();
}
.banner-nav {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
}
.banner-wrapper {
  height: 500px;
  margin-top: 100px;
}
.banner-logo-wrapper {
  @include flex-center();
  margin-bottom: 30px;
  a {
    cursor: pointer;
    position: relative;
  }
  .logo {
    height: 40px;
  }
  .logo-tag {
    color: white;
    position: absolute;
    top: 0px;
    right: -28px;
  }
}
</style>
