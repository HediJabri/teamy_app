<template lang="html">
  <div class="card-list" v-if="events">
    <div class="card-item" v-for="event in events" :key="event._id">
      <router-link class="card-item-link" :to="`/team/${currentTeam._id}/event/${event._id}`">
        <div class="card-item-header">
          <div class="card-item-left">
            <div class="calendar">
              <div class="calendar-date">
                <div class="month">
                  {{ formatEventMonth(event.dateStart) }}.
                </div>
                <h4 class="day">{{ formatEventDay(event.dateStart) }}</h4>
              </div>
            </div>
          </div>
          <div class="card-item-center">
            <h5>{{ event.name }}</h5>
            <span>{{ formatDay(event.dateStart) }} {{ event.time }}</span>
          </div>
          <div class="card-item-right">
            <event-category-icon :category="event.category" :competition="event.competition "/>
          </div>
        </div>
        <div class="card-item-body">
          <div class="card-item-opponent" v-if="event.opponent">
            <i v-if="event.locationCategory === 'home'" class="material-icons">home</i>
            <i v-else class="fa fa-plane"></i>
            <h5 class="text-item-semi-bold">{{ event.opponent }}</h5>
          </div>
          <div v-if="event.competition">
            <span class="emoji">🏆 </span>
            <span class="text-item">{{ event.competition.name }}</span>
          </div>
          <div v-if="event.location">
            <span class="emoji">📍 </span>
            <span class="text-item">{{ event.location.name }}</span>
          </div>
          <div class="card-item-participations">
            <span class="emoji">📢 </span>
            <span class="text-item">Invitations :</span>
            {{ eventParticipations(event, 'validated') }}
            <i class="fa fa-check-circle green"></i>
            {{ eventParticipations(event, 'refused') }}
            <i class="fa fa-times-circle red"></i>
            {{ eventParticipations(event, 'pending') }}
            <i class="fa fa-question-circle grey-medium"></i>
          </div>
          <event-participation-info v-if="!eventIsPassed(event)" :event="event" />
        </div>
        <div class="card-item-result">
          <event-result-info v-if="eventIsPassed(event)" :event="event" :resultButton="true" />
        </div>
      </router-link>
    </div>
    <div class="btn-next-page" 
      v-if="page.next >= 0 && !page.allRecordsFetched">
      <el-button type="primary"
        :loading="page.loadingNext"
        @click="goToNextPage()">
        {{ $t('seeMore')}}
      </el-button>
    </div>
    <div v-else-if="events.length === 0" class="card-list-empty">
      <div class="card-list-empty-wrapper">
        <span class="tag">
         <i class="material-icons">event</i>
        </span>
        <p >{{ $tc('event', 0)}} </p>
        <div class="card-btn-add" v-if="displayAddButton">
          <el-button type="primary"
            @click="routeUrl(`/team/${currentTeam._id}/event-new-select`)">
            {{ $t('addEvent')}} <i class="fa fa-plus-circle margin-left"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import { mapGetters } from 'vuex'
import EventResultInfo from '@/components/global/events/EventResultInfo'
import EventParticipationInfo from '@/components/global/events/EventParticipationInfo'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'CardEventsList',
  mixins: [utilities],
  props: ['events', 'page', 'filter'],
  components: { EventResultInfo, EventParticipationInfo, EventCategoryIcon },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    displayAddButton() {
      return (
        this.isAdmin(this.currentUser, this.currentTeam) && !this.events.length
      )
    }
  },
  methods: {
    goToNextPage() {
      this.$emit('goToNextPage')
    },
    eventParticipations(event, status) {
      return event.participations.filter(p => p.status === status).length
    }
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  @include card();
}
.card-item-link {
  text-decoration: none;
  color: $text-grey-blue;
}
.card-item-header {
  padding: 0 70px;
  position: relative;
  .card-item-left {
    text-align: center;
    position: absolute;
    left: 0;
    top: -5px;
    .calendar {
      @include calendar-date-s();
    }
  }
  .card-item-center {
    h5 {
      font-size: 15px;
      text-transform: uppercase;
    }
    span {
      color: $text-grey-blue;
      font-weight: 300;
      font-size: 15px;
      text-transform: capitalize;
    }
  }
  .card-item-right {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .card-logo {
    @include icon-logo-wrapper();
  }
}
.card-item-body {
  padding: 20px 70px 5px;
  font-size: 13px;
  text-transform: capitalize;
  .card-item-opponent i {
    font-size: 17px;
    color: $blue-dark-medium;
    margin-right: 10px;
  }
  i.material-icons {
    font-size: 19px;
    margin: 0 8px 2px -2px;
  }
  div,
  .event-participation-info {
    @include emoji-text-wrapper();
    height: 40px;
    border-bottom: 1px solid $grey;
  }
  .logo-wrapper {
    height: 20px;
    width: 20px;
    border-bottom: none;
    margin-right: 5px;
  }
}
.card-item-participations {
  .text-item {
    margin-right: 12px;
  }
  i {
    margin: 0 12px 0 3px;
    font-size: 15px;
  }
}
.card-item-result {
  margin-top: 10px;
}
.card-list-empty {
  height: 270px;
  @include flex-center();
}
.card-list-empty-wrapper {
  color: $blue-grey;
  p {
    text-align: center;
    margin-bottom: 30px;
  }
  .tag {
    @include tag-flat-icon;
    i {
      font-size: 15px;
    }
  }
  .card-btn-add,
  .card-btn-no-team {
    @include flex-center();
  }
}
.btn-next-page {
  @include flex-center();
}

@media only screen and (max-width: 479px) {
  .card-item {
    padding: 10px;
  }
  .card-item-body {
    padding: 20px 5px 5px;
    font-size: 12px;
  }
  .card-item-header {
    padding: 0 50px;
    .card-item-center {
      h5 {
        height: 30px;
        overflow: hidden;
      }
      h5,
      span {
        font-size: 13px;
      }
      span {
        position: absolute;
        bottom: -16px;
      }
    }
    .card-item-left .calendar {
      @include calendar-date-xs();
    }
    .card-item-right {
      width: 50px;
      height: 50px;
    }
    .card-logo {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }
  }
  .el-button {
    font-size: 12px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .card-item-body {
    padding: 20px 40px 5px;
  }
}
</style>
