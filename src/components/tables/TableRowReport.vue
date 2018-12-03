<template>
  <tr v-if="participation">
    <th
      scope=row
      class="table-item"
      :class="{'table-item-edit-mode': editMode}"
    >
      <div class="table-item-left">
        <div class="table-item-content">
          <div class="table-item-img">
            <img
              v-if="participation.user.avatar"
              :src="participation.user.avatar"
            >
            <img
              v-else
              src="../../assets/img/user.png"
            >
          </div>
          <div class="table-item-body">
            <span>{{ participation.user.firstName }} {{ participation.user.lastName[0] }}.</span>
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
          <el-input-number
            v-model="participation[currentTeamSportKey()][item.key]"
            v-if="editMode"
            size="mini"
            controls-position="right"
            :min="0"
          >
          </el-input-number>
          <span v-else>{{ participation[currentTeamSportKey()][item.key] }}</span>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'TableRowReport',
  mixins: [utilities],
  props: ['participation', 'event', 'editMode'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
    sportReportList() {
      return this.currentTeamSport().reportList
    }
  },
  methods: {
    fillMinutesPlayed() {
      if (!this.event.reportValidated && !this.participation.substitute) {
        this.participation[
          this.currentTeamSportKey()
        ].minutesPlayed = this.currentTeamSport().gameDuration
      }
    }
  },
  created() {
    this.fillMinutesPlayed()
  }
}
</script>

<style lang="scss" scoped>
.table-item-edit-mode {
  width: 250px;
}
th {
  font-weight: 500;
  width: 150px;
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
  padding: 0;
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
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: $background-grey;
}
// Element input
.el-input-number--mini {
  width: 90px !important;
}
.tag-s {
  @include tag-flat-s();
}

@media only screen and (max-width: 960px) {
  .table-item-edit-mode {
    width: 140px;
    padding: 12px !important;
  }
  .table-item-left .table-item-body {
    width: 80px;
  }
  .table-item {
    padding: 12px 8px;
  }
}
</style>
