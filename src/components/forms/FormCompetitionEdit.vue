<template lang="html">
  <div class="form-wrapper">
    <div class="form-wrapper-title">
      <h5>modifier la compétition</h5>
    </div>
    <div class="form-card">
      <div class="form-card-title">
        <h5>{{ competition.name }}</h5>
      </div>
      <div class="row">
        <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <div class="row">
            <div class="form-header-custom">
              <div class="col-xs-12">
                <div class="form-header">
                  <i class="fa fa-trophy"></i>
                </div>
                <p class="form-header-title">{{ competition.season.name }}</p>
              </div>
              <div class="col-xs-12">
                <p class="form-label">Type de compétition</p>
                <el-form-item prop="category">
                  <el-select v-model="form.category" placeholder="Type de compétition">
                    <el-option v-for="competition in formData.competitionCategories"
                      :label="competition.name" :value="competition.category" :key="competition.category">
                      <span>{{ competition.name }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="col-xs-12">
            <p class="form-label">Nom de la compétition</p>
             <el-form-item prop="name">
                <el-input placeholder="Nom de la compétition" v-model="form.name">
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-btn-submit">
            <el-button class="btn-back"
              type="default"
              @click="toggleForm()">
              Retour
            </el-button>
            <el-button type="success"
              class="btn-large"
              :loading="isLoading"
              @click="submitForm('form')">
              <span>Modifier la compétition</span>
            </el-button>
          </div>
        </el-form>
      </div>
      <div v-if="hasErrors" class="form-errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
    </div>
     <dialog-delete-competition
      v-show="competition"
      :competition="competition"
      :openDialog="dialogDeleteCompetition"
      @closeDialog="dialogDeleteCompetition = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import dataForms from '@/data/forms.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'
import DialogDeleteCompetition from '@/components/dialogs/DialogDeleteCompetition'

export default {
  name: 'FormCompetitionEdit',
  mixins: [utilities],
  props: ['competition'],
  components: { DialogDeleteCompetition },
  data () {
    var validateField = (rule, value, callback) => {
      if (value === '' || null) {
        callback(new Error('Ce champ est obligatoire'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      formData: dataForms,
      dialogDeleteCompetition: false,
      labelPosition: 'top',
      infosPlaceholder: 'Ligue du mardi, Saison 2017...',
      errors: [],
      form: {
        name: null,
        category: null,
        infos: null,
        image: null,
      },
      rules: {
        name: [
          { validator: validateField, trigger: 'blur' }
        ],
        category: [
          { validator: validateField, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    hasErrors () {
      return this.errors.length > 0
    },
  },
  methods: {
    toggleForm () {
      this.$emit('toggleForm')
    },
    openDialogDeleteCompetition () {
      this.dialogDeleteCompetition = true
    },
    fillFormCompetition () {
      this.form.name = this.competition.name
      this.form.category = this.competition.category
      this.form.image = this.competition.image
      this.form.infos = this.competition.infos
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editCompetition()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
     async editCompetition() {
      this.isLoading = true
      try {
        await ApiCompetitions.patch(this.competition._id, this.form)
        this.isLoading = false
        this.$notify({ title: 'Succès', message: 'La compétition a bien été modifiée', type: 'success' })
        this.$emit('reloadCompetition')
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
        this.toggleForm()
      }     
    }
  },
  created () {
    this.fillFormCompetition()
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
  width: 90%;
  margin: 30px auto;
  text-align: center;
  p { text-align: center; }
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
.el-form {
  padding: 0 25%;
}
.form-header-custom {
  margin-top: 50px;
  .form-header { @include icon-logo-wrapper();}
  .form-header-title { 
    text-align: center;
    font-weight: 500;
    margin-bottom: 40px; 
    margin-top: 10px; 
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
  text-align: center;
  color: $blue-dark-medium;
  margin-bottom: 10px;
}
.el-button {
  font-size: 14px;
  margin-bottom: 10px;
}
.el-select {
  width: 100%;
}

@media only screen and (max-width: 479px) {
  .form-header-brand { 
    width: 100%;
    .brand-logo { width: 60px; height: 60px;}
    .brand-date { font-size: 11px; }
  }
  .el-form { padding: 0; }
  .form-wrapper-title .form-wrapper-tag { display: none; }
  .el-select-dropdown.el-popper { left: 0!important }
  .select-option-left { font-size: 11px!important ; }
  .btn-back { margin-bottom: 10px }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .form-header-brand { width: 80%; }
  .el-form { padding: 0 10px; }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .form-header-brand { width: 80%; }
  .el-form { padding: 0 120px; }
}

</style>
