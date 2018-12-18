<template lang="html">
  <div class="card-filter-wrapper" v-if="currentTeam">
    <div class="card-filter">
      <div class="card-filter-title">
        <div class="card-filter-title-text">
          <h5>{{$t('competitions')}}</h5>
        </div>
        <div class="card-filter-title-btn">
        </div>
      </div>
      <div class="card-filter-body">
        <div class="card-filter-list-item"
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
    </div>
    <div class="card-filter-btn-add"
      v-if="isAdmin(currentUser, currentTeam) && competitions && competitions.length">
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
.card-filter {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-filter-title {
  @include title-card();
  @include flex-space-between();
  .card-filter-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-filter-body {
  margin-top: 22px;
}
.card-filter-list-item,
.card-filter-list-item:hover {
  @include list-item-s();
  cursor: pointer;
  border-left: 5px solid transparent;
}
.card-filter-list-item.border-red.active {
  border-left: 5px solid $red;
  p {
    font-weight: 600 !important;
  }
}
.card-filter-list-item.border-blue.active {
  border-left: 5px solid $blue;
  p {
    font-weight: 600 !important;
  }
}
.card-filter-btn-add {
  @include flex-center();
  margin-bottom: 20px;
}
</style>
