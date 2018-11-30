<template lang="html">
  <div class="card" v-if="statsEvents">
    <div class="card-title">
      <div class="card-title-text">
        <h5>derniers matchs</h5>
      </div>
    </div>
    <div class="card-body">
      <span class="tag-rounded" v-for="(event, index) in lastEvents" v-if="event.result"
        :key="index" :class="classTag(event.result)">
        {{ formatResultLetter(event.result) }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardStatsTeam',
  computed: {
    ...mapGetters(['statsEvents']),
    lastEvents () {
      let lastEvents = this.statsEvents.slice(0, 10)
      return lastEvents.reverse()
    }
  },
  methods: {
    formatResultLetter(result) {
      if (result === 'win') return 'v'
      if (result === 'draw') return 'n'
      if (result === 'lost') return 'd'
    },
    classTag (result) {
      return {
        'background-green': result === 'win',
        'background-red': result === 'lost',
        'background-grey': result === 'draw',
      }
    },
  }

}
</script>

<style lang="scss" scoped>

.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-center();
    text-transform: uppercase;
  }
}

.card-body {
  @include flex-center();
  margin-top: 40px;
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
.background-green { background: $green }
.background-red { background: $red }
.background-grey { background: $border-grey-blue }

</style>
