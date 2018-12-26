<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-notify-users :user="user"
      v-show="dialogOpen"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogNotifyUsers from '@/components/dialogs/DialogNotifyUsers'

export default {
  name: 'ButtonContactUser',
  mixins: [utilities],
  props: ['user'],
  components: {
    DialogNotifyUsers
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
