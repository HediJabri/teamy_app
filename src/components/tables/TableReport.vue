<template>
  <div
    class="card"
    v-if="event"
    :class="{ 'disable': !event.reportValidated && $route.name === 'events-show' }"
  >
    <div
      class="card-title"
      v-if="editMode"
    >
      <div class="card-title-text">
        <div class="calendar">
          <div class="calendar-date">
            <div class="month">
              {{ formatEventMonth(event.dateStart) }}.
            </div>
            <h4 class="day">{{ formatEventDay(event.dateStart) }}</h4>
          </div>
        </div>
        <div class="card-title-text-wrapper">
          <h5>{{ event.name }}</h5>
          <div class="card-title-subtext">
            <span v-if="event.opponent">{{ event.opponent }}</span>
            <event-result-info
              v-if="event.result"
              :event="event"
              :tagSize="'s'"
            />
          </div>
        </div>
      </div>
      <div class="card-title-btn">
        <el-button
          type="primary"
          class="btn-icon"
          @click="updateParticipations()"
          :loading="isLoading"
        >
          <span v-if="event.reportValidated">{{$t('editReport')}} <i class="material-icons">settings</i></span>
          <span v-else>{{$t('validateReport')}} <i class="fa fa-check-circle"></i></span>
        </el-button>
      </div>
    </div>
    <div
      class="card-body"
      :class="{'card-body-edit-mode': editMode}"
    >
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="column-fix">
                  <i class="material-icons">group</i> {{$t('players')}}
                  ({{ validatedParticipations.length }})
                </th>
                <th
                  v-for="(item, index) in sportReportList"
                  :key="index"
                >
                  <div class="column-item">
                    <el-tooltip
                      :content="$t(item.key)"
                      placement="top"
                      :open-delay="300"
                    >
                      <i
                        v-if="item.icon"
                        class="material-icons"
                        :class="{'red': item.colorRed,  'yellow': item.colorYellow,}"
                      >
                        {{ item.icon }}
                      </i>
                      <img
                        v-else-if="item.img"
                        :src="sportIcon()"
                      >
                      <span v-if="editMode">{{ $t(item.key) }}</span>
                    </el-tooltip>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="event.participations.length">
              <table-row-report
                v-for="participation in validatedParticipations"
                :key="participation._id"
                :participation="participation"
                :event="event"
                :editMode="editMode"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiParticipations from '@/services/ApiParticipations'
import TableRowReport from '@/components/tables/TableRowReport'
import EventResultInfo from '@/components/global/events/EventResultInfo'

export default {
  name: 'TableReport',
  mixins: [utilities],
  props: ['event', 'editMode'],
  components: { TableRowReport, EventResultInfo },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
    sportReportList () {
      return this.currentTeamSport().reportList
    },
    validatedParticipations () {
      return this.event.participations.filter(p => p.status === 'validated')
    }
  },
  methods: {
    async updateParticipations () {
      this.isLoading = true
      let body = { user: this.currentUser._id, team: this.currentTeam._id }
      body.participations = this.event.participations
      if (!this.event.reportValidated) body.event = this.event._id
      try {
        await ApiParticipations.updateReport(body)
        this.isLoading = false
        this.$router.push(
          `/team/${this.currentTeam._id}/event/${this.event._id}`
        )
        this.$notify({
          title: this.$t('success'),
          message: this.$t('reportCreated'),
          type: 'success'
        })
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  width: 100%;
  padding: 5px 0 0 0;
}
.card.disable {
  opacity: 0.3;
}
.card-title {
  @include title-card();
  height: 70px;
  .card-title-text {
    @include flex-start();
    .calendar {
      @include calendar-date-xs();
    }
    .card-title-text-wrapper {
      text-align: left;
      h5 {
        text-transform: uppercase;
        margin: 2px 8px;
      }
      span {
        color: $text-grey-blue;
        font-size: 13px;
        margin: 2px 8px;
      }
      .card-title-subtext {
        @include flex-start();
      }
    }
  }
  .card-title-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

.card-body {
  margin-top: 10px;
}
.card-body-edit-mode {
  margin-top: 70px;
}

.table {
  padding: 10px 20px;
  color: $blue-dark-transparent;
  font-size: 12px;
  .column-item {
    @include flex-center();
  }
  .column-fix {
    @include flex-start();
    border: none;
    font-weight: 500;
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
      img {
        width: 14px;
        margin: 0px 5px 1px 0;
        cursor: pointer;
      }
      i {
        font-size: 18px;
        margin-right: 5px;
        cursor: pointer;
      }
      i.fa {
        font-size: 14px;
        margin-bottom: 6px;
      }
    }
  }
}
// Element input
.el-input-number--mini {
  width: 90px !important;
}

@media only screen and (max-width: 960px) {
  .table .column-fix {
    padding: 15px 10px;
  }
}
</style>
