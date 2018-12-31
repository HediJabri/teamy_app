<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-delete-account
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteAccount from '@/components/dialogs/DialogDeleteAccount'

export default {
  name: 'ButtonDeleteAccount',
  mixins: [utilities],
  props: ['user'],
  components: {
    DialogDeleteAccount
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
