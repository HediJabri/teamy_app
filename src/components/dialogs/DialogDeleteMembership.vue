<template lang="html">
  <div v-if="team && membership">
    <el-dialog title="" :visible.sync="dialogVisible" size="small" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <h4 class="dialog-title">
          <span v-if="isCurrentUser(membership.user)">Me retirer de l'équipe</span><span v-else>Retirer de l'équipe</span>
        </h4>
        <br>
        <p v-if="isCurrentUser(membership.user)">Tu es sûr de vouloir te retirer de  <strong> {{ team.name }} </strong> ? 😱</p>
        <p v-else>Tu es sûr de vouloir retirer <strong> {{ membership.user.firstName }}</strong>  de {{ team.name }} ? 😱</p>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="default" @click="dialogVisible = false">
          Annuler
        </el-button>
        <el-button class="dialog-btn" type="danger" @click="desactivateMembership" :loading="isLoading">
          <span v-if="isCurrentUser(membership.user)">Me retirer</span><span v-else>Retirer</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main'
import { utilities } from '@/mixins/utilities.js'
import ApiMemberships from '@/services/ApiMemberships.js'

export default {
  name: 'DialogDeleteMembership',
  mixins: [utilities],
  props: ['openDialog', 'membership', 'team'],
  data () {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
  },
  methods: {
    ...mapActions(['updateUserMembership', 'updateTeamMembership', 'removeTeam']),
    async desactivateMembership() {
      let params
      const membershipId = this.membership._id
      this.isLoading = true
      this.isCurrentUser(this.membership.user) ? params = 'removeFromMember' : params = 'removeFromAdmin'
      try {
        await ApiMemberships.desactivate(membershipId, params)
        this.isCurrentUser(this.membership.user) ? this.updateUserInfos(this.membership) : this.updateTeamInfos(this.membership)
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
      }     
    },
    updateUserInfos(membership) {
      membership.status = 'desactivated'
      this.updateUserMembership(membership)
      this.removeTeam()
      this.isLoading = false
      this.$emit('closeDialog')
      this.$router.push('/')
      this.$notify({ title: 'Succès', message: "Tu as bien été retiré de l'équipe", type: 'success' })
    },
    updateTeamInfos(membership) {
      eventBus.$emit('showTeamCard')
      membership.status = 'desactivated'
      this.updateTeamMembership(membership)
      this.isLoading = false
      this.$notify({ title: 'Succès', message: `${this.membership.user.firstName} a bien été retiré de l'équipe`, type: 'success' })
    }
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
    },
    dialogVisible () {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-body {
  padding: 0px 25px 10px 25px;
  text-align: center;
  color: $blue-dark-medium;
  .dialog-title {
    @include flex-center();
    font-weight: bold;
    i {
      margin: 0 0 0 5px;
      font-size: 20px;
    }
  }
  p {
    font-size: 15px;
  }
  .el-input {
    width: 200px;
  }
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;

}
.el-dialog__footer {
  padding: 20px;
}
</style>
