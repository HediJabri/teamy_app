<template>
  <div v-if="event && activeTabId">
    <div class="tabs-wrapper">
      <div class="tabs" v-for="tab in tabs" :key="tab.id"
        v-if="displayTab(tab)" @click="active(tab)"
        :class="{'active': activeTabId === tab.id}">
        <span class="text-item">{{ tab.name }}</span>
      </div>
    </div>
    <div class="tabs-content">
      <transition name="fade" mode="out-in">
        <tabs-event-report v-if="activeTabId === 1 && eventIsMatchCategory(event)" />
        <tabs-event-composition v-else-if="activeTabId === 2 && eventIsMatchCategory(event)" />
        <tabs-event-invitations v-else-if="activeTabId === 3" />
        <tabs-event-topic v-else-if="activeTabId === 4"/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import TabsEventReport from '@/components/tabs/TabsEventReport'
import TabsEventComposition from '@/components/tabs/TabsEventComposition'
import TabsEventTopic from '@/components/tabs/TabsEventTopic'
import TabsEventInvitations from '@/components/tabs/TabsEventInvitations'

export default {
  name: 'TabsEvent',
  mixins: [utilities],
  components: { TabsEventReport, TabsEventComposition, TabsEventInvitations, TabsEventTopic },
  data () {
    return {
      tabs: [
        {id: 1, name: 'rapport'}, 
        {id: 2, name: 'composition'},
        {id: 3, name: 'invitations'},
        {id: 4, name: 'forum'}
      ],
      activeTabId: null
    }
  },
  computed: {
    ...mapGetters(['event']),
    validatedParticipations () {
      return this.event.participations.filter(p => p.status === 'validated')
    },
    refusedParticipations () {
      return this.event.participations.filter(p => p.status === 'refused')
    },
    pendingParticipations () {
      return this.event.participations.filter(p => p.status === 'pending')
    }
  },
  methods: {
    active (tab) {
      this.activeTabId = tab.id
    },
    displayTab(tab) {
      if (tab.id === 1 && !this.eventIsPassed(this.event)) return false
      if ((tab.id === 1 || tab.id === 2) && !this.eventIsMatchCategory(this.event)) return false
      return true
    }
  },
  created () {
    if (!this.eventIsMatchCategory(this.event)) {
      this.activeTabId = 3
    } else if (this.eventIsPassed(this.event)) {
      this.activeTabId = 1
    } else {
      this.activeTabId = 2
    }
  }
}
</script>

<style lang="scss">

.tabs-wrapper {
  @include flex-center();
  height: 50px;
  .tabs {
    @include emoji-text-wrapper();
    width: 150px;
    height: 50px;
    text-transform: capitalize;
    padding: 0 30px;
    font-size: 13px;
    color: $grey-medium;
    cursor: pointer;
    .emoji span {
      font-size: 15px;
      margin-right: 0px;
    }
    .text-item {
      margin: 0 auto;
    }
    &:hover {
      color: $blue-dark;
    }
  }
  .tabs.active {
    color: $blue-dark;
    font-weight: 500;
    background-color: $ghost-white;
    border-left: 1px solid $grey;
    border-right: 1px solid $grey;
    border-top: 1px solid $grey;
    margin-top: 2px;
    margin-bottom: 0;
  }
}

.tabs-content {
  background-color: $ghost-white;
  min-height: 400px;
  height: 100%;
  padding: 30px 20px;
  border-top: 1px solid $grey;
}

.tab-comments {
  height: 200px;
  @include flex-center();
}

@media only screen and (max-width: 479px) {
  .tabs-wrapper { 
    height: 35px;
    .tabs { width: 110px; height: 35px; padding: 0 10px; font-size: 10px; }
  }
}

</style>
