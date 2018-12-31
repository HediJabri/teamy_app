<template lang="html">
  <div v-if="participation">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <div class="dialog-user-avatar">
          <img v-if="participation.user.avatar" :src="participation.user.avatar">
          <img v-else src="../../assets/img/user.png">
        </div>
        <h4 class="dialog-title">
          {{ participation.user.firstName }}
          {{ participation.user.lastName }}
        </h4>
        <div class="card-user-role" 
          v-if="currentTeam && currentUserMembership(participation.user, currentTeam).position">
          <span>{{ currentUserMembership(participation.user, currentTeam).position }}</span>
        </div>
        <div class="dialog-user-info">
          <span v-if="participation.user.birthdate">{{ formatAge(participation.user) }} ans</span>
        </div>
      </div>
      <div class="dialog-footer" slot="footer"
        v-if="mode === 'composition'">
        <div class="dialog-footer-buttons" 
          v-if="isAdmin(currentUser, event.team)">
          <el-button type="default" :loading="isLoading"
            v-if="!participation.staff"
            @click="updateParticipation(false, true)">
            {{$t('staff')}} <i class="fa fa-share margin-left blue"></i>
          </el-button>
          <el-button type="primary" :loading="isLoading"
            v-if="participation.substitute || participation.staff"
            @click="updateParticipation(false, false)">
            {{$tc('firstTeamPlayer', 1)}} <i class="fa fa-share margin-left"></i>
          </el-button>
          <el-button type="primary" :loading="isLoading"
            v-if="!participation.substitute"
            @click="updateParticipation(true, false)">
            {{$tc('substitute', 1)}} <i class="fa fa-share margin-left"></i>
          </el-button>
        </div>
      </div>
      <div v-else class="dialog-footer" slot="footer" >
        <div class="dialog-footer-buttons" 
          v-if="isAdmin(currentUser, event.team)">
          <el-button type="danger" :loading="isLoading"
            @click="updateParticipationStatus('refused')">
            {{$t('absent')}} <i class="fa fa-times-circle margin-left"></i>
          </el-button>
          <el-button type="success" :loading="isLoading"
            @click="updateParticipationStatus('validated')">
            {{$t('present')}} <i class="fa fa-check-circle margin-left"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiParticipations from '@/services/ApiParticipations'

export default {
  name: 'DialogShowParticipation',
  props: ['participation', 'mode', 'openDialog'],
  mixins: [utilities],
  data() {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentTeam', 'currentUser', 'event'])
  },
  methods: {
    ...mapActions(['updateEventParticipation']),
    async updateParticipation(substitute, staff) {
      const status = 'validated'
      const body = { status, substitute }
      try {
        await ApiParticipations.patch(this.participation._id, body)
        this.participation.status = status
        this.participation.substitute = substitute
        this.participation.staff = staff
        this.updateEventParticipation(this.participation)
        this.dialogVisible = false
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
      }
    },
    async updateParticipationStatus(status) {
      const body = { status }
      try {
        await ApiParticipations.patch(this.participation._id, body)
        this.participation.status = status
        this.updateEventParticipation(this.participation)
        this.dialogVisible = false
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
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
  }
  .dialog-user-avatar {
    @include avatar-l();
    margin: 0 auto;
  }
  .dialog-user-info {
    padding: 20px;
    text-align: center;
    span {
      @include tag-flat();
    }
  }
}
.el-dialog__footer {
  padding-top: 0;
}
.dialog-footer-buttons {
  @include flex-center();
}
</style>
