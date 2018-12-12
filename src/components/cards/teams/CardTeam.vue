<template lang="html">
  <div v-if="team">
    <div class="card">
      <div class="card-image-untitle" @click="routeUrl(`/team/${team._id}/show`)">
        <img v-if="team.photo" :src="team.photo">
        <img v-else src="../../../assets/img/team.png">
      </div>
      <div class="card-logo" v-if="team.logo">
        <div class="logo-wrapper">
          <img v-if="team.logo" :src="team.logo">
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ team.name }}</h5>
        <p class="card-subtitle">
          <span v-if="team.city">{{ team.city }}</span>
        </p>
      </div>
      <router-link v-if="isMainAdmin(currentUser, team)" 
        class="card-icon-cog" :to="`/team/${team._id}/edit`">
        <el-tooltip :content="$t('editTeam')" placement="top" :open-delay="300">
          <i class="material-icons">settings</i>
        </el-tooltip>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardTeam',
  mixins: [utilities],
  props: ['team', 'iconEdit'],
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  text-align: center;
  padding: 0px 0px 10px 0px !important;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 3px 5px rgba(5, 15, 44, 0.15);
  }
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
</style>
