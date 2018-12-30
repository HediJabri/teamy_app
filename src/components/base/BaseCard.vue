<template functional>
  <div class="card" :class="data.class">
    <div class="card-title">
      <div class="card-title-text">
        <h5><slot name="cardTitle"></slot></h5>
        <span><slot name="cardSubTitle"></slot></span>
      </div>
      <div class="card-title-button">
        <slot name="cardTitleButton"></slot>
      </div>
    </div>
    <div class="card-body">
      <slot name="cardBody"></slot>
    </div>
  </div>
</template>
<script>
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'BaseCard',
  mixins: [utilities]
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
  }
  .card-title-button {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
.card-body {
  margin-top: 22px;
}
// Class options
.card.fixed-l {
  height: 230px;
}
.card.transparent {
  background-color: transparent;
  box-shadow: none;
}
.card.title-center {
  .card-title-text {
    @include flex-center();
  }
}
</style>
