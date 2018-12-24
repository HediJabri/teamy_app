<template>
  <div>
    <div @click="dialogOpen = true"> 
      <slot></slot>
    </div>  
    <dialog-close-competition :competition="competition"
      :openDialog="dialogOpen" 
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogCloseCompetition from '@/components/dialogs/DialogCloseCompetition'

export default {
  name: 'ButtonCloseCompetition',
  mixins: [utilities],
  props: ['competition'],
  components: {
    DialogCloseCompetition
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
