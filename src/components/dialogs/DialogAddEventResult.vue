<template lang="html">
  <div v-if="event">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()" :top="'5vh'">
      <div class="dialog-body">
       <h4 class="dialog-title">
         <span v-if="mode === 'edit'">{{$t('editResult')}}</span>
         <span v-else>{{$t('addResult')}}</span>
        </h4><br>
        <div class="dialog-subtitle">
          <event-category-icon :category="event.category" :competition="event.competition "/>
        </div>
        <p>{{ event.name }}</p>
        <div class="dialog-actions">
          <div>
            <transition name="fade" mode="out-in">
              <div v-if="!matchEventMode && !result">
                <span class="dialog-result-tag" @click="addResult('win')">
                   <i :class="classResultIcon('win')"></i>{{$tc('Win', 1)}}
                </span>
                <span class="dialog-result-tag" @click="addResult('draw')">
                  <i :class="classResultIcon('draw')"></i>{{$tc('Draw', 1)}}
                </span>
                <span class="dialog-result-tag" @click="addResult('lost')">
                  <i :class="classResultIcon('lost')"></i> {{$tc('Lost', 1)}}
                </span>
                 <div class="dialog-header-separator">
                  <span class="header-separator-line"></span>
                  <span class="header-separator-text">{{$t('or')}}</span>
                  <span class="header-separator-line"></span>
                </div>
              </div>
              <div v-else-if="matchEventMode && result">
                <span class="dialog-result-tag">
                  <i :class="classResultIcon(result)"></i>{{ formatResult(result) }}
                </span>
                <h5 class="dialog-score-title"><strong>{{$t('finalScore')}} :</strong></h5>
                <div class="dialog-actions-inputs"
                  :class="{'reverse': event.locationCategory === 'away'}">
                  <div class="inputs">
                    <p>{{$t('myTeam')}}</p>
                    <el-input-number v-model="scoreTeam" :min="0" :max="100" size="small"></el-input-number>
                  </div>
                  <div class="inputs">
                    <p>{{$t('opponent')}}</p>
                    <el-input-number v-model="scoreOpponent" :min="0" :max="100" size="small"></el-input-number>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="!matchEventMode">
            <div class="dialog-actions-switch">
              <el-switch v-model="tournamentMode" :active-text="$t('tournament')" :inactive-text="$t('ranking')"></el-switch>
            </div>
            <el-select v-model="result" :placeholder="eventResultsList[0][$i18n.locale]">
              <el-option v-for="eventResult in eventResultsList"
                :value="eventResult[$i18n.locale]" :key="eventResult[$i18n.locale]"
                :label="eventResult[$i18n.locale]">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="dialog-footer" slot="footer">
        <div v-if="readyToValidate">
          <el-button class="dialog-btn" type="default" 
            @click="dialogVisible = false">
            {{$t('cancel')}}
          </el-button>
          <el-button class="dialog-btn" type="success" 
            @click="validateResult()" :loading="isLoading">
            {{$t('validate')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import dataForms from '@/data/forms.js'
import ApiEvents from '@/services/ApiEvents.js'
import EventCategoryIcon from '@/components/global/events/EventCategoryIcon'

export default {
  name: 'DialogAddEventResult',
  mixins: [utilities],
  props: ['openDialog', 'event', 'mode'],
  components: { EventCategoryIcon },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      result: null,
      matchEventMode: false,
      tournamentMode: false,
      scoreTeam: null,
      scoreOpponent: null,
      dataForms
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    eventResultsList() {
      if (this.tournamentMode) return dataForms.eventResults.tournament
      if (!this.tournamentMode) return dataForms.eventResults.championship
      return []
    },
    selectPlaceholder() {
      if (this.tournamentMode) return 'Vainqueur'
      if (!this.tournamentMode) return '1er'
      return []
    },
    readyToValidate() {
      if (this.matchEventMode)
        return (
          this.result && this.scoreTeam != null && this.scoreOpponent != null
        )
      return this.result
    }
  },
  methods: {
    ...mapActions(['initEvent']),
    addResult(result) {
      if (['win', 'draw', 'lost'].includes(result)) this.matchEventMode = true
      this.result = result
    },
    async validateResult() {
      this.isLoading = true
      const body = {
        result: this.result,
        scoreTeam: this.scoreTeam,
        scoreOpponent: this.scoreOpponent
      }
      try {
        const res = await ApiEvents.patch(this.event._id, body)
        if (res) this.getEvent(this.event._id)
      } catch (err) {
        this.errorNotify(err)
        this.$emit('closeDialog')
      }
    },
    async getEvent(id) {
      try {
        const event = (await ApiEvents.get(id)).data.event
        this.initEvent(event)
        this.isLoading = false
        this.$emit('closeDialog')
        this.$notify({
          title: this.$t('success'),
          message: this.$t('resultAdded'),
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }
    },
    resetForm() {
      ;(this.matchEventMode = false),
        (this.tournamentMode = false),
        (this.result = null)
      this.scoreTeam = null
      this.scoreOpponent = null
      this.isLoading = false
    }
  },
  watch: {
    openDialog() {
      this.dialogVisible = this.openDialog
    },
    dialogVisible() {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog')
        this.resetForm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  padding: 0px 25px 10px 25px;
  text-align: center;
  color: $blue-dark-medium;
  .dialog-title {
    @include flex-center();
    font-weight: bold;
    i {
      margin: 0 0 0 5px;
      font-size: 20px;
    }
  }
  .dialog-subtitle {
    @include flex-center();
  }
  p {
    text-align: center;
    font-size: 15px;
  }
  .el-input {
    width: 200px;
  }
}
.dialog-actions {
  padding: 20px 0;
  .dialog-actions-inputs {
    @include flex-center();
    .inputs {
      margin: 0 10px;
    }
    p {
      font-size: 13px;
    }
  }
  .dialog-actions-inputs.reverse {
    flex-direction: row-reverse;
  }
  .dialog-actions-switch {
    padding: 10px 0;
  }
  .dialog-result-tag {
    @include tag-flat-l();
    cursor: pointer;
    margin: 0 10px;
    transition: 0.3s all ease-out;
    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
  .dialog-score-title {
    margin: 30px 0;
  }
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}

.dialog-btn-result {
  padding: 9px 14px;
  font-size: 12px;
  border-radius: 30px;
}

.dialog-header-separator {
  width: 200px;
  margin: 20px auto;
  padding-top: 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  .header-separator-line {
    width: 100%;
    border-bottom: 1px solid $mystic;
  }
  .header-separator-text {
    width: 80px;
  }
}
.el-dialog__footer {
  padding: 20px;
}
</style>
