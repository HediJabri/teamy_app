<template lang="html">
  <div class="teamy-spinner">
    <div v-if="logo"
      class="teamy-spinner-wrapper"
      :class="{'full-mode': fullMode}">
      <div></div>
      <spinner :speed="0.9" :size="35"
      :lineSize="3" :line-bg-color="'#DBE0EC'" :line-fg-color="'#F8FAFF'"/>
      <img class="teamy-spinner-logo" src="../../assets/img/teamy-logo-grey.png" alt="">
    </div>
    <div v-else class="teamy-spinner-simple">
      <spinner :speed="0.9" :size="35"
      :lineSize="3" :line-bg-color="'#DBE0EC'" :line-fg-color="'#F8FAFF'"/>
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'

export default {
  name: 'TeamySpinner',
  props: ['logo', 'fullMode'],
  components: { Spinner }
}
</script>

<style lang="scss" scoped>
.teamy-spinner-wrapper {
  @include flex-space-between();
  height: calc(100vh - 150px);
  flex-direction: column;
  .teamy-spinner {
    margin-bottom: 80px;
  }
  .teamy-spinner-logo {
    width: 120px;
    margin-bottom: 30px;
  }
}
.teamy-spinner-wrapper.full-mode {
  height: 100vh;
}
</style>
