<template>
  <div v-if="event">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <div class="card-filter">
          <div class="card-filter-title">
            <div class="card-filter-title-text">
              <h5>invitations</h5>
              <h5 class="card-invitations-count">{{ event.participations.length }}</h5>
            </div>
          </div>
          <div class="card-filter-body">
            <div class="card-filter-list-item"
              v-for="filter in filters" :key="filter.id"
              @click="toggleFilter(filter)"
              :class="classFilter(filter)">
              <div class="list-item-body">
                <p class="list-item-body-top">{{ filter.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="card-responses" v-if="participationsFiltered">
          <div class="card-title">
            <div class="card-title-text">
              <h5>{{ currentFilter.title }}</h5>
              <h5 class="card-count">{{ participationsFiltered.length }}</h5>
            </div>
          </div>
          <div class="card-body"
            v-if="participationsFiltered.length">
            <div class="card-list-item" v-if="participation.user"
              v-for="(participation, index) in participationsFiltered" :key="index"
              @click="toggleParticipationDialog(participation)">
              <div class="list-item-content">
                <div class="list-item-img avatar">
                  <img v-if="participation.user.avatar" :src="participation.user.avatar">
                  <img v-else src="../../assets/img/user.png">
                </div>
                <span v-if="isMainAdmin(participation.user, event.team)" class="list-item-badge"><i class="material-icons">stars</i></span>
                <div class="list-item-body">
                  <p class="list-item-body-top">
                    {{ participation.user.firstName }} {{ participation.user.lastName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-show-participation
      :mode="'invitations'"
      v-show="participationShowed"
      :participation="participationShowed"
      :openDialog="dialogShowParticipation"
      @closeDialog="toggleParticipationDialog($event)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogShowParticipation from '@/components/dialogs/DialogShowParticipation'

export default {
  name: 'TabsEventInvitations',
  mixins: [utilities],
  components: { DialogShowParticipation },
  data () {
    return {
      filters: [
        { id: 1, title: 'En attente', name: 'pending', border: 'blue' },
        { id: 2, title: 'Acceptés', name: 'validated', border: 'green' },
        { id: 3, title: 'Refusés', name: 'refused', border: 'red' },
      ],
      currentFilter: { id: 1, title: 'En attente', name: 'pending', border: 'blue' },
      participationShowed: null,
      dialogShowParticipation: false
    }
  },
  computed: {
    ...mapGetters(['event']),
    participationsFiltered () {
      return this.event.participations.filter(p => p.status === this.currentFilter.name)
    }
  },
  methods: {
    toggleParticipationDialog (participation) {
      this.dialogShowParticipation = !this.dialogShowParticipation
      this.participationShowed = participation
    },
    classFilter (filter) {
      return {
        'active': filter.id === this.currentFilter.id,
        'border-green': filter.border === 'green',
        'border-red': filter.border === 'red',
        'border-blue': filter.border === 'blue'
      }
    },
    toggleFilter (filter) {
      this.currentFilter = filter
    }
  },
  created() {
    if (!this.eventIsMatchCategory(this.event)) this.currentFilter = this.filters[1]
  }
}
</script>

<style lang="scss" scoped>

.card-filter {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-filter-title {
  @include title-card();
  .card-filter-title-text {
    @include flex-start();
    text-transform: uppercase;
    position: relative;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 1px 0;
      font-size: 14px;
    }
    .card-invitations-count {
      position: absolute;
      right: 10px;
      top: 0;
    }
  }
}
.card-filter-body {
  margin-top: 22px;
}
.card-filter-list-item {
  @include list-item-s();
    border-left: 5px solid transparent;
}
.card-filter-list-item.border-red.active,
.card-filter-list-item.border-red:hover {
  border-left: 5px solid $red;
}
.card-filter-list-item.border-green.active,
.card-filter-list-item.border-green:hover {
  border-left: 5px solid $green;
}
.card-filter-list-item.border-blue.active,
.card-filter-list-item.border-blue:hover {
  border-left: 5px solid $blue;
}

.card-responses {
  @include card();
  background-color: $ghost-white;
  box-shadow: none;
  padding: 30px 0 10px 0;
  font-size: 13px;
  .card-title {
    @include title-card();
    background: $ghost-white;
    border-top: none;
    // border-bottom: none;
    .card-title-text {
      @include flex-start();
      text-transform: uppercase;
      position: relative;
      // h5 { font-weight: 600; }
      i {
        margin: 0 10px 1px 0;
        font-size: 18px;
      }
      .card-count {
        position: absolute;
        right: 10px;
        top: 0;
      }
    }
  }
  .card-body {
    margin-top: 22px;
  }
  .card-list-item {
    @include list-item-s();
    background: $ghost-white;
    &:hover {
      background: $ghost-white;
    }
  }
  .card-empty-item {
    height: 80px;
    margin-top: 30px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: italic;
    color: $text-grey-light;
    i {
      color: $red;
    }
  }
}

@media only screen and (max-width: 479px) {
  .col-xs-12 { padding: 0 }
  .card-filter {
    font-size: 12px ;
    .card-filter-title-text h5 { font-size: 13px }
    .card-filter-list-item { padding: 10px; font-size: 12px; }
  }
  .card-responses {
    font-size: 12px ;
    .card-title-text h5 { font-size: 13px }
    .card-list-item { padding: 10px; font-size: 12px; }
  }
}
</style>
