<template lang="html">
  <div v-if="activity">
    <div class="card-activity-infos">
      <span>{{ formatDateFromNow(activity.created_at) }}</span>
    </div>
    <div class="card-activity" @click="routeToActivity()">
      <div v-if="activity.category === 'new_membership'">
        <p class="card-title">
          <i class="material-icons member">group_add</i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body">
          <div class="card-body-item" v-if="activity.member">
            <div class="avatar">
              <img v-if="activity.member.avatar" :src="activity.member.avatar">
              <img v-else src="../../../assets/img/user.png">
            </div>
            <div class="card-body-text">
              {{ activity.member.firstName }} {{ activity.member.lastName }}
              <span> {{$t('isTeamMember')}}</span>
            </div>
          </div>
          <div v-else>🚫 {{$t('accountDeleted')}}</div>
        </div>
      </div>
      <div v-if="activity.category === 'remove_membership'">
        <p class="card-title">
          <i class="material-icons member">group</i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body">
          <div class="card-body-item" v-if="activity.member">
            <div class="avatar">
              <img v-if="activity.member.avatar" :src="activity.member.avatar">
              <img v-else src="../../../assets/img/user.png">
            </div>
            {{ activity.member.firstName }} {{ activity.member.lastName }}
            <span> {{$t('isNotTeamMember')}} </span>
          </div>
          <div v-else>🚫 {{$t('accountDeleted')}}</div>
        </div>
      </div>
      <div v-if="activity.category === 'new_event'">
        <p class="card-title">
          <i class="material-icons">insert_invitation</i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body" v-if="activity.event">
          <div class="card-body-item-wrapper">
            <div class="calendar-item">
              <div class="calendar">
                <div class="calendar-date">
                  <div class="month">
                    {{ formatEventMonth(activity.event.dateStart) }}.
                  </div>
                  <h4 class="day">{{ formatEventDay(activity.event.dateStart) }}</h4>
                </div>
              </div>
              <div class="calendar-text">
                <p class="text">
                  <span class="text-wrapper">
                    {{ activity.event.name }} 
                    <event-participation-info :event="activity.event" iconMode="true"/>
                  </span>
                </p>
                <p class="subtext" v-if="activity.event.location"> 
                   <span v-if="activity.event.opponent">{{ activity.event.opponent }} - </span>
                   <span v-else>{{ activity.event.location.name }} - </span>
                   {{$t('at')}} {{ activity.event.time }}
                </p>
              </div>
            </div>
            <div class="event-competition-item">
              <event-category-icon :category="activity.event.category" 
                :competition="activity.event.competition" :size="'s'" />
            </div>
          </div>
        </div>
        <div class="card-body" v-else>🚫 {{$t('eventDeleted')}}</div>
      </div>
      <div v-if="activity.category === 'new_events_range'">
        <p class="card-title">
          <i class="material-icons">insert_invitation</i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body" v-if="activity.event">
          <div class="card-body-item-wrapper">
            <div class="calendar-item">
              <div v-for="(date, index) in [activity.dateStart, activity.dateEnd]" 
                 :class="{'calendar-item-wrapper': index === 0}" :key="index">
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
        <div class="card-body" v-else>🚫 {{$t('eventDeleted')}}</div>
      </div>
      <div v-if="activity.category === 'new_competition'">
        <p class="card-title">
          <i class="fa fa-trophy competition"></i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body" v-if="activity.competition">
          <div class="card-body-item-wrapper">
            <div class="competition-text" >
              <p class="text">{{ activity.competition.name }}</p>
              <p class="subtext" v-if="activity.competition.season.name"> 
                {{ activity.competition.season.name }}
              </p>
            </div>
            <div class="competition-item">
              <event-category-icon :category="'competition'" 
                :competition="activity.competition" :size="'s'" />
            </div>
          </div>
        </div>
         <div class="card-body" v-else>🚫 {{$t('competitionDeleted')}}</div>
      </div>
      <div v-if="activity.category === 'new_result'">
        <p class="card-title">
          <i class="material-icons">description</i>
          <span>"{{ formatActivityCategory }}"</span>
        </p>
        <div class="card-body" v-if="activity.event">
          <div class="card-body-item-wrapper">
            <div class="event-text" v-if="activity.event">
              <p class="text">{{ activity.event.name }} - {{ formatDate(activity.event.dateStart) }}</p>
              <p v-if="activity.event.opponent" class="subtext"> {{ activity.event.opponent }}</p>
              <p v-else-if="activity.event.location" class="subtext"> {{ activity.event.location.name }}</p>
            </div>
            <div class="competition-item">
              <event-category-icon :category="activity.event.category" 
                :competition="activity.event.competition" :size="'s'" />
            </div>
          </div>
          <event-result-info :event="activity.event" />
        </div>
        <div class="card-body" v-else>🚫 {{$t('eventDeleted')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import EventResultInfo from '@/components/global/events/EventResultInfo'
import EventParticipationInfo from '@/components/global/events/EventParticipationInfo'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'CardActivity',
  mixins: [utilities],
  props: ['activity'],
  components: { EventResultInfo, EventParticipationInfo, EventCategoryIcon },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    formatActivityCategory() {
      if (this.activity.category === 'new_membership')
        return this.$t('newMember')
      if (this.activity.category === 'remove_membership')
        return this.$t('memberLeaving')
      if (this.activity.category === 'new_event') return this.$t('newEvent')
      if (this.activity.category === 'new_events_range')
        return this.$t('newRecurrentEvent')
      if (this.activity.category === 'new_competition')
        return this.$t('newCompetition')
      if (this.activity.category === 'new_result') return this.$t('newResult')
      return ''
    }
  },
  methods: {
    routeToActivity() {
      let url
      if (this.activity.category === 'new_membership')
        url = `/team/${this.currentTeam._id}/show`
      if (this.activity.category === 'remove_membership')
        url = `/home/user-show/${this.activity.member._id}`
      if (['new_event', 'new_result'].includes(this.activity.category))
        url = `/team/${this.currentTeam._id}/event/${this.activity.event._id}`
      if (this.activity.category === 'new_competition')
        url = `/team/${this.currentTeam._id}/competition/${
          this.activity.competition._id
        }`
      this.$router.push(url)
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
.card-activity-infos {
  @include flex-space-between();
  margin: 30px 15px 10px 15px;
  color: $text-grey-blue;
  font-size: 13px;
  .card-activity-team {
    i {
      font-size: 14px;
      margin-right: 5px;
    }
    font-size: 13px;
  }
}
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
  i.member {
    font-size: 20px;
  }
  i.competition {
    font-size: 16px;
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
  @include flex-start();
  .avatar {
    @include avatar();
    display: inline-block;
    margin-right: 10px;
    flex: 0 0 30px;
  }
  .card-body-text {
    span {
      color: $text-grey-blue;
    }
  }
}
.card-body-item-wrapper {
  @include flex-space-between();
}
.card-body-item-start {
  @include flex-start();
}
.calendar-item {
  @include flex-space-between();
  .calendar-item-wrapper {
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
.competition-item {
  display: inline-block;
  width: 45px;
  height: 45px;
  .card-header-icon {
    @include icon-logo-wrapper();
    font-size: 17px;
  }
}
.event-competition-item {
  img {
    width: 45px;
    height: 45px;
  }
  .card-header-icon {
    @include icon-logo-wrapper();
    font-size: 17px;
  }
}
.competition-text,
.event-text {
  .subtext {
    color: $text-grey-blue;
  }
  p {
    margin: 0 0 3px 8px;
  }
}
.event-result {
  @include flex-start();
  margin-top: 10px;
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
  .competition-item,
  .competition-item .card-header-icon {
    width: 40px;
    height: 40px;
    font-size: 15px;
  }
  .competition-text .subtext {
    font-size: 11px;
  }
  .event-competition-item {
    display: none;
  }
  .calendar-item .calendar-text .subtext {
    font-size: 11px;
  }
  .event-text {
    margin-right: 2px;
    font-size: 12px;
    .subtext {
      font-size: 11px;
    }
  }
}
</style>
