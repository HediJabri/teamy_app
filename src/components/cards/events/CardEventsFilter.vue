<template lang="html">
  <div class="card-wrapper">
    <div class="card">
      <div class="card-title">
        <div class="card-title-text">
          <h5>événements</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="card-list-item"
          v-for="filter in filters" :key="filter.name"
          @click="toggleFilter(filter.name)"
          :class="{
          'active': filter.active,
          'border-red': filter.border === 'red',
          'border-blue': filter.border === 'blue'}">
          <div class="list-item-body">
            <p class="list-item-body-top">{{ filter.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-btn-add"
      v-if="isAdmin(currentUser, currentTeam)">
      <el-button type="primary"
        @click="routeUrl(`/team/${currentTeam._id}/event-new-select`)">
        Ajouter un événement
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
  mixins: [utilities],
  data () {
    return {
      filters: [
        { id: 1, title: 'A venir', name: 'future', active: true, border: 'blue' },
        { id: 2, title: 'Passé', name: 'passed', active: false, border: 'red' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    toggleFilter (filterName) {
      this.$emit('filterChange', filterName)
      for (let f of this.filters) {
        f.active = false
      }
      let filter = this.filters.find(f => f.name === filterName)
      filter.active = true
    },
  },
}
</script>

<style lang="scss" scoped>

.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
  .card-body { margin-top: 22px; }
}
.card-untitle {
  @include card();
  padding: 0 0;
  min-height: 50px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 1px 0;
      font-size: 20px;
    }
  }
}

.card-list-item,
.card-list-item:hover {
  @include list-item-s();
  cursor: pointer;
  border-left: 5px solid transparent;
}
.card-list-item.border-red.active {
  border-left: 5px solid $red;
  p { font-weight: 600!important; }
}
.card-list-item.border-blue.active {
  border-left: 5px solid $blue;
  p { font-weight: 600!important; }
}
.card-btn-add {
  @include flex-center();
  margin-bottom: 20px;
}

</style>
