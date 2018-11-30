<template>
  <div v-if="event && composition && substituteList">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <div class="card-right">
          <div class="card-right-title">
            <div class="card-right-title-text">
              <h5>titulaires</h5>
              <h5 class="card-right-count">
                {{ composition.length }}
              </h5>
            </div>
          </div>
          <div class="card-right-body"
            v-if="composition.length">
            <div class="card-right-list-item"
              v-for="(participation, index) in composition" :key="index"
              @click="toggleParticipationDialog(participation)">
              <div class="list-item-content">
                <div class="list-item-img avatar">
                  <img v-if="participation.user.avatar" :src="participation.user.avatar">
                  <img v-else src="../../assets/img/user.png">
                </div>
                <span v-if="isMainAdmin(participation.user, event.team)" class="list-item-badge"><i class="material-icons">stars</i></span>
                <div class="list-item-body">
                  <p class="list-item-body-top">
                    {{ participation.user.firstName }} {{ participation.user.lastName }}
                  </p>
                </div>
              </div>
              <tag-position class="list-item-body-right" v-if="participation.user.position"
                :position="participation.user.position"/>
              <!-- <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="material-icons">settings</i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div class="dropdown-link">
                    <el-dropdown-item>
                      <span class="dropdown-text">
                        <span>Profil</span>
                      </span>
                    </el-dropdown-item>
                  </div>
                   <div class="dropdown-link">
                    <el-dropdown-item>
                      <span class="dropdown-text">
                        <span>Mettre sur liste d'attente</span>
                      </span>
                    </el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown> -->
            </div>
          </div>
          <div v-else class="card-right-empty-item">
           Aucun joueur titulaire
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="card-left-list">
          <div class="card-left-list-title">
            <div class="card-left-list-title-text">
              <h5>Remplaçants</h5>
              <h5 class="card-left-list-count">{{ substituteList.length }}</h5>
            </div>
          </div>
          <div class="card-left-list-body"
            v-if="substituteList.length">
            <div class="card-left-list-list-item"
              v-for="(participation, index) in substituteList" :key="index"
              @click="toggleParticipationDialog(participation)">
              <div class="list-item-content">
                <div class="list-item-img avatar">
                  <img v-if="participation.user.avatar" :src="participation.user.avatar">
                  <img v-else src="../../assets/img/user.png">
                </div>
                <span v-if="isMainAdmin(participation.user, event.team)" class="list-item-badge"><i class="material-icons">stars</i></span>
                <div class="list-item-body">
                  <p class="list-item-body-top">
                    {{ participation.user.firstName }} {{ participation.user.lastName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card-left-list-empty-item">
            Aucun joueur remplaçant
          </div>
        </div>
         <div class="card-left-list">
          <div class="card-left-list-title">
            <div class="card-left-list-title-text">
              <h5>Staff</h5>
              <h5 class="card-left-list-count">{{ staffList.length }}</h5>
            </div>
          </div>
          <div class="card-left-list-body"
            v-if="staffList.length">
            <div class="card-left-list-list-item"
              v-for="(participation, index) in staffList" :key="index"
              @click="toggleParticipationDialog(participation)">
              <div class="list-item-content">
                <div class="list-item-img avatar">
                  <img v-if="participation.user.avatar" :src="participation.user.avatar">
                  <img v-else src="../../assets/img/user.png">
                </div>
                <span v-if="isMainAdmin(participation.user, event.team)" class="list-item-badge"><i class="material-icons">stars</i></span>
                <div class="list-item-body">
                  <p class="list-item-body-top">
                    {{ participation.user.firstName }} {{ participation.user.lastName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card-left-list-empty-item">
            Aucun membre dans le staff
          </div>
        </div>
      </div>
    </div>
    <dialog-show-participation
      :mode="'composition'"
      v-show="participationShowed"
      :participation="participationShowed"
      :openDialog="dialogShowParticipation"
      @closeDialog="toggleParticipationDialog($event)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogShowParticipation from '@/components/dialogs/DialogShowParticipation'

export default {
  name: 'TabsEventComposition',
  mixins: [utilities],
  components: { DialogShowParticipation },
  data () {
    return {
      participationShowed: null,
      dialogShowParticipation: false
    }
  },
  methods: {
    toggleParticipationDialog (participation) {
      this.dialogShowParticipation = !this.dialogShowParticipation
      this.participationShowed = participation
    }
  },
  computed: {
    ...mapGetters(['event']),
    composition () {
      return this.event.participations.filter(p => p.status === 'validated' && p.substitute !== true && p.staff !== true)
    },
    substituteList () {
      return this.event.participations.filter(p => p.status === 'validated' && p.substitute === true && p.staff !== true)
    },
    staffList () {
      return this.event.participations.filter(p => p.status === 'validated' && p.substitute !== true && p.staff === true)
    }
  }
}
</script>

<style lang="scss" scoped>

.card-right {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
  .card-right-title {
    @include title-card();
    .card-right-title-text {
      @include flex-start();
      text-transform: uppercase;
      position: relative;
      i {
        color: $blue-dark-medium;
        margin: 0 10px 1px 0;
        font-size: 20px;
      }
      .card-right-count.red {
        color: $red!important;
      }
      .card-right-count {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }
  .card-right-body {
    margin-top: 22px;
  }
  .card-right-list-item {
    @include list-item-s();
  }
  .card-right-empty-item {
    height: 50px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: italic;
    color: $text-grey-light;
    i {
      color: $blue;
    }
  }
}

.card-left-list {
  @include card();
  background-color: $ghost-white;
  box-shadow: none;
  padding: 30px 0 10px 0;
  font-size: 13px;
  .card-left-list-title {
    @include title-card();
    background: $ghost-white;
    border-top: none;
    // border-bottom: none;
    .card-left-list-title-text {
      @include flex-start();
      text-transform: uppercase;
      position: relative;
      i {
        color: $blue-dark-medium;
        margin: 0 10px 1px 0;
        font-size: 20px;
      }
      .card-left-list-count {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }
  .card-left-list-body {
    margin-top: 22px;
  }
  .card-left-list-list-item {
    @include list-item-s();
    background: $ghost-white;
    &:hover {
      background: $ghost-white;
    }
  }
  .card-left-list-empty-item {
    height: 50px;
    margin-top: 30px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: italic;
    color: $text-grey-light;
    i {
      color: $red;
    }
  }
}

// Element Dropdown
.el-dropdown i {
  font-size: 16px;
  margin-top: 6px;
  margin-right: -8px;
}

@media only screen and (max-width: 479px) {
  .col-xs-12 { padding: 0 }
  .card-right {
    font-size: 12px ;
    .card-right-title-text h5 { font-size: 13px }
    .card-right-list-item { padding: 10px; font-size: 12px; }
  }
  .card-left-list {
    font-size: 12px ;
    .card-left-list-title-text h5 { font-size: 13px }
    .card-left-list-list-item { padding: 10px; font-size: 12px; }
  }
}
</style>
