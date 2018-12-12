<template lang="html">
  <div v-if="currentUser">
    <el-dialog title="" :visible.sync="dialogVisible"
      :fullscreen="smallDevice()" :show-close="false" :close-on-click-modal="false">
      <div class="dialog-body">
        <div class="dialog-body-team-join" 
          v-if="onbordingTeam && stepDisplayed === 'welcome'">
          <h4 class="dialog-title">{{ $t('welcome')}} 👋 </h4><br>
           <div class="body-text">
            <p> <span>{{ onbordingTeam.mainAdmin.firstName }}</span> {{ $t('inviteYouToJoinHisTeam')}}: "{{ onbordingTeam.name }}" </p>
            <p v-html="$t('indicateRoleAndPosition')"></p>
           </div>
           <form-role-select :team="onbordingTeam" :validatedMembership="true"
              v-on:membershipCreated="goToNextStep('formUser')" />
        </div>
        <div class="dialog-body-welcome" v-else-if="!onbordingTeam && stepDisplayed === 'welcome'">
          <h4 class="dialog-title">{{ $t('welcome')}} 👋 </h4><br>
          <p><span> Hello {{ currentUser.firstName }} !!</span></p>
          <p v-html="$t('welcomeOnTeamy')"></p>
          <div class="body-text">
            <p v-html="$t('createOrJoinTeam')"></p>
            <p v-html="$t('planAndParticipate')"></p>
            <p v-html="$t('manageAndAnalyse')"></p>
            <p v-html="$t('communicateEasily')"></p>
          </div>
          <div class="dialog-footer" slot="footer">
            <el-button class="dialog-btn" type="primary" 
              @click="goToNextStep('formUser')">
              {{ $t('continue')}}
            </el-button>
          </div>
        </div>
         <div class="dialog-body-form-user" v-if="stepDisplayed === 'formUser'">
          <h4 class="dialog-title">{{$t('welcome')}} 👋 </h4><br>
          <p v-html="$t('completeProfilPicture')"></p>
          <form-user-edit :onbordingMode="true" v-on:infosValidated="goToNextStep('onborded')"/>
        </div>
        <div class="dialog-body-onborded" v-if="stepDisplayed === 'onborded'">
          <h4 class="dialog-title">{{$t('allGood')}}</h4><br>
          <div v-if="onbordingTeam">
            <p>{{$t('youAreATeamMember')}} <span>"{{ onbordingTeam.name }}". <br><br>{{$t('youCanNow')}}:</span>  </p>
            <div v-html="$t('onbordingTeamEndSentence')"></div>
          </div>
          <p v-else v-html="$t('onbordingEndSentence')">/p>
          <div class="dialog-footer" slot="footer">
            <el-button class="dialog-btn" type="primary" 
              :loading="isLoading" @click="editUserOnbording()">
              {{ $t('hereWeGo')}}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import Auth from '@/services/Auth.js'
import ApiUsers from '@/services/ApiUsers.js'
import FormUserEdit from '@/components/forms/FormUserEdit'
import FormRoleSelect from '@/components/forms/FormRoleSelect'

export default {
  name: 'DialogUserWelcome',
  mixins: [utilities],
  props: ['team'],
  components: { FormUserEdit, FormRoleSelect },
  data() {
    return {
      dialogVisible: true,
      stepDisplayed: 'welcome',
      isLoading: false,
      onbordingTeam: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    modalTop() {
      return this.stepDisplayed === 'formUser' ? '5vh' : '15vh'
    }
  },
  methods: {
    ...mapActions([
      'initUser',
      'initTeam',
      'editInfoHighlighted',
      'editContactHighlighted'
    ]),
    closeDialog() {
      this.dialogVisible = false
      this.isLoading = false
    },
    goToNextStep(step) {
      this.stepDisplayed = step
      this.manageHighlightedInfo(step)
    },
    membershipCreated() {
      this.dialogVisible = false
      this.$notify({
        title: this.$t('success'),
        message: this.$t('requestSent'),
        type: 'success'
      })
    },
    manageHighlightedInfo(step) {
      if (step === 'helpIntro') {
        this.editInfoHighlighted(true), this.editContactHighlighted(true)
      }
      if (step === 'onborded') {
        this.editInfoHighlighted(false), this.editContactHighlighted(false)
      }
    },
    async editUserOnbording() {
      try {
        this.isLoading = true
        let onbording = this.currentUser.onbording
        onbording.userWelcome = false
        const res = await ApiUsers.put(this.currentUser._id, { onbording })
        if (res.data.success) this.getUser()
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
      }
    },
    async getUser() {
      try {
        const user = (await ApiUsers.get(this.currentUser._id)).data.user
        Auth.destroyTeam()
        this.initUser(user)
        this.$router.push('/')
        this.closeDialog()
      } catch (err) {
        this.errorNotify(err)
        this.closeDialog()
      }
    }
  },
  created() {
    const onbordingTeam = Auth.getTeam()
    if (onbordingTeam && !this.teamMembershipsIsFull(onbordingTeam)) {
      this.onbordingTeam = onbordingTeam
    }
    if (onbordingTeam && this.isMember(this.currentUser, onbordingTeam)) {
      this.stepDisplayed = 'onborded'
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
  p {
    font-size: 15px;
    line-height: 26px;
    /deep/ span {
      font-weight: 600;
    }
  }
  h5 span {
    font-weight: bold;
  }
  .dialog-body-text {
    margin-left: 20px;
  }
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.dialog-footer {
  height: 50px;
  margin-top: 40px;
  padding: 0px;
  @include flex-center();
}

.dialog-body-form-user {
  p {
    text-align: center;
    margin-bottom: 40px;
  }
}

.dialog-body-help-intro {
  i {
    color: $blue;
    font-size: 16px;
    margin: 0 3px;
  }
  span.icon-wrapper {
    position: relative;
    i {
      color: $blue;
      font-size: 20px;
      position: absolute;
      top: 0;
      left: 4px;
    }
  }
}

.dialog-body-team-join {
  .body-text {
    p {
      text-align: center;
    }
    margin-bottom: 40px;
  }
}

.dialog-body-onborded {
  .dialog-body-title {
    text-align: center;
    font-size: 16px;
    margin-bottom: 30px;
  }
  .dialog-footer {
    margin-top: 40px;
  }
}
</style>
