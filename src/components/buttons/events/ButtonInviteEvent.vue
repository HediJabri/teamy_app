<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-invite-event :team="team"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogInviteEvent from '@/components/dialogs/DialogInviteEvent'

export default {
  name: 'ButtonInviteEvent',
  mixins: [utilities],
  props: ['team'],
  components: {
    DialogInviteEvent
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
