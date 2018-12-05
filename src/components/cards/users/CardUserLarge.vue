<template lang="html">
  <div class="card-user" v-if="membership && team">
    <div class="card-user-avatar">
      <img v-if="membership.user.avatar" :src="membership.user.avatar">
      <img v-else src="../../../assets/img/user.png">
    </div>
    <h4 class="card-user-name">
      {{ membership.user.firstName }}
      {{ membership.user.lastName }}
    </h4>
    <div class="card-user-role" v-if="membership.position">
     <span>{{ membership.position }}</span>
    </div>
    <div class="card-user-tag" v-if="membership.user.birthdate">
      <span v-if="membership.user.birthdate">{{ formatAge(membership.user) }} {{$t('yearsOld')}}</span>
    </div>
    <div class="card-user-buttons">
      <div class="card-user-buttons-wrapper">
         <el-button type="primary"
          @click="routeToProfil(membership.user)">
          {{$t('seeProfil')}}
        </el-button>   
      </div>
    </div>
    <div class="card-user-icons">
      <el-tooltip v-if="!isCurrentUser(membership.user)" 
        :content="$t('toContact')" placement="top" :open-delay="300">
        <i class="fa fa-envelope blue icon-contact" @click="openDialogContactUser()"></i>
      </el-tooltip>
      <div v-if="isAdmin(currentUser, team) && !isTeamOverview">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <el-tooltip :content="$t('editProfile')" placement="top" :open-delay="300">
              <i class="material-icons icon-settings">settings</i>
            </el-tooltip>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div class="dropdown-link" @click="openDialogEditMembership()">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">settings</i>
                  <span>{{$t('editProfile')}}</span>
                </span>
              </el-dropdown-item>
            </div>
            <div class="dropdown-link" @click="openDialogDeleteMembership()"
              v-if="!isMainAdmin(membership.user, team)">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">sync</i>
                  <span>{{$t('removeFromTeam')}}</span>
                </span>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>    
    <dialog-delete-membership
      v-show="membership" :membership="membership" :team="team"
      :openDialog="dialogDeleteMembership"
      @closeDialog="dialogDeleteMembership = false" />
    <dialog-edit-membership
      v-show="membership" :membership="membership" :team="team"
      :openDialog="dialogEditMembership"
      @closeDialog="dialogEditMembership = false" />
     <dialog-contact-user
      v-show="membership"
      :user="membership.user"
      :openDialog="dialogContactUser"
      @closeDialog="dialogContactUser = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main'
import ApiMemberships from '@/services/ApiMemberships.js'
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteMembership from '@/components/dialogs/DialogDeleteMembership'
import DialogEditMembership from '@/components/dialogs/DialogEditMembership'
import DialogContactUser from '@/components/dialogs/DialogContactUser'

export default {
  name: 'CardUserLarge',
  props: ['membership', 'team'],
  mixins: [utilities],
  components: {
    DialogDeleteMembership,
    DialogEditMembership,
    DialogContactUser
  },
  data() {
    return {
      user: null,
      dialogDeleteMembership: false,
      dialogEditMembership: false,
      dialogContactUser: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    isTeamOverview() {
      return this.$route.name === 'team-overview'
    }
  },
  methods: {
    ...mapActions(['removeTeamMembership']),
    openDialogDeleteMembership() {
      this.dialogDeleteMembership = true
    },
    openDialogEditMembership() {
      this.dialogEditMembership = true
    },
    openDialogContactUser() {
      this.dialogContactUser = true
    },
    async deleteMembership(id) {
      try {
        await ApiMemberships.delete(id, 'removeFromAdmin')
        this.$emit('showTeam')
        eventBus.$emit('resetActiveTeamMembers')
        const membership = this.team.memberships.find(m => m._id === id)
        this.team.memberships.splice(
          this.team.memberships.indexOf(membership),
          1
        )
        this.removeTeamMembership(membership._id)
        this.$notify({
          title: 'Succès',
          message: `${this.user.firstName} a bien été retiré de l'équipe`,
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-user {
  @include card();
  text-align: center;
  padding: 30px 20px 60px 20px;
}
.card-user.padding-small {
  padding: 30px 20px 40px 20px;
}

.card-user-title-text {
  @include title-card();
  padding: 10px 30px;
  .card-user-title-box {
    @include flex-center();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 18px;
    }
  }
}
.card-user-link {
  cursor: pointer;
}
.card-user-name {
  font-size: 16px;
  @include text-overflow-ellipsis();
  margin-bottom: 2px;
}
.card-user-tag {
  @include flex-center();
  flex-wrap: wrap;
  span {
    @include tag-flat-s();
  }
}
.card-user-role {
  height: 18px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  color: $text-grey-blue;
}

.card-user-avatar {
  @include avatar-l();
  margin: 0 auto;
}

.card-user-icons {
  position: absolute;
  bottom: 10px;
  right: 20px;
  @include flex-center();
  i {
    cursor: pointer;
  }
  i.icon-contact {
    font-size: 14px;
    margin-bottom: 2px;
  }
  i.icon-settings {
    margin-top: 4px;
    margin-left: 8px;
    font-size: 17px;
    color: $text-grey-blue;
  }
}
.card-user-buttons {
  margin-top: 15px;
}
</style>
