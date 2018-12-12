<template lang="html">
  <div v-if="user">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <h4 class="dialog-title">Salut {{ currentUser.firstName }} 👋</h4>
        <br>
        <p v-html="$t('dialogContactSentence')"></p>
        <br>
        <el-input type="textarea" :rows="5" v-model="newMessage" placeholder="Ecris ton message ici...">
        </el-input>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="default" @click="dialogVisible = false">
          {{$t('cancel')}}
        </el-button>
        <el-button class="dialog-btn" type="success" @click="sendMessage" 
          :disabled="newMessage.length === 0" :loading="isLoading">
          {{$t('send')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiUsers from '@/services/ApiUsers.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogContact',
  mixins: [utilities],
  props: ['openDialog', 'user'],
  data() {
    return {
      newMessage: '',
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async sendMessage() {
      this.isLoading = true
      try {
        const body = {
          content: this.newMessage,
          user: null,
          sender: this.currentUser._id
        }
        await ApiUsers.sendMessage(body)
        this.isLoading = false
        this.$emit('closeDialog')
        this.newMessage = ''
        this.$notify({
          title: this.$t('success'),
          message: this.$t('messageSent'),
          type: 'success'
        })
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
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
