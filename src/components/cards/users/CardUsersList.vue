<template lang="html">
  <div class="card-list">
    <div v-if="users" class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="user in users" :key="user.id">
        <card-users-list-item :user="user" />
      </div>
    </div>
    <div class="btn-next-page" 
      v-if="page && page.next >= 0 && !page.allRecordsFetched">
      <el-button type="primary"
        :loading="page.loadingNext"
        @click="goToNextPage()">
       {{$t('seeMore')}}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardUsersListItem from '@/components/cards/users/CardUsersListItem'

export default {
  name: 'CardUsersList',
  mixins: [utilities],
  props: ['users', 'page', 'filter'],
  components: { CardUsersListItem },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    goToNextPage() {
      this.$emit('goToNextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin-right: 0;
  margin-left: 0;
}
.col-xs-12 {
  padding-right: 0;
  padding-left: 0;
}
.btn-next-page {
  @include flex-center();
}

.card-list-empty-wrapper {
  @include flex-center();
  height: 200px;
  text-align: center;
}
</style>
