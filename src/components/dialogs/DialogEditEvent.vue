<template lang="html">
  <div v-if="event">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
       <h4 class="dialog-title">
          <span>Modifier l'évenement</span>
        </h4>
        <br>
        <p>Veux tu <strong>prévenir les participants par mail</strong> de la modification de l'événement ?</p>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button class="dialog-btn" type="success" @click="confirm(true)">
          Oui
        </el-button>
        <el-button class="dialog-btn" type="danger" @click="confirm(false)">
          Non
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogEditEvent',
  mixins: [utilities],
  props: ['openDialog', 'event'],
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    confirm(action) {
      this.$emit('confirmEditEvent', action)
    },
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
    },
    dialogVisible () {
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
