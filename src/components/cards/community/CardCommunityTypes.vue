<template lang="html">
  <div class="card-wrapper">
    <div class="card">
      <div class="card-title">
        <div class="card-title-text">
          <h5>Communauté</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="card-list-item border-blue active"
          v-for="filter in filters" :key="filter.id">
          <div class="list-item-body">
            <p class="list-item-body-top">{{ filter.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="filters-wrapper">
      <h5>Filtres</h5>
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
      filters: [{ id: 1, title: 'équipes', active: true, border: 'blue' }],
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
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
  margin-bottom: 30px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-body {
  margin-top: 22px;
}
.card-list-item,
.card-list-item:hover {
  @include list-item-s();
  border-left: 5px solid transparent;
}
.card-list-item.border-red.active {
  border-left: 5px solid $red;
  p {
    font-weight: 600;
  }
}
.card-list-item.border-blue.active {
  border-left: 5px solid $blue;
  p {
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
