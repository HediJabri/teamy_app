<template lang="html">
  <div class="card">
      <div class="card-title">
        <div class="card-title-text">
          <h5>{{$l('teams')}}</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="card-list" v-if="memberships.length" >
          <div class="card-list-item" v-for="(membership, index) in validatedMemberships" 
            :key="membership._id"
            @click="showMembership(membership, index)"
            :class="{'active': activeMembership === index }">
            <div class="card-logo">
              <div class="logo-wrapper">
                <img v-if="membership.team.logo" :src="membership.team.logo">
                <span v-else ><i class="fa fa-shield"></i></span>
              </div>
            </div>
            <div class="list-item-body">
              <p class="list-item-body-top">{{ membership.team.name }}</p>
              <p v-if="membership.team.section" class="list-item-body-bottom">
                <span>{{ membership.team.section }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardUserMemberships',
  mixins: [utilities],
  props: ['memberships'],
  data() {
    return {
      activeMembership: 0
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    validatedMemberships() {
      return this.memberships.filter(m => m.status === 'validated')
    }
  },
  methods: {
    showMembership(membership, index) {
      this.activeMembership = index
      this.$emit('showMembership', membership)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0px;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  .logo-wrapper span {
    width: 50px;
    height: 50px;
    @include flex-center();
    i {
      font-size: 30px;
      color: $blue-france;
    }
  }
}
.card-body {
  margin-top: 22px;
}
.card-list-item {
  @include list-item-m();
}
</style>
