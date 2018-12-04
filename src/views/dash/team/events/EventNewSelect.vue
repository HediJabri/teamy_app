<template lang="html">
  <div class="page-event-new-select">
    <transition name="fade" mode="out-in">
      <teamy-spinner :logo="true" v-if="!currentTeam"/>
      <div v-else class="page-wrapper">
        <div class="page-center-container-l">
          <transition name="fade" mode="out-in">
            <div v-if="selectDisplay" class="page-event">
              <div class="page-event-header">
                <h5>{{ $t('addEvent')}}</h5>
              </div>
              <div class="page-event-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-6" 
                    v-for="(item, index) in eventCategoryList" :key="index">
                    <div class="page-card" @click="routeSelect(item.category)">
                      <div class="page-card-logo">
                        <event-category-icon :category="item.category" :size="'s'" />
                      </div>
                      <h6>{{ item.title }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="competitions" class="page-competition">
              <div class="page-competition-header">
                <h5>{{$t('selectYourCompetition')}}</h5>
              </div>
              <card-competitions-list
                :competitions="competitions" :filter="filterName"
                :page="page" :from="'event-new'" v-on:goToNextPage="goToNextPage"/>
            </div>
            <teamy-spinner v-else />
          </transition>
        </div>
        <div class="page-right-container">
          <card-team :team="currentTeam" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeam from '@/components/cards/teams/CardTeam'
import CardCompetitionsList from '@/components/cards/competitions/CardCompetitionsList'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'EventNewSelect',
  mixins: [guards, utilities],
  components: {
    TeamySpinner,
    CardTeam,
    CardCompetitionsList,
    EventCategoryIcon
  },
  data() {
    return {
      selectDisplay: true,
      competitions: null,
      filterName: 'current',
      eventCategoryList: formData.eventCategoryList.slice(1, 5),
      page: {
        next: 0,
        loadingNext: true,
        allRecordsFetched: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    routeSelect(category) {
      if (category === 'competition') {
        this.getCompetitions(this.page.next)
      } else {
        this.$router.push(`/team/${this.currentTeam._id}/event-new/${category}`)
      }
    },
    async getCompetitions(pageNext) {
      this.page.loadingNext = true
      this.selectDisplay = false
      try {
        const params = {
          filter: this.filterName,
          page: pageNext,
          teamId: this.currentTeam._id
        }
        const data = (await ApiCompetitions.indexTeam(params)).data
        pageNext > 0
          ? (this.competitions = this.competitions.concat(data.competitions))
          : (this.competitions = data.competitions)
        this.competitions.length >= data.competitionsCount
          ? (this.page.allRecordsFetched = true)
          : (this.page.allRecordsFetched = false)
        this.page.loadingNext = false
      } catch (err) {
        this.errorNotify(err)
        this.page.loadingNext = false
      }
    },
    goToNextPage() {
      if (this.page.next >= 0) {
        this.page.loadingNext = true
        this.page.next++
        if (this.competitions) this.getCompetitions(this.page.next)
      }
    }
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
  padding: 0 60px;
  .teamy-spinner {
    @include flex-center();
    margin-top: 100px;
  }
}
.page-right-container {
  @include page-right-container();
}
.page-event-header {
  @include page-header();
}
.page-event-body {
  margin-top: 40px;
}
.page-card {
  @include card();
  height: 145px;
  padding: 15px 10px !important;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  .page-card-logo {
    @include flex-center();
    margin-top: 15px;
  }
  h6 {
    font-size: 15px;
  }
  &:hover {
    box-shadow: 1px 3px 5px rgba(5, 15, 44, 0.15);
  }
}
.page-competition {
  padding: 0 60px;
}
.page-competition-header {
  @include page-header();
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    padding: 0px 10px 60px 10px;
  }
  .page-right-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
    padding: 0;
  }
  .page-competition {
    padding: 0;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-right-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
    padding: 0;
  }
  .page-competition {
    padding: 0;
  }
}

@media only screen and (min-width: 720px) and (max-width: 959px) {
  .page-right-container {
    display: none;
  }
  .page-center-container-l {
    width: 80%;
    padding: 0 30px;
  }
  .page-competition {
    padding: 0;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1160px) {
  .page-center-container-l {
    padding: 0 30px;
  }
}
</style>
