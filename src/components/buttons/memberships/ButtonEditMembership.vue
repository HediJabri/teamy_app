<template>
  <div>
    <div @click="dialogOpen = true"> 
      <slot></slot>
    </div>
    <dialog-edit-membership
      :membership="membership" :team="team"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogEditMembership from '@/components/dialogs/DialogEditMembership'

export default {
  name: 'ButtonEditMembership',
  mixins: [utilities],
  props: ['membership', 'team'],
  components: {
    DialogEditMembership
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
