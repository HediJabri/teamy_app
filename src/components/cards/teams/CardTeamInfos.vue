<template>
  <div v-if="team">
    <base-card>
      <template slot="cardTitle">{{$t('Team')}}</template>
      <div slot="cardBody">
        <div class="card-list-item"
          :class="{'active': activeTab}"
          @click="showTeam">
          <div class="card-logo">
            <div class="logo-wrapper">
              <span><i class="fa fa-shield blue-grey"></i></span>
            </div>
          </div>
          <div class="list-item-body">
            <p class="list-item-body-top">{{ team.name }}</p>
            <p v-if="team.sport" class="list-item-body-bottom">
              <span>{{ $t(team.sport) }}</span>
            </p>
          </div>
        </div>
      </div>
    </base-card>
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
  data() {
    return {
      activeTab: true,
      copySucceeded: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeamLocation'])
  },
  methods: {
    showTeam() {
      this.$emit('showTeam')
      eventBus.$emit('resetActiveTeamMembers')
    }
  },
  created() {
    eventBus.$on('showTeamCard', () => {
      this.showTeam()
    })
  }
}
</script>

<style lang="scss" scoped>
.card-list-item {
  @include list-item-m();
}
.card-logo {
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
</style>
