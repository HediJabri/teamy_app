<template>
  <div v-if="team">
    <base-card v-if="formatTeamLocation(team)">
      <template slot="cardTitle">{{$t('mainHome')}}</template>
      <div slot="cardTitleButton">
        <router-link class="card-icon-cog" :to="`/team/${team._id}/edit`"
          v-if="isMainAdmin(currentUser, team) && !isTeamOverview">
          <el-tooltip :content="$t('editMainLocation')" placement="top" :open-delay="300">
            <i class="material-icons">settings</i>
          </el-tooltip>
        </router-link>
      </div>
      <div slot="cardBody" class="card-body">
        <p class="card-text">
          <i class="material-icons">location_on</i>
          <span>{{ formatTeamLocation(team).name }}</span>
        </p>
      </div>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardTeamHome',
  mixins: [utilities],
  props: ['team'],
  data() {
    return {
      activeTab: true,
      copySucceeded: null
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    isTeamOverview() {
      return this.$route.name === 'team-overview'
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body {
  padding: 0 20px;
  margin-top: 38px;
  p {
    @include flex-start();
    text-transform: capitalize;
    span {
      margin-left: 5px;
    }
    i {
      color: $text-grey-blue;
      font-size: 20px;
      margin-bottom: 2px;
    }
  }
}
.card-icon-cog {
  i {
    font-size: 17px;
    color: $text-grey-blue;
    cursor: pointer;
    margin-top: 8px;
  }
}
</style>
