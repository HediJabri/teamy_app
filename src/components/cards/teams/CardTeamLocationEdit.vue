<template>
  <base-card :class="'title-center'" v-if="currentTeamLocation">
    <template slot="cardTitle">{{$t('mainHome')}}</template>
      <div slot="cardBody">
      <div class="card-body-wrapper">
        <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <el-form-item prop="location">
            <el-select v-model="form.location" filterable placeholder="Séléctionner un stade">
              <el-option v-for="location in homeLocations"
                :label="location.name" :value="location._id" :key="location._id">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="btn-submit">
            <el-button type="success" class="btn-xl"
              :loading="isLoading" @click="submitForm('form')">
              <span>{{$t('changeLocation')}}</span>
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiLocations from '@/services/ApiLocations.js'

export default {
  name: 'CardTeamLocationEdit',
  mixins: [utilities],
  props: ['team'],
  data() {
    return {
      isLoading: false,
      form: {
        location: null
      },
      rules: {
        location: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentTeamLocation', 'currentTeam']),
    homeLocations() {
      return this.currentTeam.locations.filter(
        location => location.category === 'home'
      )
    }
  },
  methods: {
    ...mapActions(['editTeamLocation']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateLocation()
        } else {
          return false
        }
      })
    },
    async updateLocation() {
      this.isLoading = true
      const body = { team: this.currentTeam._id, mainLocation: true }
      try {
        const location = (await ApiLocations.patch(this.form.location, body))
          .data
        this.editTeamLocation(location)
        this.$notify({
          title: this.$t('success'),
          message: this.$t('mainLocationEdited'),
          type: 'success'
        })
        this.$router.push(`/team/${this.currentTeam._id}/dashboard`)
      } catch (err) {
        this.impossibleActionNotify()
      }
    }
  },
  created() {
    if (this.currentTeamLocation)
      this.form.location = this.currentTeamLocation._id
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-center();
    text-transform: uppercase;
  }
}
.card-body-wrapper {
  padding: 20px;
}
.btn-submit {
  @include flex-center();
}
.el-select {
  width: 100%;
}
.el-select-dropdown__item span {
  text-transform: capitalize !important;
}
</style>
