<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-invite-users :team="team"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogInviteUsers from '@/components/dialogs/DialogInviteUsers'

export default {
  name: 'ButtonInviteUsers',
  mixins: [utilities],
  props: ['team'],
  components: {
    DialogInviteUsers
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
