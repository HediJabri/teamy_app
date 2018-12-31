<template>
  <base-card>
    <template slot="cardTitle">{{$t('dashboard')}}</template>
    <el-button slot="cardTitleButton" type="primary" v-if="isAdmin(currentUser, currentTeam)"
      class="card-title-btn" @click="routeUrl(`/team/${currentTeam._id}/event-new-select`)">
      <span> {{$t('addEvent')}}</span>
      <i class="fa fa-plus-circle margin-left"></i>
    </el-button>
    <div slot="cardBody" class="card-body-wrapper">
      <p class="card-date">
        <span class="card-day">{{ formatCurrentDay() }} </span> 
        <span class="card-day-number">{{ formatCurrentDayNumber() }} </span>
        <span class="card-month">{{ formatCurrentDayMonth() }} </span>
      </p>
      <p class="card-header" :class="{'text-blue': todayEvents.length}">
        <i class="material-icons">event</i>
        <span> {{$tc('event', todayEvents.length)}} {{$t('today')}}</span>
      </p>
      <hr>
      <div class="card-item" v-for="event in todayEvents" :key="event._id">
        <div class="card-item-wrapper" @click="routeUrl(`/team/${currentTeam._id}/event/${event._id}`)">
          <div class="item-text">
            <p class="text">
              <span class="text-wrapper">{{ event.name }} </span> 
              <event-participation-info :event="event" iconMode="true"/>
            </p>
            <p class="subtext">
              <span v-if="event.opponent">{{ event.opponent }} - </span>
              <span v-else>{{ event.location.name }} - </span>
              {{$t('at')}} {{ event.time }}
            </p>
          </div>
          <div class="item-logo">
            <event-category-icon :category="event.category" 
              :competition="event.competition" :size="'s'" />
          </div>
        </div>
        <hr>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import EventParticipationInfo from '@/components/global/events/EventParticipationInfo'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'CardActivityDash',
  mixins: [utilities],
  props: ['todayEvents'],
  components: { EventParticipationInfo, EventCategoryIcon },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    todayEventsCount() {
      return this.todayEvents.length
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body-wrapper {
  padding: 20px 30px 0 30px;
}
.card-date {
  color: $blue-dark;
  font-size: 18px;
  text-align: left;
  .card-day {
    font-weight: 400;
    text-transform: uppercase;
  }
  .card-day-number {
    font-weight: 200;
  }
  .card-month {
    font-weight: 200;
    text-transform: uppercase;
  }
}
.card-header {
  @include flex-start();
  i {
    color: $blue-grey;
    margin: 0 5px 0 0;
    font-size: 18px;
  }
  span {
    color: $text-grey-blue;
    font-size: 13px;
  }
}
.card-header.text-blue {
  i {
    color: $primary-color;
  }
}

.card-item-wrapper {
  @include flex-space-between();
  font-size: 13px;
  cursor: pointer;
}

.item-text {
  .text-team {
    @include flex-start();
    margin-left: 5px;
    color: $text-grey-blue;
    .logo-wrapper {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }
  }
  .subtext {
    color: $text-grey-blue;
    margin: 0 0 5px 8px;
  }
  .text-wrapper {
    position: relative;
    span {
      position: absolute;
      top: 0;
      right: -24px;
    }
  }
  .text {
    line-height: 25px;
    margin: 0 0 5px 8px;
  }
  .text span {
    border-bottom: 3px solid $blue;
  }
}

.item-logo {
  display: inline-block;
  width: 45px;
  height: 45px;
  .card-header-icon {
    @include icon-logo-wrapper();
    font-size: 17px;
  }
}

@media only screen and (max-width: 479px) {
  .card {
    padding: 30px 10px 10px 10px;
  }
  .card-date {
    font-size: 16px;
  }
  .item-logo,
  .item-logo .card-header-icon {
    width: 40px;
    height: 40px;
    font-size: 15px;
  }
  .item-text .subtext {
    font-size: 12px;
  }
  .card-title {
    padding: 10px;
    .card-title-btn {
      padding: 7px 10px;
      top: 12px;
      right: 10px;
      span {
        display: none;
      }
      i {
        margin: 0 auto;
      }
    }
  }
}
</style>
