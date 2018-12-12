<template lang="html">
  <div class="page-competition-new">
    <div class="page-wrapper">
      <div class="page-center-container-l">
        <transition name="fade" mode="out-in">
          <form-competition-create  />
        </transition>
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
import CardTeam from '@/components/cards/teams/CardTeam'
import FormCompetitionCreate from '@/components/forms/FormCompetitionCreate'

export default {
  name: 'CompetitionNew',
  mixins: [guards, utilities],
  components: { CardTeam, FormCompetitionCreate },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  created() {
    this.requireTeamAdminOrManager(this.currentUser, this.currentTeam)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-center-container-l {
  @include page-center-container-l();
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
    width: 90% !important;
  }
  .page-right-container {
    display: none;
  }
}
</style>
