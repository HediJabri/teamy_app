<template>
  <div>
    <base-card>
      <template slot="cardTitle">{{$t('competitions')}}</template>
      <div slot="cardBody">
        <div class="card-list-item"
          v-for="filter in filters" :key="filter.title"
          @click="toggleFilter(filter.name)"
          :class="{
          'active': filter.active,
          'border-red': filter.border === 'red',
          'border-blue': filter.border === 'blue'}">
          <div class="list-item-body">
            <p class="list-item-body-top">{{ $t(filter.name) }}</p>
          </div>
        </div>
      </div>
    </base-card>
    <div class="card-filter-btn-add" v-if="isAdmin(currentUser, currentTeam)">
      <el-button type="primary"
      @click="routeUrl(`/team/${currentTeam._id}/competition-new`)">
       {{$t('addCompetition')}}
        <i class="fa fa-plus-circle margin-left"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardCompetitionsFilter',
  mixins: [utilities],
  props: ['competitions'],
  data() {
    return {
      filters: [
        {
          id: 1,
          title: 'En Cours',
          name: 'current',
          active: true,
          border: 'blue'
        },
        {
          id: 2,
          title: 'Cloturée',
          name: 'closed',
          active: false,
          border: 'red'
        }
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
.card-filter-btn-add {
  @include flex-center();
  margin-bottom: 20px;
}
</style>
