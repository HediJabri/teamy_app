<template lang="html">
  <div class="form-team-wrapper">
    <div class="form-team-left-container">
      <div class="form-team-card">
        <div class="form-team-title">
          <h5 class="uppercase">
            <span>{{$t('newTeam')}}</span>
          </h5>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <div class="row form-team-header">
            <div class="col-xs-6">
              <p class="form-team-photo-label">
                <i class="material-icons">add_a_photo</i>
                <span>{{$t('teamPhoto')}}</span>
              </p>
              <image-upload
                @photoUploaded="addTeamPhoto($event)"
                @photoIsLoading="photoIsLoading = $event" />
            </div>
            <div class="col-xs-6">
              <p class="form-team-photo-label">
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
            <el-input placeholder="F.C Paris, North London..." v-model="form.name">
            </el-input>
          </el-form-item>
          <el-form-item prop="city">
            <p class="form-label form-label-small">{{$t('city')}}</p>
            <input-search-cities v-on:addCity="addCity($event)"/>
          </el-form-item>
          <el-form-item prop="sport">
            <p class="form-label">{{$t('sport')}}</p>
            <el-select v-model="form.sport" :placeholder="$t('sport')">
              <el-option v-for="sport in sports.list" :label="$t(sport.key)"
                :value="sport.key" :key="sport.key">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="form-team-btn-submit">
            <el-button type="success"
              class="btn-xl"
              :class="{'disabled': photoIsLoading}"
              :loading="isLoading"
              @click="submitForm('form')">
              <span>{{$t('createMyTeam')}}</span>
            </el-button>
          </div>
        </el-form>
        <div class="form-team-errors" v-if="hasErrors" >
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
    </div>
    <div class="form-team-right-container">
      <card-team-preview
        :photo="form.photo" :logo="form.logo"
        :name="form.name" :city="form.city" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import ImageUpload from '@/components/global/ImageUpload'
import InputSearchCities from '@/components/global/InputSearchCities'
import CardTeamPreview from '@/components/cards/teams/CardTeamPreview.vue'

export default {
  name: 'FormTeamCreate',
  mixins: [guards, utilities],
  props: ['mode'],
  components: {
    CardTeamPreview,
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
      form: {
        mainAdmin: null,
        photo: null,
        logo: null,
        name: null,
        sport: null,
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
        sport: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
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
    ...mapActions(['initUser', 'initTeam']),
    addCity(data) {
      this.form.city = data.city
      this.form.country = data.country
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
          this.createTeam()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async createTeam() {
      this.isLoading = true
      let body = this.form
      body.mainAdmin = this.currentUser._id
      try {
        await ApiTeams.post(body)
        this.$router.push(`/home/dashboard`)
        this.$notify({
          title: this.$t('success'),
          message: this.$t('teamCreated'),
          type: 'success'
        })
      } catch (err) {
        this.impossibleActionNotify()
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-team-wrapper {
  width: 100%;
  margin: 0px auto;
  padding: 0 0 60px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.form-team-left-container {
  width: 63%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.form-team-right-container {
  width: 37%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.form-team-card {
  @include card();
  padding: 20px 60px 30px 60px;
  overflow: visible;
}
.form-team-title {
  @include title-card();
  text-align: center;
}
.form-team-photo-label {
  @include flex-start();
  color: $nepal;
  i {
    margin: 0 5px 3px 0;
    font-size: 20px;
  }
}
.form-team-select-left {
  float: left;
}
.form-team-select-right {
  float: right;
  color: #8492a6;
  font-size: 12px;
}
.form-team-btn-submit {
  padding-top: 20px;
  text-align: center;
}
.form-team-errors {
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
  .form-team-card {
    padding: 20px 20px 30px 20px;
  }
  .form-team-right-container {
    display: none;
  }
  .form-team-left-container {
    width: 100%;
  }
  .form-team-header {
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
  .form-team-card {
    padding: 20px 40px 30px 40px;
    font-size: 12px;
  }
  .form-team-right-container {
    display: none;
  }
  .form-team-left-container {
    width: 100%;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .form-team-card {
    padding: 20px 40px 30px 40px;
  }
}
</style>
