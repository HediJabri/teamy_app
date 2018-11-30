<template lang="html">
  <div v-if="team">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()" :top="'5vh'">
      <div class="dialog-body">
        <h4 class="dialog-title">
          <span v-if="formMode === 'create'">Ajouter une saison </span>
          <span v-else>Editer la saison </span>
        </h4>
        <div class="dialog-content" v-if="dialogVisible">
          <form-season-create v-if="formMode === 'create'" 
            :team="team" :displayStatus="true" :backButton="true" 
            v-on:backAction="closeDialog()" v-on:seasonCreated="addSeason($event)" />
          <form-season-edit v-else-if="season" :season="season" :team="team" :displayStatus="true" :backButton="true"
            v-on:backAction="closeDialog()" v-on:seasonEdited="seasonEdited($event)" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import FormSeasonCreate from '@/components/forms/FormSeasonCreate'
import FormSeasonEdit from '@/components/forms/FormSeasonEdit'

export default {
  name: 'DialogSeasonManage',
  mixins: [utilities],
  props: ['openDialog', 'team', 'formMode', 'season'],
  components: { FormSeasonCreate, FormSeasonEdit },
  data () {
    return {
      isLoading: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    ...mapActions(['addTeamSeason', 'editTeamSeason']),
    addSeason(season) {
      this.addTeamSeason(season)
      this.closeDialog()
      this.$notify({ title: 'Succès', message: 'La saison a bien été ajouté', type: 'success' })
    },
    seasonEdited(season) {
      this.editTeamSeason(season)
      this.closeDialog()
      this.$notify({ title: 'Succès', message: 'La saison a bien été modifié', type: 'success' })
    },
    closeDialog() {
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
    i { margin: 0 0 0 5px; font-size: 20px; }
  }
  p { 
    font-size: 15px;
    line-height: 28px;
    span { font-weight: 600 }
  }
}
.dialog-content {
  margin-top: 30px;
  margin-bottom: 25px;
  p {text-align: center;}
}

</style>
