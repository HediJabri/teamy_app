<template lang="html">
  <div class="form-wrapper">
    <div class="form-header">
      <h5>{{ $t('newEvent') }}</h5>
    </div>
    <div class="form-card">
      <div class="form-body">
        <div class="row">
          <div class="form-card-header">
            <div class="form-header-logo">
              <event-category-icon :category="eventCategory" :competition="competition" />
            </div>
            <div v-if="competition">
              <h5>{{ competition.name }}</h5>
              <p>{{ $t(competition.category) }}</p>
            </div>
            <h5 v-else-if="form.name === $t('other')" class="form-header-name">{{ otherCategory }}</h5>
            <h5 v-else class="form-header-name"> {{ form.name }}</h5>
            <hr>
          </div>
          <el-form :model="form" :rules="rules" ref="form">
            <div class="row">
              <div class="col-xs-12">
                <div class="form-label-group form-label-column">
                  <p class="form-label form-label-small">{{ $t('eventName') }}</p>
                  <el-radio-group v-model="form.locationCategory">
                    <el-radio :label="'home'" >{{$t('atHome')}}</el-radio>
                    <el-radio :label="'away'">{{$t('away')}}</el-radio>
                  </el-radio-group>
                </div>
                <el-form-item prop="name">
                  <el-select v-model="form.name" :placeholder="$t('addEventName')">
                    <el-option v-for="category in eventCategories"
                      :label="$t(category)" :value="$t(category)" :key="category">
                    </el-option>
                    <el-option :label="$tc('Other', 1)" :value="$tc('Other', 1)" :key="$tc('Other', 1)">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.name === $t('other')">
                  <el-input v-model="otherCategory" :placeholder="$t('eventName')">
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-xs-12" v-if="eventCategory !== 'training'">
                <el-form-item prop="opponent">
                  <div class="form-item-left">
                    <span class="form-label">{{$t('opponent')}}</span>
                    <el-switch v-model="opponent"></el-switch>
                  </div>
                  <transition name="fade" mode="out-in">
                    <el-input v-if="opponent" v-model="form.opponent"
                      :placeholder="$t('opponentName')">
                    </el-input>
                  </transition>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <el-form-item prop="recurring">
                  <div class="form-item-left">
                    <span class="form-label">{{$t('recurringEvent')}}</span>
                    <el-switch v-model="form.recurring"></el-switch>
                  </div>
                </el-form-item>
              </div>
              <div class="col-xs-12" v-if="form.recurring">
                <div class="row">
                  <div class="col-xs-12 col-sm-6">
                    <el-form-item prop="periodStart">
                      <el-date-picker
                        type="date"
                        format="dd-MM-yyyy"
                        :placeholder="$t('startDate')"
                        v-model="form.periodStart"
                        style="width: 100%;">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <el-form-item prop="time">
                      <el-select v-model="form.time" :placeholder="$t('time')">
                        <i slot="prefix" class="el-input__icon el-icon-time"></i>
                        <el-option v-for="time in formData.timeList"
                          :label="time[$i18n.locale]" :value="time[$i18n.locale]" :key="time[$i18n.locale]">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                     <el-form-item prop="periodEnd">
                      <el-date-picker
                        type="date"
                        format="dd-MM-yyyy"
                        :placeholder="$t('endDate')"
                        v-model="form.periodEnd"
                        style="width: 100%;">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="col-xs-12 col-sm-6">
                    <el-form-item prop="recurrence">
                      <el-select v-model="form.recurrence" :placeholder="$t('recurrenceType')">
                        <el-option v-for="category in recurrenceCategories"
                          :label="category.title" :value="category.value" :key="category.value">
                          <span>{{ category.title }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="col-xs-12">
                    <el-form-item prop="recurentDays">
                      <p class="form-label">{{$t('recurrenceDays')}}</p>
                      <el-checkbox-group v-model="form.recurentDays">
                        <el-checkbox v-for="day in recurrenceDaysList" :key="day.value"
                          :value="day.value" :label="day.value" name="type" border size="mini">
                          {{ day[$i18n.locale] }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div v-else class="col-xs-12">
                <p class="form-label form-label-small">{{$t('date')}} {{$t('and')}} {{$t('eventTime')}}</p>
                <div class="form-date-time-wrapper">
                  <el-form-item prop="dateStart">
                    <el-date-picker
                      type="date"
                      format="dd-MM-yyyy"
                      :placeholder="$t('date')"
                      v-model="form.dateStart"
                      style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                  <div class="form-date-time-separator"> - </div>
                  <el-form-item prop="time">
                    <el-select v-model="form.time" :placeholder="$t('time')">
                      <i slot="prefix" class="el-input__icon el-icon-time"></i>
                      <el-option v-for="time in formData.timeList"
                        :label="time[$i18n.locale]" :value="time[$i18n.locale]" :key="time[$i18n.locale]">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="col-xs-12">
                <el-form-item prop="location">
                  <div class="form-label-group">
                    <p class="form-label">{{ $t('eventLocation') }}</p>
                    <el-button class="btn-m" type="primary" @click="openDialogAddLocation()" >
                      <span>{{ $t('addLocation') }}<i class="fa fa-plus-circle margin-left"></i></span>
                    </el-button>
                  </div>
                  <el-select v-model="form.location" filterable :placeholder="$t('selectLocation')">
                    <el-option v-for="location in teamLocations"
                      :label="location.name" :value="location._id" :key="location._id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-12 col-sm-6">
                <el-form-item prop="placeAppointment">
                  <p class="form-label">{{ $t('meetingPoint') }}</p>
                  <el-input v-model="form.placeAppointment"
                    :placeholder="$t('meetingPointPlaceholder')">
                  </el-input>
                </el-form-item>
              </div>
              <div class="col-xs-12 col-sm-6">
                <el-form-item prop="timeAppointment">
                  <p class="form-label">{{$t('meetingTime')}}</p>
                  <el-select v-model="form.timeAppointment" :placeholder="$t('time')">
                    <i slot="prefix" class="el-input__icon el-icon-time"></i>
                    <el-option v-for="time in formData.timeList"
                      :label="time[$i18n.locale]" :value="time[$i18n.locale]" :key="time[$i18n.locale]">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="form-btn-submit">
              <el-button type="success"
                class="btn-large"
                :loading="isLoading"
                @click="submitForm('form')">
                <span>{{$t('createEvent')}}</span>
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
      :openDialog="dialogAddLocation" :category="form.locationCategory"
      v-on:locationCreated="locationCreated($event)"
      @closeDialog="dialogAddLocation = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import data from '@/data/forms.js'
import ApiEvents from '@/services/ApiEvents.js'
import DialogAddLocation from '@/components/dialogs/DialogAddLocation'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'FormEventCreate',
  mixins: [utilities],
  props: ['eventCategory', 'competition'],
  components: { DialogAddLocation, EventCategoryIcon },
  data() {
    return {
      errors: [],
      formData: data,
      isLoading: false,
      eventCategories: null,
      otherCategory: null,
      competitionEventCategories: null,
      opponent: true,
      dialogAddLocation: false,
      recurrenceCategories: [{ title: this.$t('weekly'), value: 'weekly' }],
      recurrenceDaysList: data.recurrenceDaysList,
      form: {
        locationCategory: 'home',
        name: null,
        category: null,
        opponent: null,
        dateStart: null,
        time: null,
        location: null,
        timeAppointment: null,
        placeAppointment: null,
        team: null,
        competition: null,
        recurring: false,
        recurrence: 'weekly',
        recurentDays: [],
        periodStart: null,
        periodEnd: null
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        location: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        dateStart: [
          {
            type: 'date',
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        time: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        periodStart: [
          {
            type: 'date',
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        periodEnd: [
          {
            type: 'date',
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ],
        recurentDays: [
          {
            type: 'array',
            required: true,
            message: 'Choisis au moins un jour de récurrence',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'currentTeamLocation']),
    hasErrors() {
      return this.errors.length > 0
    },
    teamLocations() {
      return this.currentTeam.locations
    }
  },
  methods: {
    openDialogAddLocation() {
      this.dialogAddLocation = true
    },
    locationCreated(location) {
      this.form.location = location._id
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newLocationName ? this.createLocation() : this.createEvent()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    createEvent() {
      this.form.recurring
        ? this.createRecurrentEvent()
        : this.createUniqueEvent()
    },
    async createUniqueEvent() {
      this.isLoading = true
      this.formatForm()
      try {
        const event = (await ApiEvents.post(this.form)).data.event
        this.isLoading = false
        this.$notify({
          title: this.$t('success'),
          message: this.$t('eventCreated'),
          type: 'success'
        })
        this.$router.push(`/team/${this.currentTeam._id}/event/${event._id}`)
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    async createRecurrentEvent() {
      this.isLoading = true
      this.formatForm()
      try {
        await ApiEvents.postRecurrent(this.form)
        this.isLoading = false
        this.$notify({
          title: this.$t('success'),
          message: this.$t('eventsCreated'),
          type: 'success'
        })
        this.$router.push(`/team/${this.currentTeam._id}/events`)
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    formatForm() {
      this.form.team = this.currentTeam._id
      this.form.season = this.currentSeason(this.currentTeam)._id
      if (this.competition) this.form.competition = this.competition._id
      if (this.form.location._id) this.form.location = this.form.location._id
      if (this.form.name === this.$t('other'))
        this.form.name = this.otherCategory
    },
    fillCompetitionCategory() {
      for (let competitionType of this.formData.competitionCategories) {
        if (competitionType.category === this.competition.category) {
          this.eventCategories = competitionType.eventCategories
        }
      }
    },
    fillEventCategories() {
      this.form.name = this.$t(this.eventCategory)
    }
  },
  created() {
    this.competition
      ? this.fillCompetitionCategory()
      : this.fillEventCategories()
    if (this.currentTeamLocation)
      this.form.location = this.currentTeamLocation._id
    this.form.category = this.eventCategory
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
  text-transform: capitalize;
  p {
    text-align: center;
  }
  .form-header-logo {
    @include flex-center();
  }
  .form-header-name {
    height: 18px;
    margin-top: 0;
  }
}

.form-label {
  text-align: left;
  margin-bottom: 10px;
  height: 30px;
}
.form-label-group {
  @include flex-space-between();
  height: 35px;
  .btn-m {
    margin-bottom: 5px;
  }
}
.form-label-small {
  height: 20px;
}
.form-custom {
  margin-top: 60px;
}
.form-other-category {
  margin-top: 20px;
}
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
.form-players-number {
  @include flex-start();
}
.form-item-left {
  text-align: left;
  span {
    margin-right: 10px;
  }
}
.form-btn-submit {
  padding-top: 20px;
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
.el-button {
  font-size: 14px;
}
.el-select {
  width: 100%;
}
.el-checkbox {
  margin-left: 10px !important;
}

@media only screen and (max-width: 479px) {
  .el-form {
    padding: 0;
  }
  .form-card {
    padding: 30px;
  }
  .form-card-header img {
    width: 60px;
    height: 60px;
  }
  .form-date-time-separator {
    margin: 0 5px 22px 5px;
  }
  .el-select-dropdown.el-popper {
    left: 0 !important;
  }
  .el-select-dropdown__item {
    font-size: 11px !important ;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .el-form {
    padding: 0 10px;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .el-form {
    padding: 0 80px;
  }
}

@media only screen and (max-width: 1160px) {
  .form-label-column {
    flex-direction: column-reverse;
    align-items: flex-start;
    height: 55px;
  }
}
</style>
