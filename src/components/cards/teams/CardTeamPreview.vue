<template lang="html">
<div>
  <div class="card">
    <div class="card-image-untitle">
      <img v-if="teamPhoto" :src="teamPhoto" alt="">
      <img v-else src="../../../assets/img/team.png">
    </div>
    <div class="card-logo" v-if="teamLogo">
      <div class="logo-wrapper">
        <img :src="teamLogo" alt="">
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">
        <span v-if="teamName">{{ teamName }}</span>
      </h5>
      <p class="card-subtitle">
        <span v-if="teamCity">{{ teamCity }}</span>
      </p>
    </div>
  </div>
</div>
 
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'card',
  mixins: [utilities],
  props: ['photo', 'logo', 'name', 'city'],
  data () {
    return {
      teamPhoto: null,
      teamLogo: null,
      teamName: null,
      teamCity: null
    }
  },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    fillTeamPreview () {
      this.teamPhoto = this.currentTeam.photo
      this.teamLogo = this.currentTeam.logo
      this.teamName = this.currentTeam.name
      this.teamCity = this.currentTeam.city
    }
  },
  watch: {
    photo (photo) {
      this.teamPhoto = photo
    },
    logo (logo) {
      this.teamLogo = logo
    },
    name (name) {
      this.teamName = name
    },
    city (city) {
      this.teamCity = city
    },
    currentTeam (newValue) {
      if (newValue) this.fillTeamPreview()
    }
  },
  created () {
    if (this.currentTeam) this.fillTeamPreview()
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 0px 0px 10px 0px !important;
}
.card-image-untitle {
  width: 100%;
  height: 180px;
  position: relative;
  img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
}
.card-logo {
  @include logo-team-card();
  .logo-wrapper {
    display: flex;
    justify-content: center;
    i {
      font-size: 40px;
      margin-top: 8px;
    }
  }
}
.card-body {
  margin-top: 10px;
  padding: 10px 20px;
  .card-title {
    line-height: 20px;
    margin-bottom: 2px;
    text-align: center;
  }
  .card-subtitle {
    height: 18px;
    font-size: 13px;
    line-height: 24px;
    color: $text-grey-blue;
    @include text-overflow-ellipsis;
    text-align: center;
  }
}
</style>
