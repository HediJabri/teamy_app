<template>
  <div class="card">
    <div class="card-title">
      <div class="card-title-text">
        <h5>{{$t('season')}} {{ statsSeasonFilter.name }}</h5>
        <span v-if="statsCompetitionFilter">{{ statsCompetitionFilter.name }} </span>
        <span v-else>{{ $tc(statsCategoryFilter.title, 2) }} </span>
        <span v-if="statsEvents"> ({{ statsEvents.length }})</span>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="column-fix">
                  <i class="material-icons">group</i>{{$t('players')}}
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
                    </el-tooltip>
                  </div>
                </th>
                <th
                  class="column-item-right"
                  :class="{'fix-width': isTrainingCategory}"
                >
                  <div class="column-item">
                    <el-tooltip
                      content="Invitations"
                      placement="top"
                      :open-delay="300"
                    >
                      <i class="material-icons">contact_mail</i>
                    </el-tooltip>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <table-row-stats-member
                v-for="membership in validatedMemberships"
                :key="membership._id"
                :user="membership.user"
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
import TableRowStatsMember from '@/components/tables/TableRowStatsMember'

export default {
  name: 'TableStatsMembers',
  mixins: [utilities],
  components: { TableRowStatsMember },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentTeam',
      'sports',
      'statsEvents',
      'statsSeasonFilter',
      'statsCategoryFilter',
      'statsCompetitionFilter'
    ]),
    sportReportList() {
      if (this.isTrainingCategory) return []
      return this.currentTeamSport().reportList
    },
    isTrainingCategory() {
      return this.statsCategoryFilter.category === 'training'
    },
    validatedMemberships() {
      return this.currentTeam.memberships.filter(p => p.status !== 'pending')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  width: 98%;
  padding: 5px 0 0 0;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    h5 {
      text-transform: uppercase;
      margin-right: 12px;
    }
    span {
      color: $text-grey-blue;
      font-size: 12px;
      margin-right: 6px;
    }
  }
}

.card-body {
  margin-top: 50px;
}

.table {
  padding: 10px 20px;
  color: $blue-dark-transparent;
  font-size: 12px;
  .column-item {
    @include flex-center();
  }
  .column-item-right.fix-width {
    width: 50px;
  }
  .column-fix {
    @include flex-start();
    border: none;
    font-weight: 500;
    i {
      margin: 0 5px;
    }
    padding: 15px;
  }
  thead {
    th {
      font-weight: 600;
      padding: 15px 5px;
      border: none;
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

@media only screen and (max-width: 480px) {
  .card-title-text span {
    display: none;
  }
  th.table-item {
    padding: 15px 5px;
  }
  .column-item-right:not(.fix-width) {
    display: none;
  }
}
</style>
