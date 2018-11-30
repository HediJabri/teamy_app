<template lang="html">
  <div class="dialog-wrapper">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-container" v-if="team">
        <div class="dialog-body">
          <div class="dialog-team-logo">
            <div class="logo-wrapper">
              <img v-if="team.logo" :src="team.logo">
              <i v-else class="fa fa-shield"></i>
            </div>
          </div>
          <div class="dialog-team-info">
            <h5>{{ team.name }}</h5>
            <p class="dialog-team-section">
              <span v-if="team.section">{{ team.section }}</span> 
            </p>
          </div>
          <form-role-select v-if="displayForm" :team="team" 
            v-on:closeDialog="dialogVisible = false"
            v-on:membershipCreated="membershipCreated()"/>
          <div v-else>
            <div class="dialog-team-members">
              <div class="avatar-box" v-if="teamMembershipsReversed && teamMembershipsReversed.length" 
                :style="{ width: avatarWrapperWidth()}">
                <div class="avatar-item plus" v-if="teamMembershipsValidated.length > 7">
                  +{{ teamMembershipsValidated.length - teamMembershipsReversed.length }}
                </div>
                <div class="avatar-item" v-for="(membership, index) in teamMembershipsReversed" :key="membership._id"
                  :style="{ right: memberAvatarPosition(index)}">
                  <img v-if="membership.user && membership.user.avatar" :src="membership.user.avatar">
                  <img v-else src="../../assets/img/user.png">
                </div>
              </div>
            </div>
            <div class="dialog-footer-buttons">
              <el-button type="primary"
                v-if="isPendingMember(team._id)"
                :loading="isLoading"
                @click="desactivateMembership">
                Annuler la demande
                <i class="fa fa-times margin-left"></i>
              </el-button>
              <el-button type="primary" class="card-activity-dash-title-btn"
                v-else-if="!isMember(currentUser, team) && !teamMembershipsIsFull(team)"
                @click="displayForm = true">
                Rejoindre l'équipe
                <i class="fa fa-plus-circle margin-left"></i>
              </el-button>
              <el-button type="default" :loading="isLoading"
                @click="routeUrl(`/home/team/${team._id}/overview`)">
                Voir l'équipe
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <teamy-spinner v-else />
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import ApiMemberships from '@/services/ApiMemberships.js'
import TagPosition from '@/components/global/TagPosition'
import TeamySpinner from '@/components/global/TeamySpinner'
import FormRoleSelect from '@/components/forms/FormRoleSelect'

export default {
  name: 'DialogShowTeam',
  props: ['teamId', 'openDialog'],
  mixins: [utilities],
  components: { FormRoleSelect, TagPosition, TeamySpinner },
  data () {
    return {
      team: null,
      teamMemberships: null,
      dialogVisible: false,
      isLoading: false,
      displayForm: false,
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    teamMembershipsValidated() {
      return this.team.memberships.filter(m => m.status === 'validated')
    },
    teamMembershipsReversed () {
      let members = this.team.memberships.filter(m => m.status === 'validated')
      if (members.length > 7) {
        let slicedMembers = members.slice(0, 7)
        return slicedMembers.reverse()
      }
      return members.reverse()
    }
  },
  methods: {
     ...mapActions(['initUser', 'addUserMembership', 'updateUserMembership']),
    avatarWrapperWidth() {
      return `${(this.teamMembershipsReversed.length * 22) + 20}px`
    },
    memberAvatarPosition(index) {
      return `${index * 22}px`
    },
    async getTeam(id) {
      try {
        const team = (await ApiTeams.get(id)).data.team
        if (team) this.team = team
      } catch (err) {
        this.errorNotify(err)
      }     
    },
    membershipCreated() {
      this.dialogVisible = false
      this.$notify({ title: 'Succès', message: 'La demande a bien été envoyée par mail', type: 'success' })
    },
    async desactivateMembership() {
      const params = 'removeRequest'
      const membership = this.currentUser.memberships.find(m => m.team._id === this.team._id)
      try {
        await ApiMemberships.desactivate(membership._id, params)
        membership.status = 'desactivated'
        this.updateUserMembership(membership)
        this.dialogVisible = false
        this.$notify({ title: 'Succès', message: 'La demande à bien été annulée', type: 'success' })
      } catch (err) {
        this.errorNotify(err)
      }     
    }
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
    },
    dialogVisible () {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog', null)
        this.displayForm = false
      }
    }
  },
  created() {
    if (this.teamId) this.getTeam(this.teamId)
  }
}
</script>

<style lang="scss" scoped>

.dialog-body {
  padding: 0px 25px 10px 25px;
  text-align: center;
  color: $blue-dark-medium;
  .dialog-team-logo {
    @include flex-center();
    .logo-wrapper {
      height: 55px;
      width: 55px;
    }
    i { 
      font-size: 40px;
      margin-top: 8px;
      color: $blue-france;
    }
  }
  .dialog-team-info {
    @include text-overflow-ellipsis();
    padding: 0 20px;
    h5 { font-size: 17px; line-height: 20px; margin-bottom: 0px;}
  }
  .dialog-team-section {
    @include flex-center();
    color: $text-grey-blue;
    margin: 0 0 5px;
    font-size: 13px;
    height: 30px;
    p { @include text-overflow-ellipsis(); }
  }
}
.dialog-team-members {
  height: 50px;
  @include flex-center();
  .avatar-box {
    position: relative;
    width: 40px;
    height: 40px;
  }
  .avatar-item {
    @include avatar-s();
    border: 3px solid white;
    position: absolute;
    top: 0;
  }
  .avatar-item.plus {
    @include flex-center();
    right: -24px;
    background: $blue;
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding-left: 6px;
  }
}
.el-dialog__footer {
  padding: 30px;
}
.dialog-footer-buttons {
  @include flex-center();
   margin: 10px 0;
  .btn-network { margin-right: 12px; }
}
.teamy-spinner {
  @include flex-center();
  height: 234px;
}

</style>
