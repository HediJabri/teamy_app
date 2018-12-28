<template>
  <div v-if="activity">
    <div class="card-activity" @click="routeToActivity()">
      <p class="card-title">
        <i class="fa fa-trophy competition"></i>
        <span>"{{ $t('newCompetition') }}"</span>
      </p>
      <div class="card-body" v-if="!activity.competition">
        🚫 {{$t('competitionDeleted')}}
      </div>
      <div class="card-body" v-else>
        <div class="card-body-item-left">
          <div class="text-wrapper">
            <p class="text">{{ activity.competition.name }}</p>
            <p class="subtext" v-if="activity.competition.season.name"> 
              {{ activity.competition.season.name }}
            </p>
          </div>
          <div class="card-body-item-right">
            <event-category-icon :category="'competition'" 
              :competition="activity.competition" :size="'s'" />
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
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'CardActivityCompetition',
  mixins: [utilities],
  props: ['activity'],
  components: { EventCategoryIcon },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    routeToActivity() {
      this.$router.push(
        `/team/${this.currentTeam._id}/competition/${
          this.activity.competition._id
        }`
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
    font-size: 17px;
    margin-bottom: 2px;
    color: $blue-grey;
  }
  span {
    margin-left: 8px;
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
