<template lang="html">
  <div v-if="team">
    <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
      <el-form-item prop="name">
        <p class="form-label">Nom du lieu</p>
        <el-input placeholder="Stade, Urban, Gymnase..." v-model="form.name">
        </el-input>
      </el-form-item>
      <el-form-item>
        <p class="form-label form-label-small">Adresse du lieu <span> (optionnel)</span></p>
        <input-search-places v-on:addLocationGeoloc="addLocationGeoloc($event)"/>
      </el-form-item>
      <el-form-item v-if="!formatTeamLocation(team)" prop="mainLocation">
        <span class="form-label radio-label">Lieu domicile de l'équipe ?</span>
        <el-radio-group v-model="form.mainLocation">
          <el-radio :label="true">Oui</el-radio>
          <el-radio :label="false">Non</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="form-submit">
        <el-button v-if="backButton" class="form-btn" type="default" @click="backAction()">
          Retour
        </el-button>
        <el-button class="form-btn" type="success" @click="submitForm('form')" :loading="isLoading">
          Ajouter
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiLocations from '@/services/ApiLocations.js'
import { utilities } from '@/mixins/utilities.js'
import InputSearchPlaces from '@/components/global/InputSearchPlaces'

export default {
  name: 'FormLocationCreate',
  mixins: [utilities],
  props: ['team', 'category', 'mainLocation', 'backButton'],
  components: { InputSearchPlaces },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        mainLocation: false,
        geolocalisation: null
      },
      rules: {
        name: [
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
          this.createLocation()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async createLocation () {
      this.isLoading = true
      const locationAddress = document.querySelector('#form-input-location').value
      const body = {
        name: this.form.name,
        mainLocation: this.form.mainLocation,
        address: locationAddress ? locationAddress : ' ',
        geolocalisation: this.form.geolocalisation,
        category: this.category,
        team: this.team._id
      }
      try {
        const location = (await ApiLocations.post(body)).data.location
        this.locationCreated(location)
      } catch (err) {
        this.impossibleActionNotify()
      }
    },
    addLocationGeoloc (geolocalisation) {
      this.form.geolocalisation = geolocalisation
    },
    locationCreated (location) {
      this.resetForm()
      this.$emit('locationCreated', location)
    },
    resetForm () {
      this.isLoading = false
      this.form.name = ''
      document.querySelector('#form-input-location').value = null
    }
  },
  created () {
    if (!this.formatTeamLocation(this.team)) this.form.mainLocation = true
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  width: 300px;
  margin: 15px auto;
}
.el-input {
  width: 300px;
}
.form-label-small {
  height: 20px !important;
}
.form-label {
  height: 30px;
  text-align: left;
  margin-bottom: 5px;
}
.radio-label {
  float: left;
}
.el-radio-group {
  float: left;
  margin-top: 5px;
}
.form-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.form-submit {
  @include flex-center();
  margin-top: 30px;
}
</style>
