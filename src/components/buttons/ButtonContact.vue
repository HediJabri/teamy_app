<template>
  <div class="btn-contact-wrapper" :class="{'highlighted': contactHighlighted}">
    <div class="btn-contact el-button--default el-button" @click="openDialogContact()">
      <span class="emoji" v-if="contactHighlighted">👇</span>
      <span>Contact </span>
      <i class="fa fa-question-circle" aria-hidden="true"></i>
    </div>
    <dialog-contact v-show="currentUser" :user="currentUser"
      :openDialog="dialogContact" @closeDialog="dialogContact = false" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { utilities } from '@/mixins/utilities.js'
  import DialogContact from '@/components/dialogs/DialogContact'

  export default {
  name: 'ButtonContact',
  mixins: [utilities],
  components: { DialogContact },
  data () {
    return {
      isLoading: false,
      dialogContact: false,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'contactHighlighted'])
  },
  methods: {
    openDialogContact () {
      this.dialogContact = true
    },
  },
}
</script>
<style lang="scss" scoped>

.btn-contact {
  position: fixed;
  bottom: 0;
  left: 0px;
  border-bottom: none;
  i { color: $blue }
  .emoji { font-size: 20px; position: absolute; bottom: 40px; right: 30px;}
}
.btn-contact-wrapper.highlighted {
  .btn-contact { z-index: 9999 }
}

@media only screen and (max-width: 479px) {
  .btn-contact span { display: none; }
}
</style>