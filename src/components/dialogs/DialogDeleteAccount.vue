<template lang="html">
  <div v-if="currentUser">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <h4 class="dialog-title">
         {{ $t('deleteMyAccount')}}
        </h4>
        <br>
        <p>{{ $t('confirmDeleteAccount')}}</p>
        <p>{{ $t('deleteAccountInfo')}} </p>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="default" @click="dialogVisible = false">
          {{ $t('cancel')}}
        </el-button>
        <el-button class="dialog-btn" type="danger" @click="deleteAccount" :loading="isLoading">
          {{ $t('delete')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Auth from '@/services/Auth.js'
import ApiUsers from '@/services/ApiUsers.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogDeleteAccount',
  mixins: [utilities],
  props: ['openDialog'],
  data() {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async deleteAccount() {
      this.isLoading = true
      try {
        await ApiUsers.delete(this.currentUser._id)
        Auth.logout()
        this.$notify({
          title: this.$t('success'),
          message: this.$t('accountDeleted'),
          type: 'success'
        })
      } catch (err) {
        this.isLoading = false
        this.$emit('closeDialog')
        this.impossibleActionNotify(err)
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
