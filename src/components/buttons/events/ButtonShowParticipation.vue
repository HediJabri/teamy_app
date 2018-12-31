<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-show-participation
      :mode="mode"
      :participation="participation"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false"
    />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogShowParticipation from '@/components/dialogs/DialogShowParticipation'

export default {
  name: 'ButtonShowParticipation',
  mixins: [utilities],
  props: ['participation', 'mode'],
  components: {
    DialogShowParticipation
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
