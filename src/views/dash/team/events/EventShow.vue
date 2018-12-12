<template lang="html">
  <div class="page-event-show">
      <div class="page-wrapper">
      <div class="page-center-container-l">
        <transition name="fade" mode="out-in">
          <teamy-spinner v-if="loadingEvent" />
          <form-event-edit v-else-if="displayFormEdit" v-on:toggleForm="toggleForm"/>
          <card-event-large v-else v-on:toggleForm="toggleForm"/>
        </transition>
      </div>
      <div class="page-right-container">
        <card-team v-if="event" :team="event.team" />
      </div>
    </div>
  </div>
</template>

<script>
import SmoothScroll from 'smooth-scroll'
import { mapGetters, mapActions } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiEvents from '@/services/ApiEvents.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeam from '@/components/cards/teams/CardTeam'
import CardEventLarge from '@/components/cards/events/CardEventLarge'
import FormEventEdit from '@/components/forms/FormEventEdit'

export default {
  name: 'event-show',
  mixins: [guards, utilities],
  components: {
    TeamySpinner,
    CardTeam,
    CardEventLarge,
    FormEventEdit
  },
  data() {
    return {
      loadingEvent: true,
      displayFormEdit: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'event'])
  },
  methods: {
    ...mapActions(['initEvent', 'resetEvent']),
    scrollTop() {
      let scroll = new SmoothScroll('a[href*="#"]')
      scroll.animateScroll(0)
    },
    toggleForm() {
      this.displayFormEdit = !this.displayFormEdit
      this.scrollTop()
    },
    async getEvent(id) {
      try {
        const event = (await ApiEvents.get(id)).data.event
        this.initEvent(event)
        this.loadingEvent = false
      } catch (err) {
        this.noAccessPageNotify()
        this.loadingEvent = false
      }
    }
  },
  watch: {
    $route() {
      const eventId = this.$route.params.id
      if (eventId) this.getEvent(eventId)
    }
  },
  created() {
    this.resetEvent()
    const eventId = this.$route.params.id
    if (eventId) this.getEvent(eventId)
  },
  destroyed() {
    this.resetEvent()
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-center-container-l {
  @include page-center-container-l();
  .teamy-spinner {
    @include flex-center();
    margin-top: 100px;
  }
}
.page-right-container {
  @include page-right-container();
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    padding: 0px 10px 60px 10px;
  }
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container-l {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}
</style>
