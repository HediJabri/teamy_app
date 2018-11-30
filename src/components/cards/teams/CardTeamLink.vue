<template lang="html">
  <div class="card-team-overview" v-if="team">
    <div class="card-team-link" 
      v-if="team.token && linkTeam">
      <div class="card-team-link-title">
        <div class="card-team-link-title-text">
          <h5>lien invitation</h5>
          <el-button type="primary"
            class="btn-s" @click="openDialogShareInvitation()">
            <span>Voir <i class="fa fa-plus-circle margin-left"></i></span>
          </el-button>
        </div>
      </div>
      <!-- <div class="card-team-link-body">
        <el-input v-model="linkTeam" size="small"></el-input>
        <el-button slot="append" @click="copyLink()">
          <i class="fa fa-link"></i>
        </el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardTeamLink',
  mixins: [utilities],
  props: ['team'],
  data () {
    return {
      activeTab: true,
      copySucceeded: null,
    }
  },
  computed: {
    linkTeam () {
      return `${process.env.VUE_APP_BASE_APP_URI}register/${this.team.token}`
    }
  },
  methods: {
    linkToRegister() {
      window.open(`${this.linkTeam}/view_mode`, '_blank')
    },
    copyLink() {
      this.$copyText(this.linkTeam)
      this.$message({ message: 'Copié !', center: true, duration: 1000 });
    },
    openDialogShareInvitation() {
      this.$emit('openDialogShare')
    }
  },
}
</script>

<style lang="scss" scoped>

.card-team-link {
  @include card();
  min-height: 30px;
  padding: 28px 20px;
}
.card-team-link-title {
  @include title-card();
  border-bottom: none;
  .card-team-link-title-text {
    @include flex-space-between();
    text-transform: uppercase;
  }
}
.card-team-link-body {
  padding: 15px 20px;
  margin-top: 30px;
  .el-button { position: absolute; right: 20px; font-size: 12px;}
  .el-input { padding-right: 35px!important; }
}

</style>
