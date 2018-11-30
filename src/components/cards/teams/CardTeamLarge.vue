<template lang="html">
  <div class="card" v-if="team">
    <div class="card-image-untitle">
      <img v-if="team.photo" :src="team.photo">
      <img v-else src="../../../assets/img/team.png">
    </div>
    <div class="card-logo" v-if="team.logo">
      <div class="logo-wrapper">
        <img :src="team.logo">
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ team.name }}</h5>
      <p class="card-subtitle">
        <span v-if="team.city">{{ team.city }}</span>
      </p>
    </div>
    <router-link v-if="isMainAdmin(currentUser, team) && !isTeamOverview"
      class="card-icon-cog" :to="`/team/${team._id}/edit`">
      <el-tooltip content="Modifier l'équipe" placement="top" :open-delay="300">
        <i class="material-icons">settings</i>
      </el-tooltip>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardTeamLarge',
  props: ['team', 'member'],
  mixins: [utilities],
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    isTeamOverview () {
      return this.$route.name === 'team-overview'
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  text-align: center;
  padding: 0px 0px 10px 0px !important;
}
.card-image-untitle {
  width: 100%;
  height: 180px;
  position: relative;
  cursor: pointer;
  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
}
.card-logo {
  @include logo-team-card();
  .logo-wrapper i {
    font-size: 40px;
    margin-top: 8px;
  }
}
.card-body {
  margin-top: 10px;
  padding: 10px 20px;
  .card-title {
    line-height: 20px;
    margin-bottom: 2px;
  }
  .card-subtitle {
    height: 18px;
    font-size: 13px;
    line-height: 24px;
    color: $text-grey-blue;
    text-align: center;
    @include text-overflow-ellipsis;
  }
}
.card-icon-cog {
  position: absolute;
  bottom: 5px;
  right: 15px;
  i {
    font-size: 17px;
    color: $text-grey-blue;
    cursor: pointer;
  }
}
.text-wrapper {
  text-align: center;
  font-size: 13px;
  span {
    font-weight: 500;
  }
}

.card-buttons {
  @include flex-center();
  button {
    margin: 0 10px;
  }
}
</style>
