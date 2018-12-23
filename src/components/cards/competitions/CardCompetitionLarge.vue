<template>
<div>
  <div v-if="competition" class="card">
    <div class="card-title">
      <h5>{{ competition.name }}</h5>
      <span v-if="isAdmin(currentUser, competition.team) && !competition.clotured" 
        class="card-icon-edit" @click="toggleForm()">
        <el-tooltip :content="$t('editCompetition')" placement="left" :open-delay="300">
          <i class="material-icons">settings</i>
        </el-tooltip>
      </span>
    </div>
    <div class="card-header">
      <p>{{ $t(competition.category) }}</p>
      <img v-if="competition.image" :src="competition.image" alt="">
      <div class="card-competition-item-large-icon" v-else>
        <i class="fa fa-trophy" ></i>
      </div>
      <p class="season">{{ competition.season.name }}</p>
    </div>
    <div class="card-body">
      <div v-if="isAdmin(currentUser, competition.team)">
        <p v-if="competition.clotured">
          <i class="fa fa-ban red margin-left"></i> Compétition clôturée
        </p>
        <div class="card-buttons" v-else>
          <button-close-competition :competition="competition">
            {{ $t('closeCompetition')}}
            <i class="fa fa-ban red margin-left"></i>
          </button-close-competition>
          <el-button type="primary" @click="(routeUrl(competitionUrl))">
            {{ $t('addEvent')}}
            <i class="fa fa-plus-circle margin-left"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <card-events-table :events="competition.events"/>
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardEventsTable from '@/components/cards/events/CardEventsTable'
import ButtonCloseCompetition from '@/components/buttons/ButtonCloseCompetition'

export default {
  name: 'CardCompetitionLarge',
  mixins: [utilities],
  props: ['competition'],
  components: {
    CardEventsTable,
    ButtonCloseCompetition
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    competitionUrl() {
      return `/team/${this.currentTeam._id}/event-new/competition/${
        this.competition._id
      }`
    }
  },
  methods: {
    toggleForm(brand) {
      this.$emit('toggleForm', brand)
    }
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
  color: $blue-dark;
  h5 {
    font-size: 15px;
    font-weight: bold;
  }
  .card-icon-edit {
    color: $blue-grey;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 16px;
    i {
      font-size: 17px;
    }
  }
}
.card-header {
  padding: 35px 90px 0px 90px;
  position: relative;
  h5 {
    font-size: 17px;
    text-transform: uppercase;
  }
  p {
    color: $text-grey-blue;
    font-weight: 300;
    font-size: 16px;
    text-align: center;
  }
  .season {
    color: $blue-dark;
    font-weight: 500;
    font-size: 14px;
  }
  img {
    width: 85px;
  }
}
.card-competition-item-large-icon {
  @include icon-logo-wrapper();
  font-size: 18px;
  margin-bottom: 10px;
}
.card-body {
  padding: 8px 160px;
  font-size: 13px;
  p {
    margin: 30px auto;
    color: $grey-medium;
    font-size: 14px;
    text-align: center;
  }
}
.card-buttons {
  margin: 30px 0;
  @include flex-center();
  button {
    margin: 0 10px;
  }
}

@media only screen and (max-width: 479px) {
  .card-header {
    padding: 35px 15px 10px 15px;
  }
  .card-title .card-icon-edit {
    top: 60px;
    z-index: 9;
  }
  .card-body {
    padding: 20px;
    font-size: 12px;
  }
  .card-buttons {
    flex-direction: column;
    button {
      margin: 5px auto;
    }
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .card-body {
    padding: 20px 60px;
  }
}
</style>
