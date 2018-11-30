<template lang="html">
  <div class="card-team-overview" v-if="team">
    <div class="card-team-intro">
      <div class="card-team-intro-title">
        <div class="card-team-intro-title-text">
          <h5>l'équipe</h5>
        </div>
      </div>
      <div class="card-team-intro-body">
        <div class="card-team-intro-list-item"
          :class="{'active': activeTab}"
          @click="showTeam">
          <div class="card-team-intro-logo">
            <div class="logo-wrapper">
              <img v-if="team.logo" :src="team.logo">
              <span v-else ><i class="fa fa-shield blue-grey"></i></span>
            </div>
          </div>
          <div class="list-item-body">
            <p class="list-item-body-top">{{ team.name }}</p>
            <p v-if="team.section" class="list-item-body-bottom">
              <span>{{ team.section }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-team-home" v-if="team">
      <div class="card-team-home-title">
        <div class="card-team-home-title-text">
          <h5>domicile</h5>
        </div>
        <router-link v-if="isMainAdmin(currentUser, team) && !isTeamOverview"
          class="card-icon-cog" :to="`/team/${team._id}/edit`">
          <el-tooltip content="Modifier le domicile" placement="top" :open-delay="300">
            <i class="material-icons">settings</i>
          </el-tooltip>
        </router-link>
      </div>
      <div class="card-team-home-body">
        <p v-if="team.city" class="card-team-home-text">
          <i class="material-icons">room</i>
          <span>{{ team.city }}</span>
        </p>
        <p class="card-team-home-text"
          v-if="formatTeamLocation(team)">
          <i class="material-icons">home</i>
          <span>{{ formatTeamLocation(team).name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/main'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardTeamInfos',
  mixins: [utilities],
  props: ['team'],
  data () {
    return {
      activeTab: true,
      copySucceeded: null,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeamLocation']),
    linkTeam () {
      return `${process.env.VUE_APP_BASE_APP_URI}register/${this.team.token}`
    },
    isTeamOverview () {
      return this.$route.name === 'team-overview'
    }
  },
  methods: {
    showTeam () {
      this.$emit('showTeam')
      eventBus.$emit('resetActiveTeamMembers')
    },
    linkToRegister () {
      window.open(`${this.linkTeam}/view_mode`, '_blank')
    },
    copyLink () {
      this.$copyText(this.linkTeam)
      this.$message({ message: 'Copié !', center: true, duration: 1000 });
    },
    openDialogShareInvitation () {
      this.$emit('openDialogShare')
    }
  },
  created () {
    eventBus.$on('showTeamCard', () => {
      this.showTeam()
    })
  }
}
</script>

<style lang="scss" scoped>
// Card Team Intro
.card-team-intro {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-team-intro-title {
  @include title-card();
  .card-team-intro-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-team-intro-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  .logo-wrapper span {
    width: 50px;
    height: 50px;
    @include flex-center();
    i {
      font-size: 30px;
    }
  }
}
.card-team-intro-body {
  margin-top: 22px;
}
.card-team-intro-list-item {
  @include list-item-m();
}
// Card Team Info
.card-team-info {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-team-info-title {
  @include title-card();
  .card-team-info-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}

.card-team-home {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-team-home-title {
  @include title-card();
  .card-team-home-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
  .card-icon-cog {
    position: absolute;
    bottom: 10px;
    right: 15px;
    i {
      font-size: 17px;
      color: $text-grey-blue;
      cursor: pointer;
    }
  }
}

.card-team-home-body {
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
</style>
