<template>
  <div>
    <div @click="dialogOpen = true">
      <slot></slot>
    </div>
    <dialog-contact-user :user="user"
      v-show="dialogOpen"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import DialogContactUser from '@/components/dialogs/DialogContactUser'

export default {
  name: 'ButtonContactUser',
  mixins: [utilities],
  props: ['user'],
  components: {
    DialogContactUser
  },
  data() {
    return {
      dialogOpen: false
    }
  }
}
</script>
