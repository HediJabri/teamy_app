<template lang="html">
  <div v-if="team">
    <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
      <p class="form-label">{{$t('role')}}</p>
      <el-form-item prop="category">
        <el-select v-model="form.category">
          <el-option v-for="category in categories" :label="$t(category)" :value="category" :key="category">
          </el-option>
        </el-select>
      </el-form-item>
      <p class="form-label">{{$t('position')}}</p>
      <el-form-item prop="position">
        <el-input v-model="form.position"
          :placeholder="placeholderPosition">
        </el-input>
      </el-form-item>
      <div class="form-buttons">
        <el-button class="form-btn" type="default"
          v-if="backButton" @click="closeDialog()">
          {{$t('cancel')}}
        </el-button>
        <el-button class="form-btn" type="success"
          @click="submitForm('form')" :loading="isLoading">
          <span v-if="backButton">{{$t('sendRequest')}}</span>
          <span v-else>{{$t('validate')}}</span>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiMemberships from '@/services/ApiMemberships.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'FormRoleSelect',
  mixins: [utilities],
  props: ['team', 'validatedMembership', 'backButton'],
  data() {
    return {
      isLoading: false,
      categories: ['player', 'staff'],
      form: { category: 'player', position: null },
      rules: {
        category: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
    placeholderPosition() {
      let placeholder
      this.form.category === 'player'
        ? (placeholder = this.$t('playerPlaceholderPosition'))
        : (placeholder = this.$t('staffPlaceholderPosition'))
      return placeholder
    }
  },
  methods: {
    ...mapActions(['initUser', 'addUserMembership', 'updateUserMembership']),
    closeDialog() {
      this.$emit('closeDialog')
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validatedMembership
            ? this.createValidatedMembership()
            : this.createMembership()
        } else {
          return false
        }
      })
    },
    userHasMembership(membership) {
      return this.currentUser.memberships.find(m => m._id === membership._id)
    },
    async createMembership() {
      this.isLoading = true
      const body = {
        user: this.currentUser._id,
        team: this.team._id,
        category: this.form.category,
        position: this.form.position
      }
      try {
        const membership = (await ApiMemberships.post(body)).data
        this.userHasMembership(membership)
          ? this.updateUserMembership(membership)
          : this.addUserMembership(membership)
        this.isLoading = false
        this.$emit('membershipCreated')
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
      }
    },
    async createValidatedMembership() {
      try {
        const body = {
          user: this.currentUser._id,
          team: this.team._id,
          token: this.team.teamToken,
          category: this.form.category,
          position: this.form.position
        }
        const membership = (await ApiMemberships.postValidated(body)).data
        if (membership) {
          this.userHasMembership(membership)
            ? this.updateUserMembership(membership)
            : this.addUserMembership(membership)
          this.isLoading = false
          this.$emit('membershipCreated')
        }
      } catch (err) {
        this.$router.push(`/team/${this.team._id}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 300px;
  margin: 15px auto;
}
.el-form-item {
  width: 300px;
  margin: 15px auto;
}
.el-select {
  width: 100%;
}
.form-label {
  text-align: left;
  margin-bottom: -5px;
  span {
    font-weight: 400 !important;
    font-size: 13px !important;
  }
}
.form-buttons {
  padding-top: 20px;
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
    width: 250px;
    margin: 15px 0;
  }
}
</style>
