<template>
  <div class="card">
    <div class="card-title">
      <div class="card-title-text">
        <h5 class="card-title-tabs">
          <span
            :class="{'active': filter === 'passed'}"
            @click="toogleFilterEvent('passed')"
          >
            {{$t('passed')}}
          </span>
          <span
            :class="{'active': filter === 'future'}"
            @click="toogleFilterEvent('future')"
          >
            {{$t('next')}}
          </span>
        </h5>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="column-fix">{{ $t('date')}}</th>
                <th>{{ $t('events')}}</th>
                <th>{{ $t('opponent')}}</th>
                <th>{{ $t('score')}}</th>
                <th>{{ $t('location')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="event in filteredEvents"
                :key="event._id"
                @click="routeUrl(`/team/${currentTeam._id}/event/${event._id}`)"
              >
                <th scope=row>
                  <div class="table-date">
                    <div class="calendar">
                      <div class="calendar-date">
                        <div class="month">
                          {{ formatEventMonth(event.dateStart) }}.
                        </div>
                        <h4 class="day">{{ formatEventDay(event.dateStart) }}</h4>
                      </div>
                    </div>
                    <div class="day-time">{{ formatDay(event.dateStart) }} {{ event.time }}</div>
                  </div>
                </th>
                <td class="table-item">
                  <div>{{ event.name }}</div>
                </td>
                <td class="table-item">
                  <div v-if="event.opponent">{{ event.opponent }}</div>
                  <div v-else>-</div>
                </td>
                <td class="table-item">
                  <event-result-info
                    v-if="eventIsPassed(event)"
                    :event="event"
                    :title="false"
                    :resultButton="false"
                  />
                  <div v-else>--</div>
                </td>
                <td class="table-item">
                  <div>
                    <i
                      v-if="event.locationCategory === 'home'"
                      class="material-icons"
                    >home</i>
                    <i
                      v-else
                      class="fa fa-plane"
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import EventResultInfo from '@/components/global/events/EventResultInfo'

export default {
  name: 'CardCompetitionsEventsTable',
  mixins: [utilities],
  props: ['events'],
  components: { EventResultInfo },
  data() {
    return {
      filter: 'passed'
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
    filteredEvents() {
      if (this.filter === 'future') {
        return _.reverse(this.events.filter(e => !this.eventIsPassed(e)))
      } else {
        return this.events.filter(e => this.eventIsPassed(e))
      }
    }
  },
  methods: {
    toogleFilterEvent(filter) {
      this.filter = filter
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  text-align: center;
  padding: 5px 0 0 0;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-center();
    h5 {
      text-transform: uppercase;
    }
  }
  .card-title-tabs {
    margin: 0;
    height: 40px;
    display: flex;
    align-items: center;
    span {
      color: $text-grey-blue;
      margin: 0 10px;
      height: 40px;
      padding-top: 8px;
      cursor: pointer;
      &:hover,
      &:focus {
        color: $blue-dark-transparent;
        border-bottom: 4px solid $blue;
      }
    }
    span.active {
      color: $blue-dark-transparent;
      border-bottom: 4px solid $blue;
    }
  }
}
.card-body {
  margin-top: 26px;
}

.table {
  padding: 10px 20px;
  color: $blue-dark-transparent;
  font-size: 12px;
  .column-fix {
    @include flex-center();
    border: none;
    font-weight: 600;
    i {
      margin: 0 5px;
    }
  }
  thead {
    th {
      font-weight: 600;
      padding: 15px 20px;
      border-bottom: 1px solid $grey-light;
      text-align: center;
      i {
        font-size: 18px;
        cursor: pointer;
      }
      i.fa {
        font-size: 14px;
        margin-bottom: 6px;
      }
      img {
        width: 14px;
        margin-bottom: 6px;
        cursor: pointer;
      }
    }
  }
  tbody {
    th {
      width: 200px;
    }
    th,
    td {
      font-weight: 500;
      color: $blue-dark-transparent;
      padding: 18px 20px;
      border: none;
      text-align: center;
      height: 50px;
    }
    tr {
      cursor: pointer;
    }
    .table-date {
      @include flex-start;
      .calendar {
        @include calendar-date-xxs;
        margin-left: 10px;
      }
      .day-time {
        text-transform: capitalize;
        margin-left: 10px;
      }
    }
    .table-item {
      padding: 0;
      div {
        @include flex-center;
        height: 100%;
      }
    }
    .table-item-body {
      text-align: left;
      width: 100px;
      @include text-overflow-ellipsis;
    }
    i {
      font-size: 18px;
    }
    i.fa {
      font-size: 15px;
    }
  }
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: $background-grey;
}
</style>
