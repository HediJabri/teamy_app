<template lang="html">
  <div v-if="team">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()"
      :show-close="false" :close-on-click-modal="false">
      <div class="dialog-body">
        <h4 class="dialog-title">Ajoute un lieu 📍</h4>
        <div class="dialog-content">
          <form-location-create :backButton="true" :team="team" :category="category"
            v-on:locationCreated="locationCreated($event)" v-on:backAction="closeDialog()" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import FormLocationCreate from '@/components/forms/FormLocationCreate'

export default {
  name: 'DialogAddLocation',
  mixins: [utilities],
  props: ['openDialog', 'team', 'category'],
  components: { FormLocationCreate },
  data () {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    ...mapActions(['addTeamLocation']),
    locationCreated (location) {
      this.addTeamLocation(location)
      this.$notify({ title: 'Succès', message: 'Le lieu a bien été ajouté', type: 'success' })
      this.$emit('locationCreated', location)
      this.closeDialog()
    },
    closeDialog () {
      this.dialogVisible = false
    }
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
  padding: 0px 25px;
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
    line-height: 28px;
    span {
      font-weight: 600;
    }
  }
}
.dialog-content {
  margin-top: 30px;
  margin-bottom: 15px;
}
</style>
