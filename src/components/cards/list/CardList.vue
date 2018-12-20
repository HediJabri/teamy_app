<template>
  <div class="card">
    <div class="card-title">
      <div class="card-title-text">
        <slot name="listTitle"></slot>
      </div>
    </div>
    <div class="card-body">
      <slot name="listItems"></slot>
    </div>
  </div>
</template>
<script>
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardList',
  mixins: [utilities]
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-transparent {
  background-color: transparent;
  box-shadow: none;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
  .card-title-button {
    position: absolute;
    right: 20px;
    top: 12px;
  }
}
.card-body {
  margin-top: 22px;
}
</style>
