<template lang="html">
<div v-if="event && eventIsMatchCategory(event)" class="event-result">
  <div v-if="!event.result" class="event-result-btn">
    <el-button type="primary" v-if="resultButton && isAdmin(currentUser, event.team)"
      @click="openDialogAddEventResult('add')">
      {{$t('addResult')}}
      <i class="fa fa-plus-circle margin-left"></i>
    </el-button>
    <div v-else class="event-result-info">
      <span class="result-info" v-if="resultButton"> {{$t('pendingResult')}}...</span>
      <span class="result-info" v-else>{{$t('pending')}}...</span>
    </div>
  </div>
  <div v-else class="event-result-info" 
    :class="{'cursor': isAdmin(currentUser, event.team)}"
    @click="openDialogAddEventResult('edit')">
    <span v-if="isMatchResult" class="result-info" :class="classTagSize()">
      <i :class="classResultIcon(event.result)"></i>
      {{ formatResult(event.result) }} 
      <span v-if="event.locationCategory === 'home'">{{ event.scoreTeam }} - {{ event.scoreOpponent }}</span>
      <span v-else >{{ event.scoreOpponent }} - {{ event.scoreTeam }} </span>
    </span>
    <span v-else class="result-info">{{ event.result }}</span>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'EventParticipationInfo',
  props: ['event', 'tagSize', 'resultButton'],
  mixins: [utilities],
  computed: {
    ...mapGetters(['currentUser']),
    isMatchResult() {
      return ['win', 'draw', 'lost'].includes(this.event.result)
    }
  },
  methods: {
    classTagSize() {
      return {
        'tag-s': this.tagSize === 's',
        'tag-l': this.tagSize === 'l'
      }
    },
    openDialogAddEventResult(mode) {
      if (this.isAdmin(this.currentUser, this.event.team))
        this.$emit('openDialogAddEventResult', mode)
    }
  }
}
</script>

<style lang="scss" scoped>
.event-result {
  height: 30px;
  @include flex-center();
}
.event-result-btn {
  @include flex-center();
}
.event-result-info.cursor {
  cursor: pointer;
}
.event-result-info {
  text-align: center;
  position: relative;
  i {
    font-size: 15px;
  }
  .emoji-result {
    position: absolute;
    bottom: -2px;
    right: -20px;
    font-size: 16px;
  }
}
.result-info {
  color: $blue-dark !important;
  @include tag-flat();
  font-size: 12px;
  position: relative;
}
.result-info.tag-l {
  @include tag-flat-l();
}
.result-info.tag-s {
  @include tag-flat-s();
  i {
    font-size: 12px !important;
  }
}

@media only screen and (max-width: 479px) {
  .event-result-info .result-info {
    font-size: 12px;
  }
}
</style>
