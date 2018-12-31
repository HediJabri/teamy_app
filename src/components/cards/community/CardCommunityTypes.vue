<template>
  <div>
    <base-card>
      <template slot="cardTitle">{{$t('community')}}</template>
      <div slot="cardBody">
        <div class="card-list-item border-blue active"
          v-for="filter in filters" :key="filter.id">
          <div class="list-item-body">
            <p class="list-item-body-top">{{$t(filter.title)}}</p>
          </div>
        </div>
      </div>
    </base-card>
    <div class="filters-wrapper">
      <h5>{{$t('filters')}}</h5>
      <el-select v-model="sportSelected" placeholder="Sports">
         <el-option :label="$t('allSports')" :value="'all'">
        </el-option>
        <el-option v-for="(sport, index) in sports.list" :key="index" 
          :label="$t(sport.key)" :value="sport.key">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardCommunityTypes',
  mixins: [utilities],
  data() {
    return {
      filters: [{ id: 1, title: 'teams', active: true, border: 'blue' }],
      sportSelected: null,
      zoneSelected: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'sports'])
  },
  watch: {
    sportSelected(sport) {
      this.$emit('changeFilter', { key: 'sport', name: sport })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list-item,
.card-list-item:hover {
  @include list-item-s();
  border-left: 5px solid transparent;
}

.card-list-item.border-blue.active {
  border-left: 5px solid $blue;
  background: $ghost-white;
  .list-item-body-top {
    font-weight: 600;
  }
}

.filters-wrapper {
  padding: 0 5px;
  margin-bottom: 30px;
  h5 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.6px;
    margin: 15px 25px;
  }
  .el-select {
    width: 100%;
    padding: 0 5px;
    margin: 5px 0;
  }
}
</style>
