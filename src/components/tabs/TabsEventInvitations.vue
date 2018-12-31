<template>
  <div v-if="event">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <base-card>
          <template slot="cardTitle">{{$t('invitations')}}</template>
          <h5 class="text-bold" slot="cardTitleButton">{{ event.participations.length }}</h5>
          <div slot="cardBody">
            <div class="card-filter-list-item" v-for="filter in filters" :key="filter.id"
              @click="toggleFilter(filter)" :class="classFilter(filter)">
              <div class="list-item-body">
                <p class="list-item-body-top">{{ $t(filter.title) }}</p>
              </div>
            </div>
          </div>
        </base-card>
      </div>
      <div class="col-xs-12 col-sm-6">
        <base-card :class="'transparent'">
          <template slot="cardTitle">{{$t(currentFilter.title)}}</template>
          <h5 class="text-bold" slot="cardTitleButton">{{ participationsFiltered.length }}</h5>
          <div slot="cardBody">
            <list-users-select v-model="participationSelected" 
              :items="participationsFiltered" v-if="participationsFiltered.length">
            </list-users-select>
          </div>
        </base-card>
      </div>
    </div>
    <dialog-show-participation
      :mode="'invitations'"
      v-show="participationSelected"
      :participation="participationSelected"
      :openDialog="dialogShowParticipation"
      @closeDialog="closeParticipationDialog($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ListUsersSelect from '@/components/lists/ListUsersSelect'
import DialogShowParticipation from '@/components/dialogs/DialogShowParticipation'

export default {
  name: 'TabsEventInvitations',
  mixins: [utilities],
  components: { ListUsersSelect, DialogShowParticipation },
  data() {
    return {
      filters: [
        { id: 1, title: 'pending', name: 'pending', border: 'blue' },
        { id: 2, title: 'accepted', name: 'validated', border: 'green' },
        { id: 3, title: 'declined', name: 'refused', border: 'red' }
      ],
      currentFilter: {
        id: 1,
        title: 'pending',
        name: 'pending',
        border: 'blue'
      },
      participationSelected: null,
      dialogShowParticipation: false
    }
  },
  computed: {
    ...mapGetters(['event']),
    participationsFiltered() {
      return this.event.participations.filter(
        p => p.user && p.status === this.currentFilter.name
      )
    }
  },
  methods: {
    toggleFilter(filter) {
      this.currentFilter = filter
    },
    classFilter(filter) {
      return {
        active: filter.id === this.currentFilter.id,
        'border-green': filter.border === 'green',
        'border-red': filter.border === 'red',
        'border-blue': filter.border === 'blue'
      }
    },
    openParticipationDialog() {
      this.dialogShowParticipation = true
    },
    closeParticipationDialog() {
      this.dialogShowParticipation = false
      this.participationSelected = null
    }
  },
  watch: {
    participationSelected() {
      if (this.participationSelected) {
        this.openParticipationDialog()
      }
    }
  },
  created() {
    if (!this.eventIsMatchCategory(this.event))
      this.currentFilter = this.filters[1]
  }
}
</script>

<style lang="scss" scoped>
.card-filter-list-item {
  @include list-item-s();
  border-left: 5px solid transparent;
  cursor: pointer;
}

.card-filter-list-item.active,
.card-filter-list-item:hover {
  background-color: $ghost-white;
  .list-item-body-top {
    font-weight: 600;
  }
}

.card-filter-list-item.border-red.active,
.card-filter-list-item.border-red:hover {
  border-left: 5px solid $red;
}
.card-filter-list-item.border-green.active,
.card-filter-list-item.border-green:hover {
  border-left: 5px solid $green;
}
.card-filter-list-item.border-blue.active,
.card-filter-list-item.border-blue:hover {
  border-left: 5px solid $blue;
}

@media only screen and (max-width: 479px) {
  .col-xs-12 {
    padding: 0;
  }
}
</style>
