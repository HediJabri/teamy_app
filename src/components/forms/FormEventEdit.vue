<template lang="html">
  <div v-if="event" class="form-wrapper">
    <div class="form-header">
      <h5>{{ $t('editEvent') }}</h5>
     <button-delete-event :event="event">
       <span class="form-header-tag">{{ $t('delete') }}</span>
     </button-delete-event>
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
              <p>{{ $t(event.competition.category) }}</p>
            </div>
            <h5 v-else-if="form.name === $t('other')" class="form-header-name">{{ otherCategory }}</h5>
            <h5 v-else class="form-header-name"> {{ form.name }}</h5>
            <hr>
          </div>
          <el-form :model="form" :rules="rules" ref="form">
             <div class="row">
              <div class="col-xs-12">
                <div class="form-label-group">
                  <p class="form-label form-label-small">{{ $t('eventName') }}</p>
                  <el-radio-group v-model="form.locationCategory">
                    <el-radio :label="'home'" >{{$t('atHome')}}</el-radio>
                    <el-radio :label="'away'">{{$t('away')}}</el-radio>
                  </el-radio-group>
                </div>
                <el-form-item prop="name">
                  <el-select v-model="form.name" :placeholder="$t('addEventName')">
                    <el-option v-for="category in eventCategories"
                      :label="$t(category)" :value="$t(category)" :key="$t(category)">
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
              <div class="col-xs-12" v-if="event.category !== 'training'">
                <el-form-item prop="opponent">
                  <div class="form-opponent">
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
                <el-form-item prop="location">
                  <div class="form-label-group">
                    <p class="form-label">{{ $t('eventLocation') }}</p>
                    <button-add-location :team="currentTeam" :category="form.locationCategory" 
                      @created="locationCreated($event)">
                      <el-button class="btn-m" type="primary">
                        <span>{{ $t('addLocation') }}<i class="fa fa-plus-circle margin-left"></i></span>
                      </el-button>
                    </button-add-location>
                  </div>
                  <el-select v-model="form.location" filterable :placeholder="$t('selectLocation')">
                    <el-option v-for="location in teamLocations"
                      :label="location.name" :value="location._id" :key="location._id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-12">
                <p class="form-label form-label-small">{{$t('date')}} {{$t('and')}} {{$t('eventTime')}}</p>
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
                    <el-select v-model="form.time" :placeholder="$t('time')">
                      <i slot="prefix" class="el-input__icon el-icon-time"></i>
                      <el-option v-for="time in formData.timeList"
                        :label="time[$i18n.locale]" :value="time[$i18n.locale]" :key="time[$i18n.locale]">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
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
              <el-button class="btn-back"
                type="default"
                @click="toggleForm()">
                {{$t('back')}}
              </el-button>
              <el-button type="success"
                class="btn-large"
                :loading="isLoading"
                @click="submitForm('form')">
                <span>{{$t('editEvent')}}</span>
              </el-button>
            </div>
          </el-form>
        </div>
        <div v-if="hasErrors" class="form-errors">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
    </div>
    <dialog-edit-event
        :event="event"
        :openDialog="dialogEditEvent"
        @confirmEditEvent="editEvent($event)" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import data from '@/data/forms.js'
import ApiEvents from '@/services/ApiEvents.js'
import ButtonAddLocation from '@/components/buttons/events/ButtonAddLocation'
import ButtonDeleteEvent from '@/components/buttons/events/ButtonDeleteEvent'
import DialogEditEvent from '@/components/dialogs/DialogEditEvent'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'FormEventEdit',
  mixins: [utilities],
  components: {
    ButtonAddLocation,
    DialogEditEvent,
    ButtonDeleteEvent,
    EventCategoryIcon
  },
  data() {
    return {
      errors: [],
      formData: data,
      isLoading: false,
      eventCategories: null,
      otherCategory: null,
      competitionEventCategories: null,
      opponent: true,
      dialogEditEvent: false,
      form: {
        locationCategory: this.$t('atHome'),
        name: null,
        category: null,
        opponent: null,
        dateStart: '',
        time: null,
        location: null,
        timeAppointment: null,
        placeAppointment: null
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
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        time: [
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
    ...mapGetters(['currentUser', 'currentTeam', 'event']),
    hasErrors() {
      return this.errors.length > 0
    },
    teamLocations() {
      return this.currentTeam.locations
    }
  },
  methods: {
    ...mapActions(['initEvent']),
    openDialogEditEvent() {
      this.dialogEditEvent = true
    },
    locationCreated(location) {
      this.form.location = location._id
    },
    toggleForm() {
      this.$emit('toggleForm')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.openDialogEditEvent()
        } else {
          return false
        }
      })
    },
    async editEvent(action) {
      this.isLoading = true
      this.form.sendEmail = action
      if (this.form.name === this.$t('other'))
        this.form.name = this.otherCategory
      if (this.form.location._id) this.form.location = this.form.location._id
      try {
        const res = await ApiEvents.patch(this.event._id, this.form)
        if (res) this.getEvent(this.event._id)
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    async getEvent(id) {
      try {
        const event = (await ApiEvents.get(id)).data.event
        this.initEvent(event)
        this.isLoading = false
        this.$emit('toggleForm')
        this.$notify({
          title: this.$t('success'),
          message: this.$t('eventEdited'),
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    fillEventForm() {
      if (this.event) {
        // Refactor object destructuring ?
        this.form.name = this.event.name
        this.form.category = this.event.category
        this.form.dateStart = this.event.dateStart
        this.form.time = this.event.time
        this.form.location = this.event.location._id
        this.form.locationCategory = this.event.locationCategory
        this.form.opponent = this.event.opponent
        this.form.timeAppointment = this.event.timeAppointment
        this.form.placeAppointment = this.event.placeAppointment
        this.event.opponent ? (this.opponent = true) : (this.opponent = false)
      }
    },
    fillCompetitionCategory() {
      for (let competitionType of this.formData.competitionCategories) {
        if (competitionType.category === this.event.competition.category) {
          this.eventCategories = competitionType.eventCategories
        }
      }
    }
  },
  created() {
    this.fillEventForm()
    if (this.event.competition) this.fillCompetitionCategory()
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
  text-align: left !important;
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

.form-opponent {
  text-align: left;
  span {
    margin-right: 5px;
  }
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
  .el-form {
    padding: 0;
  }
  .form-card {
    padding: 30px;
  }
  .form-date-time-separator {
    margin: 0 5px 22px 5px;
  }
  .form-header .form-header-tag {
    top: 65px;
    z-index: 9;
    @include tag-flat-s();
  }
  .el-select-dropdown.el-popper {
    left: 0 !important;
  }
  .el-select-dropdown__item {
    font-size: 11px !important ;
  }
  .btn-back {
    margin-bottom: 10px;
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
</style>
