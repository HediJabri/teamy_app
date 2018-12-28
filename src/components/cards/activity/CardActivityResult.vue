<template>
  <div v-if="activity">
    <div class="card-activity" @click="routeToActivity()">
      <p class="card-title">
        <i class="material-icons">description</i>
        <span>"{{ $t('newResult') }}"</span>
      </p>
      <div class="card-body" v-if="!activity.event">🚫 {{$t('eventDeleted')}}</div>
      <div class="card-body" v-else>
        <div class="card-body-item">
          <div class="card-body-item-left">
            <div class="text-wrapper">
              <p>{{ activity.event.name }} - {{ formatDate(activity.event.dateStart) }}</p>
              <p v-if="activity.event.opponent" class="subtext"> {{ activity.event.opponent }}</p>
              <p v-else-if="activity.event.location" class="subtext"> {{ activity.event.location.name }}</p>
            </div>
          </div>
          <div class="card-body-item-right">
            <event-category-icon :category="activity.event.category" 
              :competition="activity.event.competition" :size="'s'" />
          </div>
        </div>
        <div class="card-body-item-left">
          <event-result-info :event="activity.event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import EventResultInfo from '@/components/global/events/EventResultInfo'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'CardActivityResult',
  mixins: [utilities],
  props: ['activity'],
  components: { EventResultInfo, EventCategoryIcon },
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
  margin-bottom: 5px;
}
.card-body-item-left {
  @include flex-space-between();
  .text-wrapper {
    p {
      margin: 0 0 3px 8px;
    }
    .subtext {
      color: $text-grey-blue;
    }
  }
}

.card-body-item-right {
  @include flex-end();
  img {
    width: 45px;
    height: 45px;
  }
  .card-header-icon {
    @include icon-logo-wrapper();
    font-size: 17px;
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
  .text-wrapper {
    margin-right: 2px;
    font-size: 12px;
    .subtext {
      font-size: 11px;
    }
  }
  .card-body-item-right {
    display: none;
  }
}
</style>
