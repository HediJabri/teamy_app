<template lang="html">
  <div class="card-team-overview" v-if="team">
    <div class="card" 
      v-if="team.token && linkTeam">
      <div class="card-title">
        <div class="card-title-text">
          <h5>{{$t('invitationLink')}}</h5>
        </div>
        <button-team-link :team="team">
          <el-button type="primary" class="btn-s">
            <span>{{$t('see')}} <i class="fa fa-plus-circle margin-left"></i></span>
          </el-button>
        </button-team-link>
      </div>
    </div>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import ButtonTeamLink from '@/components/buttons/teams/ButtonTeamLink'

export default {
  name: 'CardTeamLink',
  mixins: [utilities],
  props: ['team'],
  components: {
    ButtonTeamLink
  },
  data() {
    return {
      activeTab: true
    }
  },
  computed: {
    linkTeam() {
      return `${process.env.VUE_APP_BASE_APP_URI}register/${this.team.token}`
    }
  },
  methods: {
    linkToRegister() {
      window.open(`${this.linkTeam}/view_mode`, '_blank')
    },
    copyLink() {
      this.$copyText(this.linkTeam)
      this.$message({ message: 'Copié !', center: true, duration: 1000 })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  min-height: 30px;
  padding: 26px 20px;
}
.card-title {
  @include title-card();
  border-bottom: none;
  .card-title-text {
    @include flex-space-between();
    h5 {
      text-transform: uppercase;
    }
  }
  .el-button {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 12px;
  }
}
</style>
