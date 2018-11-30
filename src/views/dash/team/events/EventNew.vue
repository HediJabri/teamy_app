<template lang="html">
  <div class="page-event-new">
    <div class="page-wrapper">
      <div class="page-center-container-l">
        <form-event-create v-if="formIsReady" 
          :eventCategory="eventCategory" :competition="competition" />
        <teamy-spinner v-else />
      </div>
      <div class="page-right-container">
        <card-team :team="currentTeam" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeam from '@/components/cards/teams/CardTeam'
import FormEventCreate from '@/components/forms/FormEventCreate'

export default {
  name: 'EventNew',
  mixins: [guards, utilities],
  components: { TeamySpinner, CardTeam, FormEventCreate },
  data () {
    return {
      formIsReady: false,
      eventCategory: null,
      competition: null
    }
  },
  computed: {
    ...mapGetters(['currentUser','currentTeam'])
  },
  methods: {
    async getCompetition (id) {
      try {
        const competition = (await ApiCompetitions.get(id)).data.competition
        this.competition = competition
        this.formIsReady = true
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created () {
    this.requireTeamAdminOrManager(this.currentUser, this.currentTeam)
    if (this.$route.params.type === 'competition') {
      this.eventCategory = 'competition'
      this.getCompetition(this.$route.params.id)
    } else {
      this.eventCategory = this.$route.params.type
      this.formIsReady = true
    }
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
  .page-wrapper { padding: 0px 10px 60px 10px; }
  .page-center-container-l { width: 100% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-center-container-l { width: 100% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container-l { width: 90% !important; }
  .page-right-container { display: none }
}
</style>
