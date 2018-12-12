<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <tr v-if="user && participations">
      <th
        scope=row
        class="table-item"
        :class="{'max-width': isTrainingCategory}"
      >
        <div class="table-item-left">
          <div class="table-item-content">
            <div class="table-item-img">
              <img
                v-if="user.avatar"
                :src="user.avatar"
              >
              <img
                v-else
                src="../../assets/img/user.png"
              >
            </div>
            <div class="table-item-body">
              <span>{{ user.firstName }} {{ user.lastName[0] }}.</span>
            </div>
          </div>
        </div>
      </th>
      <td
        class="table-item"
        v-for="(item, index) in sportReportList"
        :key="index"
      >
        <div class="item-wrapper">
          <div class="input-wrapper">
            {{ itemKeyTotal(item) }}
          </div>
        </div>
      </td>
      <td
        class="table-item table-item-right"
        :class="{'fix-width': isTrainingCategory}"
      >
        <div class="item-wrapper">
          <el-tooltip
            v-if="sportReportList.length < 6 || isTrainingCategory"
            content="% de présences"
            placement="top"
            :open-delay="300"
          >
            <span class="table-item-tag">{{ participationsRate }} %</span>
          </el-tooltip>
          <div class="table-item-invitations">
            {{ participationsTotal }}
            <i class="fa fa-envelope"></i>
            {{ participationsValidated }}
            <i class="fa fa-check-circle green"></i>
            {{ participationsRefused }}
            <i class="fa fa-times-circle red"></i>
          </div>
        </div>
      </td>
    </tr>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiParticipations from '@/services/ApiParticipations.js'

export default {
  name: 'TableRowStatsMember',
  mixins: [utilities],
  props: ['user'],
  data() {
    return {
      participations: null
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentTeam',
      'sports',
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
    participationsTotal() {
      if (!this.participations) return false
      return this.participations.length
    },
    participationsValidated() {
      if (!this.participations) return false
      return this.participations.filter(p => p.status === 'validated').length
    },
    participationsRefused() {
      if (!this.participations) return false
      return this.participations.filter(p => p.status === 'refused').length
    },
    participationsRate() {
      if (this.participationsTotal === 0) return 0
      return Math.round(
        (this.participationsValidated / this.participationsTotal) * 100
      )
    }
  },
  methods: {
    async getUserParticipations() {
      try {
        const params = {
          userId: this.user._id,
          teamId: this.currentTeam._id,
          seasonId: this.statsSeasonFilter ? this.statsSeasonFilter._id : 'all',
          category: this.statsCategoryFilter
            ? this.statsCategoryFilter.category
            : 'all',
          competitionId: this.statsCompetitionFilter
            ? this.statsCompetitionFilter._id
            : 'all'
        }
        const data = (await ApiParticipations.indexUser(params)).data
        this.participations = data
      } catch (err) {
        this.errorNotify(err)
        this.$router.push('/')
      }
    },
    itemKeyTotal(item) {
      let totalItemKey = 0
      for (let participation of this.participations) {
        totalItemKey += participation[this.currentTeamSportKey()][item.key]
      }
      return totalItemKey
    }
  },
  watch: {
    statsSeasonFilter() {
      this.getUserParticipations()
    },
    statsCategoryFilter() {
      this.getUserParticipations()
    },
    statsCompetitionFilter() {
      this.getUserParticipations()
    }
  },
  created() {
    this.getUserParticipations()
  }
}
</script>

<style lang="scss" scoped>
th {
  font-weight: 500;
  width: 150px;
}
th.max-width {
  width: 70%;
}
td {
  font-weight: 500;
}

.table-item-left {
  .table-item-content {
    @include flex-start();
  }
  .table-item-img {
    @include avatar();
    margin-right: 10px;
  }
  .table-item-body {
    text-align: left;
    width: 150px;
    @include text-overflow-ellipsis;
  }
}

.table-item {
  color: $blue-dark-transparent;
  padding: 12px 20px;
  border-top: none;
  text-align: center;
  height: 50px;
  .item-wrapper {
    @include flex-center();
    height: 100%;
  }
}
.table-item-tag {
  font-size: 9px;
  text-align: center;
  margin: 0 10px;
  font-weight: 500;
  background: $green;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  cursor: pointer;
  width: 40px;
}
.table-item-invitations {
  font-size: 11px;
  i.fa-envelope {
    font-size: 10px;
    margin: 0px 6px 3px 3px;
  }
  i {
    font-size: 12px;
    margin: 0px 5px 1px 2px;
  }
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: $background-grey;
}

.tag-s {
  @include tag-flat-s();
}

@media only screen and (max-width: 480px) {
  .table-item-right:not(.fix-width) {
    display: none;
  }
}

@media only screen and (max-width: 1120px) {
  .table-item-left .table-item-body {
    width: 80px;
  }
  .table-item {
    padding: 12px 0;
  }
  th.table-item {
    width: 140px;
    padding: 12px 12px;
  }
  .table-item-invitations {
    width: 110px;
  }
}
</style>
