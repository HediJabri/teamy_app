<template lang="html">
  <div v-if="currentUser && currentTeam">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <h4 class="dialog-title">
         {{$t('deleteMyTeam')}}
        </h4>
        <br>
        <p> {{$t('confirmDelete')}} <strong> {{ currentTeam.name }} </strong> ? 😱</p>
        <p v-html="$t('dialogDeleteTeamSentence')"></p>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="default" @click="dialogVisible = false">
          {{$t('cancel')}}
        </el-button>
        <el-button class="dialog-btn" type="danger" @click="deleteTeam" :loading="isLoading">
          {{$t('delete')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiTeams from '@/services/ApiTeams.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogDeleteTeam',
  mixins: [utilities],
  props: ['openDialog'],
  data() {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    ...mapActions(['removeTeam', 'updateUserMembership']),
    async deleteTeam() {
      this.isLoading = true
      let membership = this.currentUser.memberships.find(
        m => m.team && m.team._id === this.currentTeam._id
      )
      try {
        await ApiTeams.desactivate(this.currentTeam._id)
        membership.status = 'desactivated'
        this.updateUserMembership(membership)
        this.removeTeam()
        this.isLoading = false
        this.$emit('closeDialog')
        this.$router.push('/')
        this.$notify({
          title: this.$t('success'),
          message: this.$t('teamDeleted'),
          type: 'success'
        })
      } catch (err) {
        this.isLoading = false
        this.$emit('closeDialog')
        this.impossibleActionNotify()
      }
    }
  },
  watch: {
    openDialog() {
      this.dialogVisible = this.openDialog
    },
    dialogVisible() {
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
