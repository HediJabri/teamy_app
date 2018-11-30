<template lang="html">
  <div class="card-filter-wrapper">
    <div class="card-filter">
      <div class="card-filter-title">
        <div class="card-filter-title-text">
          <h5>stats</h5>
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
            <p class="list-item-body-top">{{ filter.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="filters-wrapper">
      <h5>Filtres</h5>
      <el-select v-model="seasonSelected" placeholder="Saisons" >
        <el-option v-for="(season, index) in currentTeam.seasons" 
          :key="index" :value="season._id" :label="season.name">
        </el-option>
      </el-select>
      <el-select v-model="categorySelected" placeholder="Type d'événement" >
        <el-option v-for="(item, index) in eventCategoryList" 
          :key="index" :value="item.category" :label="item.subtitle">
        </el-option>
      </el-select>
      <el-select v-model="competitionSelected" placeholder="Competitions" 
        v-if="categorySelected === 'competition'">
        <el-option :value="'all'" :label="'Toutes les compétitions'">
        </el-option>
        <el-option v-for="(competition, index) in competitionsFiltered" 
          :key="index" :value="competition._id" :label="competition.name">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'

export default {
  name: 'CardStatsFilter',
  mixins: [utilities],
  props: ['competitions'],
  data () {
    return {
      filters: [
        { id: 1, title: 'équipe', name: 'team', active: true, border: 'blue' },
        { id: 2, title: 'joueurs', name: 'players', active: false, border: 'red' }
      ],
      seasonSelected: null,
      categorySelected: 'Tout les matchs',
      competitionSelected: 'Toutes les compétitions',
      eventCategoryList: formData.eventCategoryList.slice(0, 3)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'currentTeamSeason', 'statsSeasonFilter']),
    competitionsFiltered() {
      return this.competitions.filter(c => c.season._id === this.statsSeasonFilter._id)
    },
  },
  methods: {
    ...mapActions(['setSeasonFilter', 'setCategoryFilter', 'setCompetitionFilter']),
    toggleFilter (filterName) {
      this.manageCategoryList(filterName)
      this.$emit('filterChange', filterName)
      for (let f of this.filters) {
        f.active = false
      }
      let filter = this.filters.find(f => f.name === filterName)
      filter.active = true
    },
    manageCategoryList(filterName) {
      if (filterName === 'team') {
        this.eventCategoryList = formData.eventCategoryList.slice(0, 3)
        if (this.categorySelected === 'training') this.categorySelected = 'all'
      } else {
        this.eventCategoryList = formData.eventCategoryList.slice(0, 4)
      } 
    }
  },
  watch: {
    seasonSelected(seasonId) {
      const season = this.currentTeam.seasons.find(s => s._id === seasonId)
      this.setSeasonFilter(season)
    },
    categorySelected(category) {
      if (category !== 'competition') {
        this.competitionSelected = 'Toutes les compétitions',
        this.setCompetitionFilter(null)
      }
      const eventCategory = formData.eventCategoryList.find(e => e.category === category)
      this.setCategoryFilter(eventCategory)
    },
    competitionSelected(competitionId) {
      const competition = this.competitions.find(c => c._id === competitionId)
      this.setCompetitionFilter(competition)
    }
  },
  created() {
    this.seasonSelected = this.currentTeamSeason._id
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
  p { font-weight: 600!important; }
}
.card-filter-list-item.border-blue.active {
  border-left: 5px solid $blue;
  p { font-weight: 600!important; }
}
.card-filter-btn-add {
  @include flex-center();
  margin-bottom: 20px;
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
