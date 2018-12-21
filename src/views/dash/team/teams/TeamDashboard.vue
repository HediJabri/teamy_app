<template>
  <div class="page-dashboard">
    <div class="page-wrapper" v-if="teamDataLoaded">
      <div class="page-left-container">
        <card-user :user="currentUser" :team="null"/>
      </div>
      <div class="page-center-container">
        <card-activity-dash :todayEvents="todayEvents" />
        <card-activity-list :activities="teamActivities" :page="page" 
          v-on:goToNextPage="goToNextPage()" />
      </div>
      <div class="page-right-container">
        <div v-if="todayEventsLoaded">
          <card-team :team="currentTeam" />
          <card-event-next :event="nextEvent" />
        </div>
      </div>
    </div>
    <teamy-spinner v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiEvents from '@/services/ApiEvents.js'
import ApiActivities from '@/services/ApiActivities.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardUser from '@/components/cards/users/CardUser'
import CardActivityDash from '@/components/cards/activity/CardActivityDash'
import CardActivityList from '@/components/cards/activity/CardActivityList'
import CardEventNext from '@/components/cards/events/CardEventNext'
import CardTeam from '@/components/cards/teams/CardTeam'

export default {
  name: 'TeamDashboard',
  mixins: [utilities],
  components: {
    TeamySpinner,
    CardUser,
    CardActivityDash,
    CardActivityList,
    CardEventNext,
    CardTeam
  },
  data() {
    return {
      todayEvents: [],
      teamActivities: null,
      nextEvent: null,
      todayEventsLoaded: false,
      teamActivitiesLoaded: false,
      page: {
        next: 0,
        loadingNext: true,
        allRecordsFetched: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'teamLoaded', 'notifsLoaded']),
    teamDataLoaded() {
      let result
      this.todayEventsLoaded && this.teamActivitiesLoaded
        ? (result = true)
        : (result = false)
      return result
    }
  },
  methods: {
    async getTeamEvents(teamId) {
      try {
        const params = { filter: 'future', page: 0, teamId: teamId }
        const data = (await ApiEvents.indexTeam(params)).data
        const teamTodayEvents = data.events.filter(e =>
          this.eventIsToday(e.dateStart)
        )
        const teamNextEvent = data.events.find(
          e => !this.eventIsToday(e.dateStart)
        )
        if (
          !this.nextEvent ||
          (this.nextEvent &&
            teamNextEvent &&
            teamNextEvent.dateStart <= this.nextEvent.dateStart)
        ) {
          this.nextEvent = teamNextEvent
        }
        this.todayEvents = teamTodayEvents
        this.todayEventsLoaded = true
      } catch (err) {
        this.errorNotify(err)
      }
    },
    async getTeamActivities(pageNext, teamId) {
      try {
        const params = { page: pageNext, teamId }
        const data = (await ApiActivities.indexTeam(params)).data
        pageNext > 0
          ? (this.teamActivities = this.teamActivities.concat(
              data.teamActivities
            ))
          : (this.teamActivities = data.teamActivities)
        this.teamActivities.length >= data.teamActivitiesCount
          ? (this.page.allRecordsFetched = true)
          : (this.page.allRecordsFetched = false)
        this.page.loadingNext = false
        this.teamActivitiesLoaded = true
      } catch (err) {
        this.errorNotify(err)
        this.page.loadingNext = false
      }
    },
    goToNextPage() {
      if (this.page.next >= 0) {
        this.page.loadingNext = true
        this.page.next++
        if (this.teamActivities)
          this.getTeamActivities(this.page.next, this.currentTeam._id)
      }
    },
    resetActivities() {
      this.teamActivities = null
      this.nextEvent = null
      this.todayEvents = []
    }
  },
  created() {
    const teamId = this.$route.params.teamId
    this.getTeamEvents(teamId)
    this.getTeamActivities(this.page.next, teamId)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-left-container {
  @include page-left-container();
}
.page-right-container {
  @include page-right-container();
}
.page-center-container {
  @include page-center-container();
}
.teamy-spinner {
  @include flex-center();
  height: 300px;
}

@media only screen and (max-width: 479px) {
  .page-right-container {
    display: none !important;
  }
  .page-left-container {
    display: none !important;
  }
  .page-center-container {
    width: 100% !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-right-container {
    display: none !important;
  }
  .page-left-container {
    display: none !important;
  }
  .page-center-container {
    width: 100% !important;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-right-container {
    display: none !important;
  }
  .page-center-container {
    width: 73% !important;
  }
}
</style>
