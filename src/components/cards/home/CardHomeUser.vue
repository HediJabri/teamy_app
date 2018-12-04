<template lang="html">
  <div class="card-home-user">
    <div class="card-item" @click="routeUrl(`/home/user-show/${currentUser._id}`)">
      <div class="card-item-img">
        <div class="logo-wrapper">
          <img class="main-navbar-logo" src="../../../assets/img/logo-circle.png">
        </div>
      </div>
      <div class="card-item-body">
        <h5>{{ currentUser.firstName }} {{ currentUser.lastName[0] }}.</h5>
        <p> {{ $tc('team', validatedMemberships.length) }}</p>
      </div>
    </div>
    <hr>
    <card-home-pending-teams v-if="pendingMemberships.length" :memberships="pendingMemberships" />
    <div class="card-button-wrapper">
      <el-button type="default" class="btn-icon" @click="routeUrl('/home/user-edit')">
        <span>{{$t('myAccount')}}<i class="material-icons blue">settings</i></span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardHomePendingTeams from '@/components/cards/home/CardHomePendingTeams'

export default {
  name: 'CardHomeUser',
  mixins: [utilities],
  components: { CardHomePendingTeams },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentUser']),
    validatedMemberships() {
      return this.currentUser.memberships.filter(m => m.status === 'validated')
    },
    pendingMemberships() {
      return this.currentUser.memberships.filter(m => m.status === 'pending')
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card-home-user {
  padding-right: 30px;
}
.card-item {
  @include flex-start();
  cursor: pointer;
  .card-item-img {
    width: 44px;
    height: 42px;
    margin-right: 5px;
  }
  .card-item-body {
    display: flex;
    flex-direction: column;
    h5 {
      font-weight: 600;
      margin: 3px 0;
      @include text-overflow-ellipsis();
    }
    p {
      font-size: 12px;
      margin-bottom: 0;
    }
  }
}

@media only screen and (max-width: 479px) {
  .card-button-wrapper {
    display: none !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .card-button-wrapper {
    display: none !important;
  }
  .card-item-body {
    h5 {
      width: 200px;
    }
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .card-item-body {
    h5 {
      width: 130px;
    }
  }
}
</style>
