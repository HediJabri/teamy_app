<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-add-location
      :team="team" :category="category"
      :openDialog="dialogOpen" 
      @closeDialog="dialogOpen = false"
      @locationCreated="locationCreated($event)" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogAddLocation from '@/components/dialogs/DialogAddLocation'

export default {
  name: 'ButtonAddLocation',
  mixins: [utilities],
  props: ['team', 'category'],
  components: {
    DialogAddLocation
  },
  data() {
    return {
      dialogOpen: false
    }
  },
  methods: {
    locationCreated(location) {
      this.$emit('created', location)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
