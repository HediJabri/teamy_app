<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-add-event-result
      :event="event" :mode="mode"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" /> 
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogAddEventResult from '@/components/dialogs/DialogAddEventResult'

export default {
  name: 'ButtonAddResult',
  mixins: [utilities],
  props: ['mode', 'event'],
  components: {
    DialogAddEventResult
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
