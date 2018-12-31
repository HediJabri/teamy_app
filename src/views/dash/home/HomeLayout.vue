<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomeLayout',
  methods: {
    ...mapActions(['resetTeam', 'resetNotifications'])
  },
  created() {
    this.resetTeam()
    this.resetNotifications()
  }
}
</script>
