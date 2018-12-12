<template>
  <div
    class="tab-container"
    v-if="event"
  >
    <div class="tab">
      <div class="tab-header">
        <div class="tab-button">
          <el-button
            type="primary"
            v-if="isAdmin(currentUser, event.team)"
            class="btn-icon"
            @click="routeUrl(`/team/${currentTeam._id}/event/${event._id}/report-new`)"
          >
            <span v-if="event.reportValidated"> {{$t('editReport')}} <i class="material-icons">settings</i></span>
            <span v-else> {{$t('addReport')}} <i class="fa fa-plus-circle margin-left"></i></span>
          </el-button>
        </div>
        <div v-if="!event.reportValidated">
          <p class="tab-title">
            {{$t('reportInfo')}} 📊
          </p>
        </div>
      </div>
      <div class="tab-card-report">
        <table-report :event="event" />
      </div>
    </div>
    <div class="tab-message-mobile">
      <p>{{$t('reportVisibilySentence')}}</p>
      <p>😇</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import TableReport from '@/components/tables/TableReport'

export default {
  name: 'TabsEventReport',
  mixins: [utilities],
  components: { TableReport },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'event'])
  }
}
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 10px;
}
.tab-header {
  @include page-title();
  .tab-button {
    @include flex-center;
    width: 100%;
    margin: 20px 0 30px 0;
  }
  .tab-title {
    font-weight: 600;
    font-size: 14px;
  }
  p {
    text-align: center;
    font-size: 13px;
  }
}
.tab-message-mobile {
  display: none;
  height: 200px;
}

@media only screen and (max-width: 759px) {
  .tab {
    display: none;
  }
  .tab-message-mobile {
    @include flex-center;
    flex-direction: column;
  }
}
</style>
