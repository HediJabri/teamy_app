<template lang="html">
  <div v-if="event" class="form-wrapper">
    <div class="form-header">
      <h5>modifier l'évenement</h5>
      <span class="form-header-tag"
        @click="openDialogDeleteEvent">
        Supprimer
      </span>
    </div>
    <div class="form-card">
      <div class="form-body">
        <div class="row">
          <div class="form-card-header">
            <div class="form-header-logo">
              <event-category-icon :category="event.category" :competition="event.competition" />
            </div>
            <div v-if="event.competition">
              <h5>{{ event.competition.name }}</h5>
              <p>{{ formatCompetition(event.competition.category) }}</p>
            </div>
            <h5 v-else-if="form.name === 'Autre'" class="form-header-name">{{ otherCategory }}</h5>
            <h5 v-else class="form-header-name"> {{ form.name }}</h5>
            <hr>
          </div>
          <el-form :model="form" :rules="rules" ref="form">
             <div class="row">
              <div class="col-xs-12">
                <div class="form-label-group">
                  <p class="form-label form-label-small">Nom de l'évenement</p>
                  <el-radio-group v-model="form.locationCategory">
                    <el-radio label="Domicile"></el-radio>
                    <el-radio label="Extérieur"></el-radio>
                  </el-radio-group>
                </div>
                <el-form-item prop="name">
                  <el-select v-model="form.name" placeholder="Ajouter le nom de l'évenement">
                    <el-option v-for="category in eventCategories"
                      :label="category" :value="category" :key="category">
                      <span>{{ category }}</span>
                    </el-option>
                    <el-option :label="'Autre'" :value="'Autre'" :key="'Autre'">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.name === 'Autre'">
                  <el-input v-model="otherCategory" placeholder="Autre nom d'évenement">
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-xs-12" v-if="event.category !== 'training'">
                <el-form-item prop="opponent">
                  <div class="form-opponent">
                    <span class="form-label">Adversaire</span>
                    <el-switch v-model="opponent"></el-switch>
                  </div>
                  <transition name="fade" mode="out-in">
                    <el-input v-if="opponent" v-model="form.opponent"
                      placeholder="Nom de l'équipe adverse">
                    </el-input>
                  </transition>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <el-form-item prop="location">
                  <div class="form-label-group">
                    <p class="form-label">Lieu de l'événement</p>
                    <el-button class="btn-m" type="primary" @click="openDialogAddLocation()" >
                      <span>Ajouter un lieu<i class="fa fa-plus-circle margin-left"></i></span>
                    </el-button>
                  </div>
                  <el-select v-model="form.location" filterable placeholder="Séléctionner un lieu">
                    <el-option v-for="location in teamLocations"
                      :label="location.name" :value="location._id" :key="location._id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <p class="form-label form-label-small">Date et heure de l'événement</p>
                <div class="form-date-time-wrapper">
                  <el-form-item prop="dateStart">
                    <el-date-picker
                      type="date"
                      format="dd-MM-yyyy"
                      placeholder="Date du rdv"
                      v-model="form.dateStart"
                      style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                  <div class="form-date-time-separator"> - </div>
                  <el-form-item prop="time">
                     <el-time-select
                      v-model="form.time" :picker-options="{ start: '07:00', step: '00:15', end: '23:45' }"
                      placeholder="Heure du rdv"
                      style="width: 100%;">
                    </el-time-select>
                  </el-form-item>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <el-form-item prop="placeAppointment">
                  <p class="form-label">Point de rdv</p>
                  <el-input v-model="form.placeAppointment"
                    placeholder="Vestiaire, parking du stade...">
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-xs-12 col-sm-6">
                <el-form-item prop="timeAppointment">
                  <p class="form-label">Heure du rdv</p>
                  <el-time-select
                    v-model="form.timeAppointment" :picker-options="{ start: '07:00', step: '00:15', end: '23:45' }"
                    placeholder="Heure du rdv"
                    style="width: 100%;">
                  </el-time-select>
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
                <span>Modifier cet évenement</span>
              </el-button>
            </div>
          </el-form>
        </div>
        <div v-if="hasErrors" class="form-errors">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
    </div>
    <dialog-add-location
      v-show="currentTeam" :team="currentTeam"
      :openDialog="dialogAddLocation" :category="filterLocationCategory"
      v-on:locationCreated="locationCreated($event)"
      @closeDialog="dialogAddLocation = false" />
    <dialog-delete-event
      v-show="event"
      :event="event"
      :openDialog="dialogDeleteEvent"
      @closeDialog="dialogDeleteEvent = false" />
    <dialog-edit-event
      v-show="event"
      :event="event"
      :openDialog="dialogEditEvent"
      @confirmEditEvent="editEvent($event)" />
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import data from '@/data/forms.js'
import ApiEvents from '@/services/ApiEvents.js'
import DialogAddLocation from '@/components/dialogs/DialogAddLocation'
import DialogDeleteEvent from '@/components/dialogs/DialogDeleteEvent'
import DialogEditEvent from '@/components/dialogs/DialogEditEvent'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'FormEventEdit',
  mixins: [utilities],
  components: { DialogAddLocation, DialogEditEvent, DialogDeleteEvent, EventCategoryIcon },
  data () {
    var validateField = (rule, value, callback) => {
      if (value === '' || null) {
        callback(new Error('Ce champ est obligatoire'))
      } else {
        callback()
      }
    }
    return {
      errors: [],
      formData: data,
      isLoading: false,
      eventCategories: null,
      otherCategory: null,
      competitionEventCategories: null,
      opponent: true,
      dialogAddLocation: false,
      dialogDeleteEvent: false,
      dialogEditEvent: false,
      form: {
        locationCategory: 'Domicile',
        name: null,
        category: null,
        opponent: null,
        dateStart: '',
        time: '18:00',
        location: null,
        timeAppointment: null,
        placeAppointment: null,
      },
      rules: {
        name: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'change' }
        ],
        location: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'change' }
        ],
        dateStart: [
          { validator: validateField, trigger: 'blur' }
        ],
        time: [
          { validator: validateField, trigger: 'blur' }
        ],
        timeAppointment: [
          { validator: validateField, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'event']),
    hasErrors () {
      return this.errors.length > 0
    },
    filterLocationCategory () {
      let filter
      this.form.locationCategory === 'Domicile' ? filter = 'home' : filter = 'away'
      return filter
    },
    teamLocations () {
      return this.currentTeam.locations
    }
  },
  methods: {
    ...mapActions(['initEvent']),
    openDialogDeleteEvent () {
      this.dialogDeleteEvent = true
    },
    openDialogEditEvent () {
      this.dialogEditEvent = true
    },
    openDialogAddLocation() {
      this.dialogAddLocation = true
    },
    locationCreated(location) {
      this.form.location = location._id
    },
    toggleForm () {
      this.$emit('toggleForm')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.openDialogEditEvent()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async editEvent (action) {
      this.isLoading = true
      this.form.sendEmail = action
      this.form.dateStart = moment(this.form.dateStart).format()
      this.form.locationCategory = this.filterLocationCategory
      if (this.form.name === 'Autre') this.form.name = this.otherCategory
      if (this.form.location._id) this.form.location = this.form.location._id
      try {
        const res = await ApiEvents.patch(this.event._id, this.form)
        if (res) this.getEvent(this.event._id)
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    async getEvent (id) {
      try {
        const event = (await ApiEvents.get(id)).data.event
        this.initEvent(event)
        this.isLoading = false
        this.$emit('toggleForm')
        this.$notify({ title: 'Succès', message: "L'évenement a bien été modifié", type: 'success' })
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    fillEventForm () {
      if (this.event) {
        this.form.name = this.event.name
        this.form.category = this.event.category
        this.form.dateStart = this.event.dateStart
        this.form.time = this.event.time
        this.form.location = this.event.location._id
        this.form.locationCategory = this.event.locationCategory === 'home' ? 'Domicile' : 'Extérieur'
        this.form.opponent = this.event.opponent
        this.form.timeAppointment = this.event.timeAppointment
        this.form.placeAppointment = this.event.placeAppointment
        this.event.opponent ? this.opponent = true : this.opponent = false
      }
    },
    fillCompetitionCategory() {
      for (let competitionType of this.formData.competitionCategories) {
        if (competitionType.name === this.event.competition.category) {
          this.eventCategories = competitionType.eventCategories
        }
      }
    },
    fillEventCategories() {
      if (this.eventCategory === 'friendly') this.form.name = 'Match Amical'
      if (this.eventCategory === 'training') this.form.name = 'Entrainement'
      if (this.eventCategory === 'other') this.form.name = 'Autre'
    }
  },
  created () {
    this.fillEventForm()
    this.event.competition ? this.fillCompetitionCategory() : this.fillEventCategories()    
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

.form-header {
  @include page-header();
  width: 95%;
  position: relative;
  .form-header-tag {
    @include tag-flat();
    color: $blue-grey;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.form-card {
  @include card();
  padding: 30px 40px;
}

.form-title {
  @include title-card();
  text-align: left;
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

.form-body {
  margin-bottom: 20px;
}

.form-card-header {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 10px;
  p { text-align: center; }
  .form-header-logo { @include flex-center(); }
  .form-header-name { height: 18px; margin-top: 0; }
}

.form-label { text-align: left!important; margin-bottom: 10px; height: 30px;}
.form-label-group { @include flex-space-between();  height: 35px; .btn-m { margin-bottom: 5px; } }
.form-label-small { height: 20px;}
.form-custom { margin-top: 60px; }
.form-other-category { margin-top: 20px; }
.form-date-time-wrapper {
  @include flex-center();
  margin-top: 5px;
  margin-left: -5px;
}
.form-date-time-separator {
  margin: 0 10px 22px 10px;
}
.form-event-time-wrapper {
  margin-top: 10px;
  margin-left: -5px;
}

.form-opponent {
  text-align: left;
  span { margin-right: 5px }
}

.form-btn-submit {
  padding-top: 10px;
  text-align: center;
}

.form-errors {
  text-align: center;
  color: $red;
}

// Form
.el-form {
  padding: 0 140px;
}

.form-label {
  font-weight: 600;
  text-align: center;
  color: $blue-dark-medium;
  margin-bottom: 10px;
  position: relative;
}

.el-button {
  font-size: 14px;
}

.el-select {
  width: 100%;
}

@media only screen and (max-width: 479px) {
  .el-form { padding: 0; }
  .form-card { padding: 30px; }
  .form-date-time-separator { margin: 0 5px 22px 5px; }
  .form-header .form-header-tag { top: 65px;  z-index: 9; @include tag-flat-s() }
  .el-select-dropdown.el-popper { left: 0!important }
  .el-select-dropdown__item { font-size: 11px!important ; }
  .btn-back { margin-bottom: 10px }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .el-form { padding: 0 10px; }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .el-form { padding: 0 80px; }
}
</style>
