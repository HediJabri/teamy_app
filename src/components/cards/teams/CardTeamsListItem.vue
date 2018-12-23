<template lang="html">
<div class="card-wrapper">
  <div class="card-list-item" v-if="team" @click="teamShow()">
    <div class="card-list-item-image-untitle">
      <img v-if="team.photo" :src="team.photo">
      <img v-else src="../../../assets/img/team.png">
    </div>
    <div class="card-list-item-logo" v-if="team.logo">
      <div class="logo-wrapper">
        <img :src="team.logo">
      </div>
    </div>
    <div class="card-list-item-body">
      <h5 class="card-list-item-title">{{ team.name }}</h5>
      <p class="card-list-item-subtitle">
        <span v-if="team.city">{{ team.city }}</span>
      </p>
    </div>
    <router-link v-if="isMainAdmin(currentUser, team)" 
      class="card-list-item-edit" :to="`/team/${team._id}/edit`">
      <el-tooltip :content="$t('editTeam')" placement="bottom" :open-delay="300">
        <i class="material-icons">settings</i>
      </el-tooltip>
    </router-link>
  </div>
  <dialog-show-team
    :teamId="team._id"
    :openDialog="dialogShowTeam"
    @closeDialog="dialogShowTeam = false" />
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogShowTeam from '@/components/dialogs/DialogShowTeam'

export default {
  name: 'CardTeamsListItem',
  props: ['team', 'teamAdmin'],
  mixins: [utilities],
  components: { DialogShowTeam },
  data() {
    return {
      dialogShowTeam: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    isHomeView() {
      return this.$route.name === 'home-dashboard'
    }
  },
  methods: {
    teamShow() {
      if (this.$route.name === 'home-dashboard') {
        this.$router.push(`/team/${this.team._id}/dashboard`)
      } else {
        this.dialogShowTeam = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list-item {
  @include card;
  text-align: center;
  padding: 0px 0px 10px 0px !important;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 3px 5px rgba(5, 15, 44, 0.15);
  }
}
.card-list-item-image-untitle {
  width: 100%;
  height: 170px;
  position: relative;
  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
}
.card-list-item-logo {
  @include logo-team-card-s;
  .logo-wrapper i {
    font-size: 35px;
    margin-top: 6px;
  }
}
.card-list-item-body {
  margin: 5px 0;
  padding: 10px 20px;
  .card-list-item-title {
    line-height: 18px;
    margin-bottom: 0;
    @include text-overflow-ellipsis;
  }
  .card-list-item-subtitle {
    height: 18px;
    font-size: 13px;
    line-height: 24px;
    color: $text-grey-blue;
    text-align: center;
    @include text-overflow-ellipsis;
  }
}

.card-list-item-edit {
  position: absolute;
  bottom: 5px;
  right: 15px;
  i {
    font-size: 17px;
    color: $text-grey-blue;
    cursor: pointer;
  }
}
</style>
