<template lang="html">
  <div class="page-user-show">
    <transition name="fade" mode="out-in">
      <teamy-spinner :logo="true" v-if="!user" />
      <div v-else class="page-wrapper">
        <div class="page-left-container">
          <card-user :user="user"/>
        </div>
        <div class="page-center-container">
          <card-membership-info v-if="membershipSelected"
            :user="user" :membership="membershipSelected"/>
        </div>
        <div class="page-right-container">
          <card-user-memberships 
            :memberships="user.memberships" v-on:showMembership="showMembership($event)"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiUsers from '@/services/ApiUsers.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardUser from '@/components/cards/users/CardUser'
import CardMembershipInfo from '@/components/cards/users/CardMembershipInfo'
import CardUserMemberships from '@/components/cards/users/CardUserMemberships'

export default {
  name: 'UserShow',
  components: {
    TeamySpinner,
    CardUser,
    CardMembershipInfo,
    CardUserMemberships
  },
  data() {
    return {
      user: null,
      membershipSelected: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    showMembership(membership) {
      this.membershipSelected = membership
    },
    async getUser(id) {
      try {
        const user = (await ApiUsers.get(id)).data.user
        this.user = user
        this.membershipSelected = user.memberships[0]
          ? user.memberships[0]
          : null
        console.log(user)
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created() {
    const userId = this.$route.params.id
    if (userId) this.getUser(userId)
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
  .page-wrapper {
    flex-direction: column;
    padding: 0px 10px 60px 10px;
  }
  .page-center-container,
  .page-left-container {
    width: 100% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-center-container,
  .page-left-container {
    width: 90% !important;
  }
  .page-right-container {
    display: none;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-left-container {
    width: 33% !important;
  }
  .page-center-container {
    width: 67% !important;
  }
  .page-right-container {
    display: none;
  }
}
</style>
