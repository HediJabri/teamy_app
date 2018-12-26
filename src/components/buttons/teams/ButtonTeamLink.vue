<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-team-link :team="team"
      :openDialog="dialogOpen" 
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogTeamLink from '@/components/dialogs/DialogTeamLink'

export default {
  name: 'ButtonTeamLink',
  mixins: [utilities],
  props: ['team'],
  components: {
    DialogTeamLink
  },

  data() {
    return {
      dialogOpen: false
    }
  },
  computed: {
    ...mapGetters(['dialogTeamLinkOpen'])
  },
  methods: {
    ...mapActions(['openDialogTeamLink'])
  },
  created() {
    if (this.dialogTeamLinkOpen) this.dialogOpen = true
    this.openDialogTeamLink(false)
  }
}
</script>
<style lang="scss" scoped>
</style>
