<template lang="html">
  <div v-if="category" class="event-category-icon" :class="{ 's': size === 's' }">
    <div v-if="competition && competition.image" class="logo-wrapper">
      <img :src="competition.image" alt="">
    </div>
    <div v-else class="logo-icon">
      <i v-if="category === 'competition'" class="fa fa-trophy"></i>
      <i v-if="category === 'other'" class="material-icons">event</i>
      <img v-if="category === 'friendly'" :src="sportIconWhite()">
      <img v-if="category === 'training'" :src="sportIconWhite()">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'EventCategoryIcon',
  mixins: [utilities],
  props: ['size', 'category', 'competition'],
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports'])
  }
}
</script>

<style lang="scss" scoped>
.event-category-icon {
  width: 60px;
  height: 60px;
  img {
    width: 60px;
  }
}
.event-category-icon.s {
  width: 45px;
  height: 45px;
  img {
    width: 45px;
  }
}
.logo-icon {
  @include icon-logo-wrapper();
  .material-icons {
    font-size: 20px;
  }
  img {
    width: 15px !important;
  }
}
</style>
