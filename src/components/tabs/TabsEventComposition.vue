<template>
  <div v-if="event && composition && substituteList">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <base-card>
          <template slot="cardTitle">{{$tc('firstTeamPlayer', 2)}}</template>
          <h5 class="text-bold" slot="cardTitleButton">{{ composition.length }}</h5>
          <div slot="cardBody">
            <list-users-select v-model="participationSelected" 
              :items="composition" v-if="composition.length">
            </list-users-select>
             <div v-else class="card-empty-item">
              {{$tc('firstTeamPlayer', 0)}}
            </div>
          </div>
        </base-card>
      </div>
      <div class="col-xs-12 col-sm-6">
        <base-card :class="'transparent'">
          <template slot="cardTitle">{{$tc('substitute', 2)}}</template>
          <h5 class="text-bold" slot="cardTitleButton">{{ substituteList.length }}</h5>
          <div slot="cardBody">
            <list-users-select v-model="participationSelected" 
              :items="substituteList" v-if="substituteList.length">
            </list-users-select>
             <div v-else class="card-empty-item">
              {{$tc('substitute', 0)}}
            </div>
          </div>
        </base-card>
        <base-card :class="'transparent'">
          <template slot="cardTitle">Staff</template>
          <h5 class="text-bold" slot="cardTitleButton">{{ staffList.length }}</h5>
          <div slot="cardBody">
            <list-users-select v-model="participationSelected" 
              :items="staffList" v-if="staffList.length">
            </list-users-select>
             <div v-else class="card-empty-item">
              {{$t('noStaffMembers')}}
            </div>
          </div>
        </base-card>
      </div>
    </div>
    <dialog-show-participation
      :mode="'composition'"
      v-show="participationSelected"
      :participation="participationSelected"
      :openDialog="dialogShowParticipation"
      @closeDialog="closeParticipationDialog($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ListUsersSelect from '@/components/lists/ListUsersSelect'
import DialogShowParticipation from '@/components/dialogs/DialogShowParticipation'

export default {
  name: 'TabsEventComposition',
  mixins: [utilities],
  components: { ListUsersSelect, DialogShowParticipation },
  data() {
    return {
      participationSelected: null,
      dialogShowParticipation: false
    }
  },
  computed: {
    ...mapGetters(['event']),
    composition() {
      return this.event.participations.filter(
        p =>
          p.status === 'validated' && p.substitute !== true && p.staff !== true
      )
    },
    substituteList() {
      return this.event.participations.filter(
        p =>
          p.status === 'validated' && p.substitute === true && p.staff !== true
      )
    },
    staffList() {
      return this.event.participations.filter(
        p =>
          p.status === 'validated' && p.substitute !== true && p.staff === true
      )
    }
  },
  methods: {
    openParticipationDialog() {
      this.dialogShowParticipation = true
    },
    closeParticipationDialog() {
      this.dialogShowParticipation = false
      this.participationSelected = null
    }
  },
  watch: {
    participationSelected() {
      if (this.participationSelected) {
        this.openParticipationDialog()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-empty-item {
  height: 50px;
  margin-top: 30px;
  @include flex-center();
  font-style: italic;
  color: $text-grey-light;
}

// Element Dropdown
.el-dropdown i {
  font-size: 16px;
  margin-top: 6px;
  margin-right: -8px;
}

@media only screen and (max-width: 479px) {
  .col-xs-12 {
    padding: 0;
  }
  .card {
    font-size: 12px;
    .card-title-text h5 {
      font-size: 13px;
    }
    .card-list-item {
      padding: 10px;
      font-size: 12px;
    }
  }
}
</style>
