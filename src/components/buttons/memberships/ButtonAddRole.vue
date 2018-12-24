<template>
  <div>
    <el-button type="primary" class="btn-m" @click="dialogOpen = true">
      <span>{{$t('addMyRole')}}<i class="fa fa-plus-circle margin-left"></i></span>
    </el-button>
    <dialog-edit-membership
      :membership="membership" :team="team"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false" />
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
// import DialogEditMembership from '@/components/dialogs/DialogEditMembership'

export default {
  name: 'ButtonDeleteEvent',
  mixins: [utilities],
  props: ['membership', 'team'],
  components: {
    // DialogEditMembership
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
