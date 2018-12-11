<template lang="html">
  <div class="form-wrapper">
    <div class="form-wrapper-title">
      <h5>{{$t('newCompetition')}}</h5>
    </div>
    <div class="form-card">
      <div class="form-card-title">
        <h5>{{ form.name }}</h5>
      </div>
      <div class="row">
        <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <div class="row">
            <div class="form-header-custom">
              <div class="col-xs-12">
                <div class="form-header">
                  <i class="fa fa-trophy"></i>
                </div>
                <p class="form-header-title" v-if="form.season">
                  {{ formatSeason(form.season) }}
                </p>
              </div>
              <div class="col-xs-12">
                <div class="form-label-group">
                  <p class="form-label">{{$t('season')}}</p>
                  <el-button class="btn-m" type="primary" @click="routeUrl(`seasons`)" >
                    <span>{{$t('add')}}<i class="fa fa-plus-circle margin-left"></i></span>
                  </el-button>
                </div>
                <el-form-item prop="season">
                  <el-select v-model="form.season">
                    <el-option v-for="season in currentTeam.seasons"
                      :label="season.name" :value="season._id" :key="season._id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <p class="form-label">{{$t('competitionType')}}</p>
                <el-form-item prop="category">
                  <el-select v-model="form.category" :placeholder="$t('selectType')">
                    <el-option v-for="competition in formData.competitionCategories"
                      :label="$t(competition.category)" :value="competition.category" :key="competition.category">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <p class="form-label">{{$t('competitionName')}}</p>
                <el-form-item prop="name">
                  <el-input placeholder="District 1" v-model="form.name">
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="form-btn-submit">
            <el-button type="success"
              class="btn-large"
              :loading="isLoading"
              @click="submitForm('form')">
              <span>{{$t('addCompetition')}}</span>
            </el-button>
          </div>
        </el-form>
      </div>
      <div v-if="hasErrors" class="form-errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import data from '@/data/forms.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'

export default {
  name: 'FormCompetitionCreate',
  mixins: [utilities],
  data() {
    return {
      isLoading: false,
      formData: data,
      labelPosition: 'top',
      errors: [],
      form: {
        name: null,
        category: null,
        season: null,
        infos: null,
        image: null
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        category: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    hasErrors() {
      return this.errors.length > 0
    }
  },
  methods: {
    formatSeason(seasonId) {
      return this.currentTeam.seasons.find(s => s._id === seasonId).name
    },
    toggleForm() {
      this.$emit('toggleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createCompetition()
        } else {
          return false
        }
      })
    },
    async createCompetition() {
      this.isLoading = true
      this.form.team = this.currentTeam._id
      try {
        const competition = (await ApiCompetitions.post(this.form)).data
          .competition
        this.isLoading = false
        this.$notify({
          title: this.$t('success'),
          message: this.$t('competitionCreated'),
          type: 'success'
        })
        this.$router.push(
          `/team/${this.currentTeam._id}/competition/${competition._id}`
        )
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    }
  },
  created() {
    this.form.season = this.currentSeason(this.currentTeam)._id
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
  position: relative;
}
.form-wrapper-title {
  @include page-title();
  .form-wrapper-tag {
    @include tag-flat();
    color: $blue-grey;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 0;
  }
}
.form-card {
  @include card();
  padding: 40px 40px 30px 40px;
}
.form-card-title {
  @include title-card();
  text-align: center;
  text-transform: uppercase;
}
.form-title-text {
  @include flex-center();
  text-transform: uppercase;

  i {
    color: $blue-dark-medium;
    margin: 0 0 5px 5px;
    font-size: 18px;
  }
}
.form-header-brand {
  width: 50%;
  margin: 30px auto;
  text-align: center;
  p {
    text-align: center;
  }
  .brand-category {
    color: $grey-dark;
    font-weight: 300;
    font-size: 16px;
  }
  .brand-logo {
    width: 70px;
    height: 70px;
    margin: 0 auto;
  }
  .brand-date {
    color: $blue-dark-medium;
    margin-top: 15px;
    span {
      font-weight: 600;
      margin: 0 4px;
    }
  }
}

.form-header-custom {
  margin-top: 50px;
  .form-header {
    @include icon-logo-wrapper;
  }
  .form-header-title {
    text-align: center;
    font-weight: 500;
    margin-bottom: 40px;
    margin-top: 10px;
  }
}
.form-label-group {
  @include flex-space-between;
  height: 35px;
  .btn-m {
    margin-bottom: 5px;
  }
}
.form-btn-submit {
  padding: 20px 0;
  text-align: center;
}
.form-errors {
  text-align: center;
  color: $red;
}
.form-label {
  font-weight: 600;
  text-align: left;
  color: $blue-dark-medium;
  margin-bottom: 10px;
}

.el-form {
  padding: 0 25%;
}
.el-button {
  font-size: 14px;
}
.el-select {
  width: 100%;
}

@media only screen and (max-width: 479px) {
  .form-header-brand {
    width: 100%;
    .brand-logo {
      width: 60px;
      height: 60px;
    }
    .brand-date {
      font-size: 11px;
    }
  }
  .el-form {
    padding: 0;
  }
  .form-wrapper-title .form-wrapper-tag {
    display: none;
  }
  .el-select-dropdown.el-popper {
    left: 0 !important;
  }
  .select-option-left {
    font-size: 11px !important ;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .form-header-brand {
    width: 80%;
  }
  .el-form {
    padding: 0 10px;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .el-form {
    padding: 0 80px;
  }
}
</style>
