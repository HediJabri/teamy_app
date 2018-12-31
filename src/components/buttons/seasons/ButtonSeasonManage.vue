<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
     <dialog-season-manage
      :team="currentTeam"
      :season="season"
      :formMode="formMode"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false"
    />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import { mapGetters } from 'vuex'
import DialogSeasonManage from '@/components/dialogs/DialogSeasonManage'

export default {
  name: 'ButtonSeasonManage',
  mixins: [utilities],
  props: ['formMode', 'season'],
  components: {
    DialogSeasonManage
  },
  data() {
    return {
      dialogOpen: false
    }
  },
  computed: {
    ...mapGetters(['currentTeam'])
  }
}
</script>
