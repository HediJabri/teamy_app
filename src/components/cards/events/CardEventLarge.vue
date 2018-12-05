<template lang="html">
  <div class="card" v-if="event">
    <div class="card-header">
      <div class="card-left">
        <div class="calendar-date">
          <div class="month">
            {{ formatEventMonth(event.dateStart) }}.
          </div>
          <h4 class="day">{{ formatEventDay(event.dateStart) }}</h4>
        </div>
      </div>
      <div class="card-right">
        <event-category-icon :category="event.category" :competition="event.competition "/>
      </div>
      <h5>{{ event.name }}</h5>
      <span class="time">
         {{ formatDay(event.dateStart) }} {{ event.time }}
         <span v-if="isAdmin(currentUser, event.team)" 
            class="icon-edit" @click="toggleForm()">
            <el-tooltip content="Modifier l'événement" placement="right" :open-delay="300">
              <i class="material-icons">settings</i>
            </el-tooltip>
          </span>
      </span>
    </div>
    <div class="card-body">
      <div class="text-item-opponent" v-if="event.opponent">
        <i v-if="event.locationCategory === 'home'" class="material-icons">home</i>
        <i v-else class="fa fa-plane"></i>
        <h5 class="text-item text-semi-bold">{{ event.opponent}}</h5>
      </div>
      <div v-if="event.competition">
        <span class="emoji">🏆 </span>
        <span class="text-item margin-right">{{ event.competition.name }}</span>
      </div>
      <div v-if="event.location">
        <span class="emoji">📍 </span>
        <span class="text-item">{{ event.location.name }}</span>
      </div>
      <div v-if="event.timeAppointment">
        <span class="emoji">🕚 </span>
        <span v-if="event.timeAppointment" class="text-item margin-right">
          Rdv {{ event.timeAppointment }} - 
        </span>
        <span v-if="event.placeAppointment" class="text-item">{{ event.placeAppointment }}</span>
      </div>
      <div class="event-participations">
        <span class="emoji">📢 </span>
        <span class="text-item">
          <span class="text-item-participations">Invitations :</span>
          {{ validatedParticipations }}
          <i class="fa fa-check-circle green"></i>
          {{ refusedParticipations }}
          <i class="fa fa-times-circle red"></i>
          {{ pendingParticipations }}
          <i class="fa fa-question-circle grey-medium"></i>
        </span>
      </div>
    </div>
    <div v-if="!eventIsPassed(event)" class="card-actions-wrapper">
      <div class="card-btn-invite">
        <el-button type="primary"
          v-if="isAdmin(currentUser, event.team)"
          @click="openDialogInviteEvent">
          {{$t('inviteMembers')}} <i class="fa fa-envelope margin-left"></i>
        </el-button>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="userParticipation && userParticipation.status === 'pending'"
          class="card-participation-response">
          {{ $t('availableForEvent')}}
          <div class="card-participation-actions">
            <el-button type="success" @click="updateParticipation('validated', userParticipation)">Oui</el-button>
            <el-button type="danger" @click="updateParticipation('refused', userParticipation)">Non</el-button>
          </div>
        </div>
        <div v-else-if="userParticipation && userParticipation.status === 'validated'"
          class="card-participation-response">
          <i class="fa fa-check-circle green"></i>
          {{ $t('youAccepted')}}<br>
          <span @click="updateParticipation('refused', userParticipation)">{{ $t('decline')}}</span>
        </div>
        <div v-else-if="userParticipation && userParticipation.status === 'refused'"
          class="card-participation-response">
          <i class="fa fa-times-circle red"></i>
          {{ $t('youDeclined')}}<br>
          <span @click="updateParticipation('validated', userParticipation)">{{ $t('accept')}}</span>
        </div>
      </transition>
    </div>
    <div v-else class="card-actions-wrapper">
      <event-result-info :event="event" :tagSize="'l'" :resultButton="true"
        v-on:openDialogAddEventResult="openDialogAddEventResult($event)" />
    </div>
    <div class="card-footer">
      <tabs-event />
    </div>
    <dialog-create-participations
      v-show="event"
      :team="event.team"
      :openDialog="dialogInviteEvent"
      @closeDialog="dialogInviteEvent = false" />
    <dialog-add-event-result
      v-show="event"
      :event="event" :mode="dialogEventResultMode"
      :openDialog="dialogAddEventResult"
      @closeDialog="dialogAddEventResult = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiParticipations from '@/services/ApiParticipations'
import DialogCreateParticipations from '@/components/dialogs/DialogCreateParticipations'
import DialogAddEventResult from '@/components/dialogs/DialogAddEventResult'
import EventResultInfo from '@/components/global/events/EventResultInfo'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'
import TabsEvent from '@/components/tabs/TabsEvent'

export default {
  name: 'CardEventLarge',
  mixins: [utilities],
  components: {
    DialogCreateParticipations,
    DialogAddEventResult,
    EventResultInfo,
    EventCategoryIcon,
    TabsEvent
  },
  data() {
    return {
      dialogInviteEvent: false,
      dialogAddEventResult: false,
      dialogEventResultMode: 'add'
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'event']),
    userParticipation() {
      return this.event.participations.find(
        p => p.user && p.user._id === this.currentUser._id
      )
    },
    validatedParticipations() {
      return this.event.participations.filter(p => p.status === 'validated')
        .length
    },
    refusedParticipations() {
      return this.event.participations.filter(p => p.status === 'refused')
        .length
    },
    pendingParticipations() {
      return this.event.participations.filter(p => p.status === 'pending')
        .length
    },
    compositionParticipations() {
      return this.event.participations.filter(p => p.status === 'validated')
    }
  },
  methods: {
    ...mapActions(['updateEventParticipation', 'removeNotification']),
    toggleForm() {
      this.$emit('toggleForm')
    },
    openDialogInviteEvent() {
      this.dialogInviteEvent = true
    },
    openDialogAddEventResult(mode) {
      mode === 'add'
        ? (this.dialogEventResultMode = 'add')
        : (this.dialogEventResultMode = 'edit')
      this.dialogAddEventResult = true
    },
    async updateParticipation(status, participation) {
      const oldStatus = participation.status
      const body = { status, user: this.currentUser._id }
      try {
        await ApiParticipations.patch(participation._id, body)
        participation.status = status
        this.updateEventParticipation(participation)
        if (oldStatus === 'pending')
          this.removeNotification({
            key: 'pendingParticipations',
            id: participation._id
          })
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 0 0;
}
.card-header {
  padding: 0 135px;
  position: relative;
  .card-left {
    text-align: center;
    position: absolute;
    left: 50px;
    top: 0;
    .calendar-date {
      @include calendar-date();
    }
  }
  .card-right {
    position: absolute;
    right: 50px;
    top: 0;
  }
  h5 {
    font-size: 17px;
    text-transform: uppercase;
    @include text-overflow-ellipsis();
    margin-top: 0;
    margin-bottom: 5px;
  }
  .time {
    color: $grey-dark;
    font-weight: 200;
    font-size: 22px;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    .icon-edit {
      margin-left: 8px;
      color: $text-grey-blue;
      cursor: pointer;
      i {
        font-size: 17px;
      }
    }
  }
}
.card-body {
  padding: 20px 135px;
  font-size: 13px;
  text-transform: capitalize;
  div {
    height: 40px;
    border-bottom: 1px solid $grey;
    @include emoji-text-wrapper();
    .emoji span:first {
      font-size: 15px;
    }
  }
  .event-participations i {
    margin: 0 10px 0 0;
    font-size: 15px;
  }
  .text-item-opponent {
    font-size: 15px;
    i {
      color: $blue-dark-medium;
      font-size: 18px;
      margin-right: 10px;
    }
    i.material-icons {
      font-size: 20px;
      margin: 0 10px 1px -2px;
    }
  }
  .text-item-participations {
    margin-right: 10px;
  }
}

.card-actions-wrapper {
  padding: 20px 0 40px 0;
  .card-btn-invite {
    @include flex-center();
    margin-bottom: 20px;
    i {
      font-size: 12px;
    }
  }
}

.card-participation-actions {
  margin-top: 15px;
}

.card-participation-response {
  text-align: center;
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  span {
    @include tag-flat();
    cursor: pointer;
    margin: 10px;
    opacity: 0.7;
    transition: all 0.3s ease;
    display: inline-block;
    &:hover {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 479px) {
  .card-body {
    padding: 20px 15px;
    font-size: 12px;
    .step-item {
      display: none;
    }
  }
  .card-header {
    padding: 0 15px 0 65px;
    h5 {
      font-size: 13px;
    }
    .time {
      font-size: 16px;
      .icon-edit i {
        font-size: 14px;
      }
    }
    .card-right {
      display: none;
    }
    .card-left {
      left: 15px;
      .calendar-date {
        @include calendar-date-xs;
      }
    }
  }
  .card-actions-wrapper {
    font-size: 12px;
  }
  .card-participation-response span {
    @include tag-flat-s();
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .card-body {
    padding: 20px 60px;
  }
  .card-header {
    padding: 0 105px;
    .card-left {
      left: 35px;
    }
    .card-right {
      right: 35px;
    }
  }
}
</style>
