<template lang="html">
  <transition name="fade" mode="out-in">
    <div class="card-list" v-if="competitions.length">
      <div class="card-item" v-for="competition in competitions" :key="competition._id">
        <div class="card-item-link" @click="routeTo(competition)">
          <div class="card-item-header">
            <h5>{{ competition.name }}</h5>
            <p>{{ $t(competition.category) }}</p>
            <img v-if="competition.image" :src="competition.image" alt="">
            <div class="card-item-header-icon" v-else>
              <i class="fa fa-trophy" ></i>
            </div>
          </div>
          <div class="card-item-body">
            <div v-if="competition.season">
              <p>{{ competition.season.name }}</p>
            </div>
            <div>
              <span class="emoji">🗓 </span>
              <span class="text-item">{{ $t('events') }} : {{ competition.events.length }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-next-page" 
        v-if="page.next >= 0 && !page.allRecordsFetched">
        <el-button type="primary"
          :loading="page.loadingNext"
          @click="goToNextPage()">
          {{ $t('seeMore')}}
        </el-button>
      </div>
      <div class="btn-add-competition"
        v-if="isAdmin(currentUser, currentTeam) && page.allRecordsFetched && from === 'event-new'">
        <el-button type="primary"
          @click="routeUrl(`/team/${currentTeam._id}/competition-new`)">
         {{ $t('addCompetition')}}
        </el-button>
      </div>
    </div>
    <div v-else class="card-list-empty">
      <div class="card-list-empty-wrapper">
        <span class="tag">
          <i class="fa fa-trophy"></i>
        </span>
        <p>{{$tc('competition', 0)}}</p>
        <div class="card-btn-add" v-if="displayAddButton" >
          <el-button type="primary" 
            @click="routeUrl(`/team/${currentTeam._id}/competition-new`)">
            {{ $t('add')}}<i class="fa fa-plus-circle margin-left"></i>
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardCompetitionList',
  mixins: [utilities],
  props: ['competitions', 'page', 'filter', 'from'],
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    displayAddButton () {
      return (
        this.isAdmin(this.currentUser, this.currentTeam) &&
        !this.competitions.length
      )
    }
  },
  methods: {
    goToNextPage () {
      this.$emit('goToNextPage')
    },
    routeTo (competition) {
      if (this.from === 'event-new') {
        this.$router.push(
          `/team/${this.currentTeam._id}/event-new/competition/${
          competition._id
          }`
        )
      } else {
        this.$router.push(
          `/team/${this.currentTeam._id}/competition/${competition._id}`
        )
      }
    },
    competitionEvents (competition) {
      if (this.competitions.events)
        return this.competitions.events.filter(
          e => parseInt(e['competition-id']) === parseInt(competition.id)
        ).length
    }
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  @include card();
  text-align: center;
}
.card-item-link {
  text-decoration: none;
  color: $text-grey-blue;
  cursor: pointer;
}
.card-item-header {
  padding: 0 70px;
  position: relative;
  h5 {
    font-size: 15px;
    text-transform: uppercase;
  }
  p {
    color: $text-grey-blue;
    font-weight: 300;
    font-size: 16px;
    text-align: center;
  }
  img {
    width: 60px;
  }
}
.card-item-header-icon {
  @include icon-logo-wrapper();
  font-size: 18px;
}

.card-item-body {
  padding: 20px 70px;
  font-size: 13px;
  div {
    @include emoji-text-wrapper();
    justify-content: center;
    height: 40px;
  }
}
.card-list-empty {
  height: 270px;
  @include flex-center();
}

.card-list-empty-wrapper .btn-next-page,
.btn-add-competition {
  @include flex-center();
  margin-bottom: 20px;
}
.card-list-empty-wrapper {
  color: $blue-grey;
  p {
    text-align: center;
    margin-bottom: 30px;
  }
  .tag {
    @include tag-flat-icon;
  }
  .card-btn-add {
    @include flex-center();
  }
}

@media only screen and (max-width: 479px) {
  .card-item {
    padding: 20px 15px;
  }
  .card-item-header {
    padding: 0;
  }
  .card-item-body {
    padding: 20px 0;
    p {
      text-align: center;
    }
  }
}
</style>
