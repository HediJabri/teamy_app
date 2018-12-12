<template lang="html">
  <div v-if="team">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="mediumDevice()" 
      :show-close="false" :close-on-click-modal="false">
      <div class="dialog-body">
        <div class="dialog-body-team-link">
          <h4 class="dialog-title">
            {{$t('shareTeamRegisterLink')}}
          </h4>
          <br>
          <div class="dialog-body-team-created">
            <p v-html="$t('dialogShareInvitationText')"></p>
            <div class="dialog-body-team-link">
              <el-input v-model="linkTeam" size="medium" >
                <el-button slot="append" @click="copyLink()">
                  <i class="fa fa-link margin-left" aria-hidden="true"></i>
                </el-button>
              </el-input>
              <el-button class="team-link-btn" type="primary" @click="copyLink()">{{$t('copy')}}</el-button>
            </div>
            <p v-html="$t('dialogShareInvitationFooter')"></p>
            <div class="dialog-footer" slot="footer">
              <el-button class="dialog-btn" type="default" @click="closeDialog()">{{$t('back')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogShareInvitation',
  mixins: [utilities],
  props: ['team'],
  data() {
    return {
      dialogVisible: true,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    linkTeam() {
      return `${process.env.VUE_APP_BASE_APP_URI}register/${
        this.$i18n.locale
      }/${this.team.token}`
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    linkToRegister() {
      window.open(`${this.linkTeam}/view_mode`, '_blank')
    },
    copyLink() {
      this.$copyText(this.linkTeam)
      this.$message({
        message: this.$t('copied') + ' 👏',
        center: true,
        duration: 1000
      })
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
    line-height: 28px;
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

.dialog-body-team-created {
  .dialog-body-team-link {
    @include flex-start();
    width: 85%;
    padding: 10px 0;
    margin-bottom: 20px;
    .team-link-btn {
      padding: 10px 17px;
      font-size: 14px;
      margin-left: 10px;
    }
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .dialog-body-team-created .dialog-body-team-link {
    width: 335px;
  }
}
</style>
