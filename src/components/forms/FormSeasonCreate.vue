<template lang="html">
  <div v-if="team">
    <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
      <el-form-item prop="name">
        <p class="form-label">Saison</p>
        <el-input placeholder="2018-2019" v-model="form.name">
        </el-input>
      </el-form-item>
      <el-form-item prop="dateStart">
        <p class="form-label">Date de début</p>
        <el-date-picker
          type="date"
          format="dd-MM-yyyy"
          placeholder="Date"
          v-model="form.dateStart"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="dateEnd">
        <p class="form-label">Date de fin</p>
        <el-date-picker
          type="date"
          format="dd-MM-yyyy"
          placeholder="Date"
          v-model="form.dateEnd"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="displayStatus" prop="currentSeason">
        <span class="form-label radio-label">Saison Actuelle</span>
        <el-radio-group v-model="form.currentSeason">
          <el-radio :label="true">Oui</el-radio>
          <el-radio :label="false">Non</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="form-submit">
        <el-button v-if="backButton" class="form-btn" type="default" @click="backAction()">
          Retour
        </el-button>
        <el-button class="form-btn" type="success" @click="submitForm('form')" :loading="isLoading">
          Valider
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import ApiSeasons from '@/services/ApiSeasons.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'FormSeasonCreate',
  mixins: [utilities],
  props: ['team', 'displayStatus', 'backButton'],
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        dateStart: '',
        dateEnd: '',
        currentSeason: false
      },
      rules: {
        name: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'blur' }
        ],
        dateStart: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'blur' }
        ],
        dateEnd: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    backAction () {
      this.resetForm()
      this.$emit('backAction')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createSeason()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async createSeason () {
      this.isLoading = true
      this.form.team = this.team._id
      this.form.dateStart = moment(this.form.dateStart).format()
      this.form.dateEnd = moment(this.form.dateEnd).format()
      try {
        const season = (await ApiSeasons.post(this.form)).data.season
        this.seasonCreated(season)
      } catch (err) {
        this.impossibleActionNotify()
      }
    },
    seasonCreated (season) {
      this.resetForm()
      this.$emit('seasonCreated', season)
    },
    resetForm () {
      this.isLoading = false
      this.form.name = ''
      this.form.dateStart = ''
      this.form.dateEnd = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 300px;
  margin: 15px auto;
}

.el-select {
  width: 100%;
}

.radio-label {
  float: left;
}

.form-label {
  text-align: left;
  margin-bottom: -5px;
  span {
    font-weight: 400 !important;
    font-size: 13px !important;
  }
}

.form-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.form-submit {
  @include flex-center();
  margin-top: 30px;
}

@media only screen and (max-width: 479px) {
  .el-form-item {
    width: 220px;
  }
}
</style>
