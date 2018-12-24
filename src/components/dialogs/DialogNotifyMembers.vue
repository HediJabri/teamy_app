<template lang="html">
  <div v-if="event">
    <el-dialog title="" :visible.sync="dialogVisible" :width="dialogWidth" :top="'5vh'" :fullscreen="mediumDevice()">
      <div class="dialog">
        <div class="dialog-body">
          <h4 class="dialog-title">
            <span>{{$t('membersToNotify')}}</span>
          </h4>
          <br>
          <div class="dialog-lists">
            <div class="row">
              <div class="col-xs-12 col-sm-10 col-sm-offset-1">
                <div class="dialog-list-card">
                  <div class="card-title">
                    <div class="card-title-text">
                      <i class="material-icons icon-margin-bottom">group</i>
                      <h5>{{$t('members')}}</h5>
                      <div class="check-all-btn">
                        <i class="fa fa-check"
                          :class="{'active': isAllMembersSelected}"
                          @click="selectAllMembers()">
                        </i>
                      </div>
                    </div>
                  </div>
                  <div class="dialog-list-item"
                    :class="{'disable': isMemberSelected(membership.user)}"
                    v-for="(membership, index) in validatedMemberships" :key="index"
                    @click="selectMember(membership.user)">
                    <div class="list-item-content">
                      <div class="list-item-img avatar">
                        <img v-if="membership.user.avatar" :src="membership.user.avatar">
                        <img v-else src="../../assets/img/user.png">
                      </div>
                      <span v-if="isMainAdmin(membership.user, event.team)" class="list-item-badge"><i class="material-icons">stars</i></span>
                      <div class="list-item-body">
                        <p class="list-item-body-top">
                          {{ membership.user.firstName }} {{ membership.user.lastName }}
                          <span v-if="membership.position" class="list-item-tag">{{ membership.position }}</span>
                        </p>
                      </div>
                    </div>
                    <tag-position class="list-item-body-right margin-right" v-if="membership.user.position"
                      :position="membership.user.position"/>
                    <span class="list-item-body-right check-mark" v-else>
                      <i class="fa fa-check" v-if="isMemberSelected(membership.user)"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer" slot="footer">
          <div class="dialog-buttons">
            <span class="dialog-send-number">
              {{$tc('member', selectedUsersCount)}}
            </span>
            <el-button class="dialog-btn" type="primary"
              @click="initMembersToNotify()" :loading="isLoading">
               {{$t('selectMembers')}} <i class="fa fa-check margin-left"></i>
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

export default {
  name: 'DialogsNotifyMembers',
  props: ['openDialog'],
  mixins: [utilities],
  data() {
    return {
      dialogVisible: false,
      isLoading: false,
      selectedMembers: []
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'event']),
    validatedMemberships() {
      if (this.event)
        return this.event.team.memberships.filter(m => m.status === 'validated')
      return []
    },
    isAllMembersSelected() {
      return this.selectedMembers.length === this.validatedMemberships.length
    },
    selectedUsersCount() {
      return this.selectedMembers.length
    },
    dialogWidth() {
      if (this.mediumDevice()) return '100%'
      return '70%'
    }
  },
  methods: {
    ...mapActions(['initMembersToNotify']),
    selectMember(user) {
      if (this.selectedMembers.includes(user)) {
        this.selectedMembers = this.selectedMembers.filter(
          u => u._id !== user._id
        )
      } else {
        this.selectedMembers.push(user)
      }
    },
    selectAllMembers() {
      if (this.isAllMembersSelected) {
        this.selectedMembers = []
      } else {
        this.selectedMembers = []
        for (let membership of this.event.team.memberships) {
          this.selectedMembers.push(membership.user)
        }
      }
    },
    isMemberSelected(user) {
      return this.selectedMembers.includes(user)
    },
    initMembersToNotify() {
      this.$emit('initMembersToNotify', this.selectedMembers)
      this.dialogVisible = false
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
  padding: 0px 15px 10px 15px;
  .dialog-title {
    @include flex-center();
    text-align: center;
    color: $blue-dark-medium;
    font-weight: bold;
    i {
      margin: 0 0 3px 11px;
      font-size: 22px;
    }
  }
}

.dialog-lists {
  margin-top: 10px;
  .dialog-list-card {
    @include card();
    padding: 50px 0 10px 0;
    height: 275px;
    overflow-y: scroll;
    .card-title {
      @include title-card();
      .card-title-text {
        @include flex-start();
        text-transform: uppercase;
        position: relative;
        .check-all-btn {
          position: absolute;
          right: -10px;
          cursor: pointer;
          @include icon-button-default;
        }
        i {
          color: $blue-dark-medium;
          margin: 0 10px 1px 0;
          font-size: 20px;
        }
        i.fa-shield {
          font-size: 18px;
        }
      }
    }
  }
  .dialog-list-item {
    @include list-item-s();
    .list-item-content {
      width: 80% !important;
    }
    .list-item-tag {
      @include tag-flat-s;
    }
    .check-mark {
      @include flex-center();
      width: 20px;
      margin-left: 10px;
      color: $blue-dark-medium;
    }
    .paper-plane {
      @include flex-center();
      width: 20px;
      margin-left: 10px;
      color: $blue;
    }
  }
  .dialog-list-item.disable {
    background: $background-grey;
    cursor: auto;
  }
  .dialog-list-empty {
    font-size: 12px;
    font-weight: 600;
    margin-top: 30px;
    text-align: center;
    p {
      text-align: center;
    }
    .el-button {
      font-size: 12px;
    }
  }
  .dialog-list-empty.network {
    margin-top: 75px;
  }
}

.dialog-info {
  @include flex-start();
  font-size: 12px;
  i {
    font-size: 16px;
    margin: 0 5px 0 0;
  }
}
.dialog-send-number {
  padding: 0 20px;
  color: $text-grey-blue;
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.dialog-footer {
  @include flex-center();
}

@media only screen and (max-width: 479px) {
  .card-title-text h5 {
    font-size: 13px;
  }
  .list-item-body-top {
    width: 100px !important;
    font-size: 12px;
  }
  .dialog-buttons {
    flex-direction: column;
    @include flex-center();
    width: 100%;
  }
  .dialog-send-number {
    margin-bottom: 10px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .form-header-brand {
    width: 80%;
  }
  .el-form {
    padding: 0 10px;
  }
  .dialog-buttons {
    flex-direction: column;
    @include flex-center();
    width: 100%;
  }
  .dialog-send-number {
    margin-bottom: 10px;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1160px) {
  .list-item-body-top {
    width: 95px !important;
  }
}
</style>
