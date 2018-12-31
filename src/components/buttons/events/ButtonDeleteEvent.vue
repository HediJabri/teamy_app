<template>
  <div>
    <div @click="dialogOpen = true"> 
      <slot></slot>
    </div>
    <dialog-delete-event :event="event"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteEvent from '@/components/dialogs/DialogDeleteEvent'

export default {
  name: 'ButtonDeleteEvent',
  mixins: [utilities],
  props: ['event'],
  components: {
    DialogDeleteEvent
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
