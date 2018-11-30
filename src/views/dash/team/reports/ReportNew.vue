<template lang="html">
  <div class="page-report">
    <div class="page-wrapper" v-if="event">
      <div class="page-wrapper-title">
        <h5 v-if="event.reportValidated">Modifier le rapport</h5>
        <h5 v-else>nouveau rapport</h5>
        <div class="page-wrapper-btn">
          <el-button type="default" @click="routeUrl(`/team/${currentTeam._id}/event/${event._id}`)">
            Retour <i class="fa fa-undo blue margin-left"></i>
          </el-button>
        </div>
      </div>
      <table-report :event="event" :editMode="true" />
    </div>
    <teamy-spinner class="teamy-spinner" v-else />
    <div class="page-message-mobile">
      <p>Les rapports sont visibles uniquement sur écrans larges</p>
      <p>😇</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities, guards } from '@/mixins/utilities.js'
import ApiEvents from '@/services/ApiEvents.js'
import TableReport from '@/components/tables/TableReport'
import TeamySpinner from '@/components/global/TeamySpinner'

export default {
  name: 'ReportNew',
  mixins: [utilities, guards],
  components: { TableReport, TeamySpinner },
  data () {
    return {
      event: null,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports'])
  },
  methods: {
    async getEvent (id) {
      try {
        const event = (await ApiEvents.get(id)).data.event
        this.event = event
      } catch (err) {
        this.noAccessPageNotify()
      }
    }
  },
  created() {
    this.requireTeamAdminOrManager(this.currentUser, this.currentTeam)
    const eventId = this.$route.params.id
    if (eventId) this.getEvent(eventId)
  },
}
</script>

<style lang="scss" scoped>

.page-wrapper {
  @include page-wrapper();
  position: relative;
}
.page-wrapper-title {
  @include page-title();
  
}
.page-wrapper-btn {
  position: absolute;
  right: 45px;
  top: 5px;
}
.page-message-mobile {
  display: none;
  height: 400px;
}
.teamy-spinner {
  @include flex-center();
  height: 200px;
}

@media only screen and (max-width: 759px) {
  .page-wrapper { display: none; }
  .page-message-mobile { @include flex-center; flex-direction: column; }
}
@media only screen and (min-width: 760px) and (max-width: 920px) {
  .page-wrapper { padding: 0 0 60px 0; }
}

</style>
