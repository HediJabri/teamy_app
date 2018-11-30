<template lang="html">
 <transition name="fade" mode="out-in">
      <teamy-spinner :logo="true" v-if="!currentUser" />
      <div v-else class="page-wrapper">
        <div class="page-left-container">
          <card-user :user="currentUser" :team="currentTeam"/>
        </div>
        <div class="page-center-container">
          <form-user-edit />
        </div>
        <div class="page-right-container">
          <form-user-account />
        </div>
      </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardUser from '@/components/cards/users/CardUser'
import FormUserEdit from '@/components/forms/FormUserEdit'
import FormUserAccount from '@/components/forms/FormUserAccount'

export default {
  name: 'UserEdit',
  components: { CardUser, FormUserEdit, FormUserAccount },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    ...mapActions(['resetTeam', 'resetNotifications']),
  },
  created () {
    this.resetTeam()
    this.resetNotifications()
  }
}
</script>

<style lang="scss" scoped>

.page-wrapper {
  @include page-wrapper();
}
.page-left-container {
  @include page-left-container();
}
.page-right-container {
  @include page-right-container();
}
.page-center-container {
  @include page-center-container();
}

@media only screen and (max-width: 479px) {
  .page-wrapper { flex-direction: column; padding: 0px 10px 60px 10px; }
  .page-center-container, .page-left-container { width: 100% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper { flex-direction: column }
  .page-center-container, .page-left-container { width: 90% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-left-container { width: 33% !important; }
  .page-center-container { width: 67% !important; }
  .page-right-container { display: none }
}
</style>
