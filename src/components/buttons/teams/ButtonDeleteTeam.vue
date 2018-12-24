<template>
  <div>
    <div @click="dialogOpen = true"> 
      <slot></slot>
    </div>
    <portal to="nav-modals">
      <dialog-delete-team
        :team="team"
        :openDialog="dialogOpen"
        @closeDialog="dialogOpen = false" />
    </portal>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteTeam from '@/components/dialogs/DialogDeleteTeam'

export default {
  name: 'ButtonDeleteTeam',
  mixins: [utilities],
  props: ['team'],
  components: {
    DialogDeleteTeam
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
