<template lang="html">
  <div v-if="event">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
       <h4 class="dialog-title">
          <span> {{ $t('deleteEvent')}}</span>
        </h4>
        <br>
        <p>{{ $t('confirmDeleteEvent')}}</p>
        <p>{{ $t('deleteEventInfo')}}</p>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="default" @click="dialogVisible = false">
          {{ $t('cancel')}}
        </el-button>
        <el-button class="dialog-btn" type="danger" @click="deleteEvent" :loading="isLoading">
          {{ $t('delete')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiEvents from '@/services/ApiEvents.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogDeleteEvent',
  mixins: [utilities],
  props: ['openDialog', 'event'],
  data() {
    return {
      dialogVisible: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    async deleteEvent() {
      this.isLoading = true
      try {
        await ApiEvents.delete(this.event._id)
        this.isLoading = false
        this.$emit('closeDialog')
        this.$router.push(`/team/${this.currentTeam._id}/events`)
        this.$notify({
          title: 'Succès',
          message: this.$t('eventDeleted'),
          type: 'success'
        })
      } catch (err) {
        this.isLoading = false
        this.$emit('closeDialog')
        this.impossibleActionNotify()
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
