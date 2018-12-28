<template>
  <div v-if="activity">
    <div class="card-activity" @click="routeToActivity()">
      <div v-if="activity.category === 'new_membership'">
        <p class="card-title">
          <i class="material-icons">group_add</i>
          <span>"{{ $t('newMember') }}"</span>
        </p>
        <div class="card-body">
          <div class="card-body-item" v-if="activity.member">
            <div class="avatar">
              <img v-if="activity.member.avatar" :src="activity.member.avatar">
              <img v-else src="../../../assets/img/user.png">
            </div>
            <div class="card-body-text">
              {{ activity.member.firstName }} {{ activity.member.lastName }}
              <span> {{$t('isTeamMember')}}</span>
            </div>
          </div>
          <div v-else>🚫 {{$t('accountDeleted')}}</div>
        </div>
      </div>
      <div v-if="activity.category === 'remove_membership'">
        <p class="card-title">
          <i class="material-icons">group</i>
          <span>"{{ $t('memberLeaving') }}"</span>
        </p>
        <div class="card-body">
          <div class="card-body-item" v-if="activity.member">
            <div class="avatar">
              <img v-if="activity.member.avatar" :src="activity.member.avatar">
              <img v-else src="../../../assets/img/user.png">
            </div>
             <div class="card-body-text">
              {{ activity.member.firstName }} {{ activity.member.lastName }} 
              <span> {{$t('isNotTeamMember')}} </span>
            </div>
          </div>
          <div v-else>🚫 {{$t('accountDeleted')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'

export default {
  name: 'CardActivityMembership',
  mixins: [utilities],
  props: ['activity'],
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    routeToActivity() {
      let url
      if (this.activity.category === 'new_membership')
        url = `/team/${this.currentTeam._id}/show`
      if (this.activity.category === 'remove_membership')
        url = `/home/user-show/${this.activity.member._id}`
      this.$router.push(url)
    },
    formatDay(day) {
      return formData.recurrenceDaysList.find(d => d.value === day)[
        this.$i18n.locale
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-activity {
  @include card();
  padding: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 3px 5px rgba(5, 15, 44, 0.15);
  }
}
.card-title {
  @include flex-start();
  i {
    font-size: 20px;
    margin-bottom: 2px;
    color: $blue-grey;
  }
  span {
    margin-left: 5px;
    color: $text-grey-blue;
  }
}
.card-body {
  padding: 10px 10px 10px 30px;
}
.card-body-item {
  @include flex-start();
  .avatar {
    @include avatar();
    display: inline-block;
    margin-right: 10px;
    flex: 0 0 30px;
  }
  .card-body-text {
    span {
      color: $text-grey-blue;
    }
  }
}

@media only screen and (max-width: 479px) {
  .card-activity {
    padding: 10px;
    width: 100%;
  }
  .card-body {
    padding: 10px;
  }
  .card-body-item {
    font-size: 12px;
  }
}
</style>
