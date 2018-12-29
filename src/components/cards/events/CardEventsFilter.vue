<template>
  <div>
    <base-card>
      <template slot="cardTitle">{{$t('events')}}</template>
      <div slot="cardBody">
        <div class="card-list-item"
          v-for="filter in filters" :key="filter.name"
          @click="toggleFilter(filter.name)"
          :class="{
          'active': filter.active,
          'border-red': filter.border === 'red',
          'border-blue': filter.border === 'blue'}">
          <div class="list-item-body">
            <p class="list-item-body-top">{{ $t(filter.title) }}</p>
          </div>
        </div>
      </div>
    </base-card>
    <div class="card-btn-add" v-if="isAdmin(currentUser, currentTeam)">
      <el-button type="primary"
        @click="routeUrl(`/team/${currentTeam._id}/event-new-select`)">
        {{ $t('addEvent')}}
        <i class="fa fa-plus-circle margin-left"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardEventsFilter',
  props: ['events'],
  mixins: [utilities],
  data() {
    return {
      filters: [
        {
          id: 1,
          title: 'next',
          name: 'future',
          active: true,
          border: 'blue'
        },
        { id: 2, title: 'passed', name: 'passed', active: false, border: 'red' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    toggleFilter(filterName) {
      this.$emit('filterChange', filterName)
      for (let f of this.filters) {
        f.active = false
      }
      let filter = this.filters.find(f => f.name === filterName)
      filter.active = true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list-item {
  @include list-item-s();
  cursor: pointer;
  border-left: 5px solid transparent;
}
.card-list-item.active {
  background: $ghost-white;
  .list-item-body-top {
    font-weight: 600;
  }
}
.card-list-item.border-red.active {
  border-left: 5px solid $red;
}
.card-list-item.border-blue.active {
  border-left: 5px solid $blue;
}
.card-btn-add {
  @include flex-center();
  margin-bottom: 20px;
}
</style>
