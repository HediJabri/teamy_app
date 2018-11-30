<template>
  <div class="card">
    <div class="card-title">
      <h5>Saisons</h5>
      <el-button type="primary" v-if="isAdmin(currentUser, currentTeam)" class="card-add-btn" 
        @click="openDialogSeasonManage('create', null)">
        <span>Ajouter </span> <i class="fa fa-plus-circle margin-left"></i>
      </el-button>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Statut</th>
                <th>Editer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="season in currentTeam.seasons" :key="season._id"
                :class="{'semi-bold': season.currentSeason }">
                <th scope=row>{{ season.name }}</th>
                <td>{{ formatDate(season.dateStart) }}</td>
                <td>{{ formatDate(season.dateEnd) }}</td>
                <td v-if="season.currentSeason">Actuelle</td>
                <td v-else>Archivée</td>
                <td><i class="material-icons" @click="openDialogSeasonManage('edit', season)">settings</i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
     <dialog-season-manage
      v-show="currentTeam" :team="currentTeam" :formMode="formMode" :season="season"
      :openDialog="dialogSeasonManage" @closeDialog="dialogSeasonManage = false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogSeasonManage from '@/components/dialogs/DialogSeasonManage'

export default {
  name: 'CardSeasonsList',
  mixins: [utilities],
  components: { DialogSeasonManage },
  data () {
    return {
      dialogSeasonManage: false,
      formMode: null,
      season: null,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    openDialogSeasonManage(formMode, season) {
      this.season = season
      this.formMode = formMode
      this.dialogSeasonManage = true
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  text-align: center;
  padding: 30px 0 0 0;
}
.card-title {
  @include title-card();
  @include flex-center();
  text-transform: uppercase;
  h5 { font-size: 15px; }
  .card-add-btn {
    position: absolute;
    right: 10px;
    top: 9px;
  }
}
.card-body {
  padding-top: 20px;
}
.table {
  padding: 10px 20px;
  color: $blue-dark-transparent;
  thead {
    th {
      font-weight: 600;
      padding: 15px 20px;
      border-bottom: 1px solid $grey-light;
      text-align: center;
    }
  }
  tbody {
    th, td {
      color: $blue-dark-transparent;
      padding: 16px 20px;
      border: none;
      font-weight: 400;
      text-align: center;
      i { font-size: 17px; color: $text-grey-blue; cursor: pointer }
    }
    .semi-bold th, .semi-bold td { font-weight: 600; }
  }
}
.table-striped>tbody>tr:nth-of-type(odd) {
  background-color: $background-grey;
}

@media only screen and (max-width: 479px) {
  .card-add-btn {
    span { display:none }
    i { margin: 0 }
  }
  .table thead tr th:nth-child(2),
  .table thead tr th:nth-child(3),
  .table thead tr th:nth-child(4) {
    display: none
  }
  .table tbody tr td:nth-child(2),
  .table tbody tr td:nth-child(3),
  .table tbody tr td:nth-child(4), {
    display: none
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .table thead tr th:nth-child(2),
  .table thead tr th:nth-child(3) {
    display: none
  }
  .table tbody tr td:nth-child(2),
  .table tbody tr td:nth-child(3) {
    display: none
  }
}

</style>