<template>
  <transition name="fade" mode="out-in">
    <div class="page-wrapper">
      <div class="page-left-container">
        <card-user :user="currentUser" :team="null"/>
      </div>
      <div class="page-center-container-l">
        <form-team-create />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardUser from '@/components/cards/users/CardUser'
import FormTeamCreate from '@/components/forms/FormTeamCreate'

export default {
  name: 'TeamCreate',
  mixins: [utilities],
  components: {
    CardUser,
    FormTeamCreate
  },
  data() {
    return {
      formMode: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
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
.page-center-container-l {
  @include page-center-container-l();
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    padding: 0px 10px 60px 10px;
  }
  .page-left-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-left-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
  }
}

@media only screen and (min-width: 720px) and (max-width: 959px) {
  .page-left-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1160px) {
  .page-left-container {
    display: none;
  }
  .page-center-container-l {
    width: 100%;
  }
}
</style>
