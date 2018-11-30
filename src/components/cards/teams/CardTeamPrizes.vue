<template lang="html">
  <transition name="fade" mode="out-in">
    <div class="card-team-prizes" v-if="team && !member">
      <div class="card-team-prizes-title">
        <div class="card-team-prizes-title-text">
          <!-- <i class="fa fa-trophy"></i> -->
          <h5>palmares</h5>
        </div>
      </div>
      <div class="card-team-prizes-body">
        <div class="card-team-prizes-list-item">
          <!-- Aucun Palmarès -->
          🚧 Bientôt Disponible...
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'card-team-prizes',
  props: ['team', 'member']
}
</script>

<style lang="scss" scoped>

.card-team-prizes {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-team-prizes-title {
  @include title-card();
  .card-team-prizes-title-text {
    @include flex-start();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 17px;
    }
  }
}
.card-team-prizes-body {
  margin-top: 22px;
}
.card-team-prizes-list-item {
  @include list-item-m();
}
</style>
