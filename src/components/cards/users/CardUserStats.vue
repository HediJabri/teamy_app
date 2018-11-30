<template lang="html">
  <div class="card-user-stats" v-if="user">
    <div class="card-user-stats-title">
      <div class="card-user-stats-title-text">
        <h5>stats</h5>
      </div>
    </div>
    <div class="card-user-stats-body">
      <p>🚧 Bientôt Disponible...</p> 
      <!-- <div><span class="text-user-info">Match Amicaux : </span></div>
      <div><span class="text-user-info">Match de Compétition : </span></div>
      <div><span class="text-user-info">Total de matchs :</span></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardUserStats',
  props: ['user']
}
</script>

<style lang="scss" scoped>

.card-user-stats {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-user-stats-title {
  @include title-card();
  .card-user-stats-title-text {
    @include flex-start();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 17px;
    }
  }
}
.card-user-stats-body {
  padding: 20px;
  margin-top: 22px;
  p { text-align: left;}
  div {
    @include flex-start();
    margin-bottom: 4px;
    .text-user-info {
      padding-bottom: 1px;
    }
    .emoji {
      font-size: 17px;
      margin-right: 5px;
    }
  }
}
.card-user-stats-list-item {
  @include list-item-m();
}
</style>
