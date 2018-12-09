<template lang="html">
  <div class="card">
    <div class="card-title">
      <div class="card-title-text">
        <h5>{{ $t('nextEvent')}}</h5>
      </div>
    </div>
    <div class="card-body">
      <div class="card-item" v-if="event" 
        @click="routeUrl(`/team/${currentTeam._id}/event/${event._id}`)">
        <div class="calendar-item">
          <div class="calendar">
            <div class="calendar-date">
              <div class="month">
                {{ formatEventMonth(event.dateStart) }}.
              </div>
              <h4 class="day">{{ formatEventDay(event.dateStart) }}</h4>
            </div>
          </div>
          <div class="calendar-text">
            <p class="text">
              <span class="text-wrapper">
                {{ event.name }} 
                <event-participation-info :event="event" iconMode="true"/>
              </span>
            </p>
            <p class="subtext"> 
              <span v-if="event.opponent">{{ event.opponent }} - </span>
              <span v-else>{{ event.location.name }} - </span>
              {{ $t('at')}} {{ event.time }}
            </p>
          </div>
        </div>
      </div>
      <div class="card-item-empty" v-else>
       {{ $tc('event', 0)}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import EventParticipationInfo from '@/components/global/events/EventParticipationInfo'

export default {
  name: 'CardEventNext',
  mixins: [utilities],
  props: ['event'],
  components: { EventParticipationInfo },
  computed: {
    ...mapGetters(['currentTeam'])
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
    h5 {
      text-align: center;
    }
    i {
      color: $blue-dark-medium;
      margin: 0 10px 1px 0;
      font-size: 20px;
    }
  }
}
.card-body {
  margin-top: 22px;
}
.card-item {
  padding: 10px 20px 2px;
  cursor: pointer;
  .calendar-item {
    @include flex-start();
    .calendar {
      @include calendar-date-xs();
    }
    .calendar-text {
      .text-wrapper {
        position: relative;
        span {
          position: absolute;
          top: 0;
          right: -24px;
        }
      }
      .subtext {
        color: $text-grey-blue;
      }
      p {
        margin: 0 0 3px 8px;
      }
    }
  }
}
.card-item-empty {
  padding: 20px;
  @include flex-center();
}
</style>
