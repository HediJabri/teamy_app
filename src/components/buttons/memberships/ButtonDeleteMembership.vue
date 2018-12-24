<template>
  <div>
    <div @click="dialogOpen = true"> 
      <slot></slot>
    </div>
    <portal to="modals">
      <dialog-delete-membership
        :membership="membership" :team="team"
        :openDialog="dialogOpen"
        @closeDialog="dialogOpen = false" />
    </portal>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteMembership from '@/components/dialogs/DialogDeleteMembership'

export default {
  name: 'ButtonDeleteMembership',
  mixins: [utilities],
  props: ['membership', 'team'],
  components: {
    DialogDeleteMembership
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
