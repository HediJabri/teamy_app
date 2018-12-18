<template lang="html">
  <div class="page-events-index">
    <div class="page-wrapper">
      <div class="page-left-container">
        <card-events-filter v-on:filterChange="changeFilter($event)" :events="events"/>
      </div>
      <div class="page-center-container">
        <transition name="fade" mode="out-in">
          <card-events-list v-if="events" :events="events" :filter="filterDate" 
           :page="page" v-on:goToNextPage="goToNextPage()" />
          <teamy-spinner v-else />
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
import ApiEvents from '@/services/ApiEvents.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardEventsFilter from '@/components/cards/events/CardEventsFilter'
import CardEventsList from '@/components/cards/events/CardEventsList'
import CardTeam from '@/components/cards/teams/CardTeam'

export default {
  name: 'EventsIndex',
  mixins: [guards, utilities],
  components: { TeamySpinner, CardEventsFilter, CardEventsList, CardTeam },
  data() {
    return {
      events: null,
      filterDate: 'future',
      page: {
        next: 0,
        loadingNext: true,
        allRecordsFetched: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentTeam', 'currentUser'])
  },
  methods: {
    changeFilter(filterDate) {
      this.filterDate = filterDate
      this.sendEventsRequest()
    },
    sendEventsRequest() {
      this.page.next = 0
      this.events = null
      this.getTeamEvents(this.filterDate, this.page.next)
    },
    goToNextPage() {
      if (this.page.next >= 0) {
        this.page.loadingNext = true
        this.page.next++
        if (this.events) this.getTeamEvents(this.filterDate, this.page.next)
      }
    },
    async getTeamEvents(filterDate, pageNext) {
      try {
        const params = {
          filter: filterDate,
          page: pageNext,
          teamId: this.currentTeam._id
        }
        const data = (await ApiEvents.indexTeam(params)).data
        pageNext > 0
          ? (this.events = this.events.concat(data.events))
          : (this.events = data.events)
        this.events.length >= data.eventsCount
          ? (this.page.allRecordsFetched = true)
          : (this.page.allRecordsFetched = false)
        this.page.loadingNext = false
      } catch (err) {
        this.errorNotify(err)
        this.page.loadingNext = false
      }
    },
    async getUserEvents(filterDate, pageNext) {
      try {
        const params = {
          filter: filterDate,
          page: pageNext,
          userId: this.currentUser._id,
          teamId: this.currentTeam ? this.currentTeam._id : '-'
        }
        const data = (await ApiEvents.indexUser(params)).data
        pageNext > 0
          ? (this.events = this.events.concat(data.events))
          : (this.events = data.events)
        this.events.length >= data.eventsCount
          ? (this.page.allRecordsFetched = true)
          : (this.page.allRecordsFetched = false)
        this.page.loadingNext = false
      } catch (err) {
        this.errorNotify(err)
        this.page.loadingNext = false
      }
    },
    noTeamEvents() {
      this.events = []
      this.page.next = 0
      this.page.loadingNext = false
      this.page.allRecordsFetched = true
    }
  },
  created() {
    this.sendEventsRequest()
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
  .teamy-spinner {
    @include flex-center();
    margin-top: 100px;
  }
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    flex-direction: column;
    padding: 0px 10px 60px 10px;
  }
  .page-center-container,
  .page-left-container {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-center-container,
  .page-left-container {
    width: 90% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container {
    width: 73% !important;
  }
  .page-right-container {
    display: none;
  }
}
</style>
