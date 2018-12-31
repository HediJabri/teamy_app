<template>
  <div class="card-wrapper">
    <base-card>
      <template slot="cardTitle">{{$t('stats')}}</template>
      <div slot="cardBody">
        <div class="card-list-item"
          v-for="filter in filters" :key="filter.title"
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
    <div class="filters-wrapper">
      <h5>{{$t('filters')}}</h5>
      <el-select v-model="seasonSelected">
        <el-option v-for="(season, index) in currentTeam.seasons" 
          :key="index" :value="season._id" :label="season.name">
        </el-option>
      </el-select>
      <el-select v-model="categorySelected">
        <el-option v-for="(item, index) in eventCategoryList" 
          :key="index" :value="item.category" :label="$tc(item.title, 2)">
        </el-option>
      </el-select>
      <el-select v-model="competitionSelected"
        v-if="categorySelected === 'competition'">
        <el-option :value="'all'" :label="$t('allCompetitions')">
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
  data() {
    return {
      filters: [
        { id: 1, title: 'Team', name: 'team', active: true, border: 'blue' },
        {
          id: 2,
          title: 'players',
          name: 'players',
          active: false,
          border: 'red'
        }
      ],
      seasonSelected: null,
      categorySelected: this.$t('allGames'),
      competitionSelected: this.$t('allCompetitions'),
      eventCategoryList: formData.eventCategoryList.slice(0, 3)
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentTeam',
      'currentTeamSeason',
      'statsSeasonFilter'
    ]),
    competitionsFiltered() {
      return this.competitions.filter(
        c => c.season._id === this.statsSeasonFilter._id
      )
    }
  },
  methods: {
    ...mapActions([
      'setSeasonFilter',
      'setCategoryFilter',
      'setCompetitionFilter'
    ]),
    toggleFilter(filterName) {
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
        ;(this.competitionSelected = this.$t('allCompetitions')),
          this.setCompetitionFilter(null)
      }
      const eventCategory = formData.eventCategoryList.find(
        e => e.category === category
      )
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
.card-list-item {
  @include list-item-s();
  border-left: 5px solid transparent;
  cursor: pointer;
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
