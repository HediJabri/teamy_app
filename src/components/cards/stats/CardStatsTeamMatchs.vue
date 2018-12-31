<template>
  <base-card :class="'title-center'" v-if="statsEvents" >
    <template slot="cardTitle">{{$t('lastGames')}}</template>
    <div slot="cardBody" class="body-center">
      <span class="tag-rounded" v-for="(event, index) in lastEvents"
        :key="index" :class="classTag(event.result)">
        {{ formatResultLetter(event.result) }}
      </span>
    </div>
  </base-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardStatsTeam',
  computed: {
    ...mapGetters(['statsEvents']),
    lastEvents() {
      let lastEvents = this.statsEvents.filter(e => e.result).slice(0, 10)
      return lastEvents.reverse()
    }
  },
  methods: {
    formatResultLetter(result) {
      if (result === 'win') return 'v'
      if (result === 'draw') return 'n'
      if (result === 'lost') return 'd'
    },
    classTag(result) {
      return {
        'background-green': result === 'win',
        'background-red': result === 'lost',
        'background-grey': result === 'draw'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title-center {
  @include flex-center();
}

.body-center {
  @include flex-center();
  padding: 18px 0 12px 0;
}

.tag-rounded {
  @include flex-center();
  color: white;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  font-size: 16px;
  text-transform: uppercase;
  margin: 0 3px;
}
.background-green {
  background: $green;
}
.background-red {
  background: $red;
}
.background-grey {
  background: $border-grey-blue;
}
</style>
