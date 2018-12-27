<template>
  <div v-if="activity">
    <div class="card-activity" @click="routeToActivity()">
      <p class="card-title">
        <i class="material-icons">insert_invitation</i>
        <span>"{{ $t('newRecurrentEvent') }}"</span>
      </p>
      <div class="card-body" v-if="!activity.event">🚫 {{$t('eventDeleted')}}</div>
      <div class="card-body" v-if="activity.event">
        <div class="card-body-item">
          <div class="card-body-item-left">
            <div v-for="(date, index) in [activity.dateStart, activity.dateEnd]" 
                :class="{'calendar-item': index === 0}" :key="index">
              <div class="calendar">
                <div class="calendar-date">
                  <div class="month">
                    {{ formatEventMonth(date) }}.
                  </div>
                  <h4 class="day">{{ formatEventDay(date) }}</h4>
                </div>
              </div>
              <span v-if="index === 0"><i class="fa fa-arrow-right blue"></i></span>
            </div>
            <div class="calendar-text">
              <p class="text">
                <span class="text-wrapper">
                  {{ activity.event.name }} {{$t('at')}} {{ activity.event.time }}
                  <event-participation-info :event="activity.event" iconMode="true"/>
                </span>
              </p>
              <p class="subtext">
                {{$t('every')}}
                <span v-for="(day, index) in activity.recurentDays" :key="index">
                  {{ formatDay(day) }}. 
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import EventParticipationInfo from '@/components/global/events/EventParticipationInfo'

export default {
  name: 'CardActivityEventRange',
  mixins: [utilities],
  props: ['activity'],
  components: { EventParticipationInfo },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    routeToActivity() {
      this.$router.push(
        `/team/${this.currentTeam._id}/event/${this.activity.event._id}`
      )
    },
    formatDay(day) {
      return formData.recurrenceDaysList.find(d => d.value === day)[
        this.$i18n.locale
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-activity {
  @include card();
  padding: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 3px 5px rgba(5, 15, 44, 0.15);
  }
}
.card-title {
  @include flex-start();
  i {
    font-size: 18px;
    margin-bottom: 2px;
    color: $blue-grey;
  }
  span {
    margin-left: 5px;
    color: $text-grey-blue;
  }
}
.card-body {
  padding: 10px 10px 10px 30px;
}
.card-body-item {
  @include flex-space-between();
}
.card-body-item-left {
  @include flex-space-between();
  .calendar-item {
    margin-right: 20px;
    position: relative;
    span {
      position: absolute;
      left: 48px;
      top: 15px;
    }
  }
  .calendar {
    @include calendar-date-xs();
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

@media only screen and (max-width: 479px) {
  .card-activity {
    padding: 10px;
    width: 100%;
  }
  .card-body {
    padding: 10px;
  }
  .card-body-item {
    font-size: 12px;
  }
  .card-body .calendar-text .subtext {
    font-size: 11px;
  }
  .card-body-item-right {
    display: none;
  }
}
</style>
