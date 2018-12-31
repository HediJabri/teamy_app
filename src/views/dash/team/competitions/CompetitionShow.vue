<template lang="html">
  <div class="page-competitions-show">
    <div class="page-wrapper">
      <div class="page-center-container-l">
        <transition name="fade" mode="out-in">
          <teamy-spinner v-if="loadingCompetition" />
          <form-competition-edit v-else-if="displayFormEdit" :competition="competition"
            v-on:toggleForm="toggleForm()" v-on:reloadCompetition="reloadCompetition"/>
          <card-competition-large v-else :competition="competition" 
            v-on:toggleForm="toggleForm()"/>
        </transition>
      </div>
      <div class="page-right-container">
        <card-team v-if="currentTeam" :team="currentTeam" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiCompetitions from '@/services/ApiCompetitions'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeam from '@/components/cards/teams/CardTeam'
import CardCompetitionLarge from '@/components/cards/competitions/CardCompetitionLarge'
import FormCompetitionEdit from '@/components/forms/FormCompetitionEdit'

export default {
  name: 'CompetitionsShow',
  mixins: [guards, utilities],
  components: {
    TeamySpinner,
    CardTeam,
    CardCompetitionLarge,
    FormCompetitionEdit
  },
  data() {
    return {
      loadingCompetition: true,
      displayFormEdit: false,
      competition: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    toggleForm() {
      this.displayFormEdit = !this.displayFormEdit
    },
    reloadCompetition() {
      this.loadingCompetition = false
      this.toggleForm()
      this.getCompetition(this.competition._id)
    },
    async getCompetition(id) {
      try {
        const competition = (await ApiCompetitions.get(id)).data.competition
        competition.events = this.sortedEvents(competition.events)
        this.competition = competition
        this.loadingCompetition = false
      } catch (err) {
        this.noAccessPageNotify()
        this.loadingCompetition = false
      }
    },
    sortedEvents(events) {
      return events.sort(function(a, b) {
        return new Date(b.dateStart) - new Date(a.dateStart)
      })
    }
  },
  watch: {
    $route() {
      const competitionId = this.$route.params.id
      if (competitionId) this.getCompetition(competitionId)
    }
  },
  created() {
    const competitionId = this.$route.params.id
    if (competitionId) this.getCompetition(competitionId)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-center-container-l {
  @include page-center-container-l();
  .teamy-spinner {
    @include flex-center();
    margin-top: 100px;
  }
}
.page-right-container {
  @include page-right-container();
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    padding: 0px 10px 60px 10px;
  }
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}
</style>
