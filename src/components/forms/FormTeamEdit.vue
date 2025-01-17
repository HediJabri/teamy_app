<template lang="html">
  <div class="form-wrapper"
    v-if="currentTeam">
    <div class="form-left-container">
      <div class="form-card">
        <div class="form-title">
          <h5 class="uppercase">
            <span>{{$t('editTeam')}}</span>
          </h5>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <div class="row form-header">
            <div class="col-xs-6">
              <p class="form-photo-label">
                <i class="material-icons">add_a_photo</i>
                <span>{{$t('teamPhoto')}}</span>
              </p>
              <image-upload
                @photoUploaded="addTeamPhoto($event)"
                @photoIsLoading="photoIsLoading = $event" />
            </div>
            <div class="col-xs-6">
              <p class="form-photo-label">
                <i class="material-icons">stars</i>
                <span>{{$t('logo')}}</span>
              </p>
              <image-upload
                @photoUploaded="addTeamLogo($event)"
                @photoIsLoading="logoIsLoading = $event" />
            </div>
          </div>
          <el-form-item prop="name">
            <p class="form-label">{{$t('teamName')}}</p>
            <el-input placeholder="F.C Paris, North London..." v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="city">
            <p class="form-label form-label-small">{{$t('city')}}</p>
            <input-search-cities v-on:addCity="addCity($event)"/>
          </el-form-item>
          <div class="form-btn-submit">
            <el-button type="success"
              class="btn-xl"
              :class="{'disabled': photoIsLoading}"
              :loading="isLoading"
              @click="submitForm('form')">
              <span>{{$t('editTeam')}}</span>
            </el-button>
          </div>
        </el-form>
        <div class="form-errors" v-if="hasErrors" >
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
    </div>
    <div class="form-right-container">
      <card-team-preview
        :photo="form.photo" :logo="form.logo"
        :name="form.name" :section="form.city" />
      <card-team-location-edit :team="currentTeam" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import ApiUsers from '@/services/ApiUsers.js'
import CardTeamPreview from '@/components/cards/teams/CardTeamPreview.vue'
import CardTeamLocationEdit from '@/components/cards/teams/CardTeamLocationEdit.vue'
import ImageUpload from '@/components/global/ImageUpload'
import InputSearchCities from '@/components/global/InputSearchCities'

export default {
  name: 'FormTeamEdit',
  mixins: [guards, utilities],
  components: {
    CardTeamPreview,
    CardTeamLocationEdit,
    ImageUpload,
    InputSearchCities
  },
  data() {
    return {
      isLoading: false,
      photoIsLoading: false,
      logoIsLoading: false,
      errors: [],
      labelPosition: 'top',
      departmentCenters: null,
      form: {
        photo: null,
        logo: null,
        name: null,
        city: null,
        country: null
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        city: [
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
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
    hasErrors() {
      return this.errors.length > 0
    }
  },
  methods: {
    ...mapActions(['initUser', 'initTeam', 'updateUserMembershipTeam']),
    addCity(data) {
      this.form.city = data.city
      this.form.country = data.country
    },
    fillFormTeam() {
      if (this.currentTeam) {
        this.form.photo = this.currentTeam.photo
        this.form.logo = this.currentTeam.logo
        this.form.name = this.currentTeam.name
        this.form.city = this.currentTeam.city
        this.form.country = this.currentTeam.country
      }
    },
    addTeamPhoto(url) {
      this.form.photo = url
    },
    addTeamLogo(url) {
      this.form.logo = url
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.locationName ? this.createLocation() : this.editTeam()
        } else {
          return false
        }
      })
    },
    async editTeam() {
      this.isLoading = true
      try {
        const res = await ApiTeams.patch(this.currentTeam._id, this.form)
        if (res.data.team) this.afterRequestSucceed(res.data.team)
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
      }
    },
    afterRequestSucceed(team) {
      this.initTeam(team)
      this.getUser(this.currentUser._id)
      this.isLoading = false
      this.$router.push(`/team/${this.currentTeam._id}/dashboard`)
      this.$notify({
        title: this.$t('success'),
        message: this.$t('teamEdited'),
        type: 'success'
      })
    },
    async getUser(id) {
      try {
        const user = (await ApiUsers.get(id)).data.user
        this.initUser(user)
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  watch: {
    currentTeam(newValue) {
      if (newValue) {
        this.fillFormTeam()
      }
    }
  },
  created() {
    this.fillFormTeam()
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  margin: 0px auto;
  padding: 0 0 60px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.form-left-container {
  width: 63%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.form-right-container {
  width: 37%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.form-card {
  @include card();
  padding: 20px 60px 30px 60px;
  overflow: visible;
}
.form-title {
  @include title-card();
  text-align: center;
  h5 {
    font-weight: bold;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
}
.form-photo-label {
  @include flex-start();
  color: $nepal;
  i {
    margin: 0 5px 3px 0;
    font-size: 20px;
  }
}
.form-select-left {
  float: left;
}
.form-select-right {
  float: right;
  color: #8492a6;
  font-size: 12px;
}
.form-btn-submit {
  padding-top: 20px;
  text-align: center;
}
.form-errors {
  text-align: center;
  color: $red;
}
.form-label {
  text-align: left;
  margin-bottom: -5px;
}
.form-label-small {
  height: 30px !important;
}
// Element UI
.el-form {
  margin-top: 60px;
}
.el-form-item {
  margin-bottom: 10px;
}
.el-button {
  font-size: 14px;
}
.el-select {
  width: 100%;
}
.el-select-dropdown__item span {
  text-transform: capitalize;
}

@media only screen and (max-width: 479px) {
  .form-card {
    padding: 20px 20px 30px 20px;
  }
  .form-right-container {
    display: none;
  }
  .form-left-container {
    width: 100%;
  }
  .form-header {
    display: none;
  }
  .el-select-dropdown.el-popper {
    left: 0 !important;
  }
  .el-select-dropdown__item {
    font-size: 11px !important ;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .form-card {
    padding: 20px 40px 30px 40px;
    font-size: 12px;
  }
  .form-right-container {
    display: none;
  }
  .form-left-container {
    width: 100%;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .form-card {
    padding: 20px 40px 30px 40px;
  }
}
</style>
