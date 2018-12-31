<template>
  <div class="btn-contact-wrapper" :class="{'highlighted': contactHighlighted}">
    <el-button class="btn-contact" type="default" @click="dialogOpen = true"> 
      <span class="emoji" v-if="contactHighlighted">👇</span>
      <slot></slot>
      <i class="fa fa-question-circle blue margin-left"></i>
    </el-button>
    <dialog-contact :user="currentUser"
      v-show="dialogOpen"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false"/>
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
  data() {
    return {
      isLoading: false,
      dialogOpen: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'contactHighlighted'])
  }
}
</script>
<style lang="scss" scoped>
.btn-contact {
  position: fixed;
  bottom: 0;
  left: 0px;
  border-bottom: none;
  .emoji {
    font-size: 20px;
    position: absolute;
    bottom: 40px;
    right: 30px;
  }
}
.btn-contact-wrapper.highlighted .btn-contact {
  z-index: 9999;
}

@media only screen and (max-width: 479px) {
  .btn-contact span {
    display: none;
  }
}
</style>
