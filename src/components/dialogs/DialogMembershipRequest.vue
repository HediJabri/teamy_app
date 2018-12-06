<template lang="html">
  <div v-if="team">
    <el-dialog v-if="!teamMembershipsIsFull(team)" title="" 
      :visible.sync="dialogVisible" :fullscreen="smallDevice()" :top="'5vh'">
      <div class="dialog-body">
        <h4 class="dialog-title">
          <span>{{$t('joinTeam')}}</span>
        </h4>
        <div class="dialog-team-logo">
          <div class="logo-wrapper">
            <img v-if="team.logo" :src="team.logo">
            <i v-else class="fa fa-shield blue-grey"></i>
          </div>
        </div>
        <div class="dialog-team-info">
          <h5>{{ team.name }}</h5>
          <p class="dialog-team-section">
            <span v-if="team.section">{{ team.section }}</span> 
          </p>
        </div>
        <form-role-select :team="team" 
          v-on:closeDialog="dialogVisible = false"
          v-on:membershipCreated="membershipCreated()"/>
      </div>
    </el-dialog>
    <el-dialog v-else title="" :visible.sync="dialogVisible" size="small">
      <div class="dialog-body">
        <h4 class="dialog-title">
          <span> {{$t('impossibleToJoin')}}<strong>{{ team.name }} !</strong></span>
        </h4>
        <br>
        <div class="dialog-team-logo">
          <div class="logo-wrapper">
            <img v-if="team.logo" :src="team.logo">
            <img v-else src="../../assets/img/logo-team.png">
          </div>
        </div>
        <br>
        <p><strong>{{ team.name }}</strong>: {{$t('teamMembershipsIsFull')}}</p>
      </div>
      <div class="dialog-footer" slot="footer">
        <div class="dialog-buttons">
          <el-button class="dialog-btn" type="default"
            @click="dialogVisible = false">
            {{$t('cancel')}}
          </el-button>
          <el-button class="dialog-btn" type="success"
            @click="dialogVisible = false" :loading="isLoading">
            {{$t('ok')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import FormRoleSelect from '@/components/forms/FormRoleSelect'

export default {
  name: 'DialogMembershipRequest',
  props: ['team', 'openDialog'],
  mixins: [utilities],
  components: { FormRoleSelect },
  data() {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'sports'])
  },
  methods: {
    membershipCreated() {
      this.dialogVisible = false
      this.$notify({
        title: 'Succès',
        message: 'La demande a bien été envoyée par mail',
        type: 'success'
      })
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
  p {
    text-align: center;
    font-size: 15px;
  }
  .dialog-title {
    @include flex-center();
    font-weight: bold;
    i {
      margin: 0 0 3px 11px;
      font-size: 22px;
    }
  }
  .dialog-team-logo {
    @include flex-center();
    .logo-wrapper {
      height: 35px;
      width: 35px;
    }
    i {
      font-size: 30px;
      margin-top: 8px;
    }
  }
  .dialog-team-section {
    margin-top: 3px;
    font-size: 13px;
    height: 30px;
  }
  .dialog-team-info {
    @include text-overflow-ellipsis();
    padding: 0 20px;
    h5 {
      font-size: 17px;
      line-height: 20px;
      margin-bottom: 0px;
    }
  }
}

.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.dialog-buttons {
  padding: 50px 0 10px 0;
}
</style>
