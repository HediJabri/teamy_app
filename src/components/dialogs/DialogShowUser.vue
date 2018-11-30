<template lang="html">
  <div v-if="user">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <div class="dialog-user-avatar">
          <img v-if="user.avatar" :src="user.avatar">
          <img v-else src="../../assets/img/user.png">
        </div>
        <h4 class="dialog-title">
          {{ user.firstName }}
          {{ user.lastName }}
        </h4>
        <div class="dialog-user-info" v-if="userHasInfos(user)">
          <span v-if="user.birthdate">{{ formatAge(user) }} ans</span>
          <span v-if="user.height" >{{ user.height }}</span>
          <span v-if="user.weight" >{{ user.weight }}</span>
          <span v-if="user.favoriteFoot" >{{ user.favoriteFoot }}</span>
        </div>
         <h5 v-if="userMemberships" class="dialog-user-team"
          @click="routeUrl(`team/${userMemberships.team._id}`)">
          {{ userMemberships.team.name }}
        </h5>
        <h5 v-else class="dialog-user-team">Joueur libre</h5>
      </div>
      <div class="dialog-footer" slot="footer">
        <div class="dialog-footer-buttons">
          <el-button type="primary" :loading="isLoading"
            @click="routeUrl(`/user/${user._id}`)">
            Voir le profil
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import TagPosition from '@/components/global/TagPosition'

export default {
  name: 'DialogShowUser',
  props: ['user', 'openDialog'],
  mixins: [utilities],
  components: { TagPosition },
  data () {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    userMemberships () {
      return this.user.memberships.find(m => m.status === 'validated')
    }
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
    },
    dialogVisible () {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog', null)
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
  .dialog-user-team {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: $blue-dark;
    padding-bottom: 10px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    @include text-overflow-ellipsis();
  }
}
.el-dialog__footer {
  padding: 30px;
}
.dialog-footer-buttons {
  @include flex-center();
  .btn-network { margin-right: 12px; }
}

</style>
