<template lang="html">
  <div>
    <div class="card">
      <div class="card-team" v-if="team">
        <div class="card-team-logo">
          <div class="logo-wrapper">
            <img v-if="team.logo" :src="team.logo">
            <i v-else class="fa fa-shield blue"></i>
          </div>
        </div>
        <h5>{{ team.name }}</h5>
          <div class="card-team-info" v-if="teamMembershipsIsFull(team)">
          <span>{{ $t(teamMembershipsIsFull) }}</span>
        </div>
        <div v-else class="card-team-info">
          <div class="avatar">
            <img v-if="team.mainAdmin.avatar" :src="team.mainAdmin.avatar">
            <img v-else src="../../assets/img/user.png">
          </div>
          <span>{{ team.mainAdmin.firstName }} {{ $t(inviteYouToJoinHisTeam) }} </span>
        </div>
      </div>
      <div class="header-social-auth">
        <button-fb-auth v-on:AuthWithFb="registerWithFb($event)" :text="$t('signUp')"/>
        <div class="header-separator">
          <span class="header-separator-line"></span>
          <span class="header-separator-text">{{ $t('or') }}</span>
          <span class="header-separator-line"></span>
        </div>
      </div>
      <el-form :model="registerForm" :rules="rulesRegister" ref="registerForm" label-position="labelPosition" class="demo-ruleForm">
        <div class="row">
          <div class="col-xs-6 col-left">
            <el-form-item prop="firstName">
              <el-input :placeholder="$t('firstName')" type="firstName" v-model="registerForm.firstName">
              </el-input>
            </el-form-item>
          </div>
          <div class="col-xs-6 col-right">
            <el-form-item prop="lastName">
              <el-input :placeholder="$t('lastName')" type="lastName" v-model="registerForm.lastName">
              </el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item prop="email">
          <el-input :placeholder="$t('email')" type="email" v-model="registerForm.email">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :placeholder="$t('password')" type="password" 
            v-model="registerForm.password" @keyup.enter.native="submitForm('registerForm')">
          </el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="success"
          class="btn-register"
          :loading="isLoading"
          @click="submitForm('registerForm')">
            {{$t('signUp')}}
          </el-button>
        </div>
      </el-form>
      <div v-if="hasErrors">
        <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
      </div>
    </div>
    <div class="banner-footer">
      <span>{{ $t('alreadyAnAccount') }}</span>
      <router-link to="/login" class="link">
        {{$t('login')}}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import Auth from '@/services/Auth.js'
import ButtonFbAuth from '@/components/buttons/ButtonFbAuth'
import ApiTeams from '@/services/ApiTeams.js'

export default {
  name: 'Register',
  mixins: [utilities],
  components: { ButtonFbAuth },
  data() {
    var validateInput = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('fieldRequired')))
      } else {
        callback()
      }
    }
    var validatePassLength = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('8 charactères minimum'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }
      if (!validateEmail(value)) {
        callback(new Error('Email invalide'))
      } else {
        callback()
      }
    }

    return {
      isLoading: false,
      errors: [],
      labelPosition: 'top',
      team: null,
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      rulesRegister: {
        firstName: [{ validator: validateInput, trigger: 'blur' }],
        lastName: [{ validator: validateInput, trigger: 'blur' }],
        email: [
          { validator: validateInput, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validateInput, trigger: 'blur' },
          { validator: validatePassLength, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    }
  },
  methods: {
    ...mapActions(['initUser']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async register() {
      this.errors = []
      this.isLoading = true
      try {
        this.registerForm.lang = this.$i18n.locale
        const res = await Auth.register(this.registerForm)
        this.authUser(res.data)
      } catch (err) {
        this.errors.push('Email ou mot de passe invalide')
        this.isLoading = false
      }
    },
    async registerWithFb(token) {
      this.errors = []
      this.isLoading = true
      try {
        const res = await Auth.registerWithFb({ access_token: token })
        this.authUser(res.data)
      } catch (err) {
        this.errors.push('Inscription Impossible')
        this.isLoading = false
      }
    },
    async getTeam(teamToken) {
      try {
        const team = (await ApiTeams.getByToken(teamToken)).data.team
        team.teamToken = teamToken
        this.team = team
        if (!this.teamMembershipsIsFull(team)) {
          Auth.setTeam(this.team)
        }
      } catch (err) {
        this.errorNotify(err)
      }
    },
    authUser(data) {
      Auth.setToken(data.token)
      Auth.setUser(data.user)
      this.$router.push('/')
    }
  },
  created() {
    const teamToken = this.$route.params.teamToken
    if (teamToken) this.getTeam(teamToken)
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-image: linear-gradient(to bottom, #1f69bd, $blue);
  min-height: 100vh;
  @include flex-center();
}

.banner-logo-wrapper {
  @include flex-center();
  margin: 20px;
  a {
    cursor: pointer;
    position: relative;
  }
  .logo {
    height: 40px;
  }
  .logo-tag {
    color: white;
    position: absolute;
    top: 0px;
    right: -28px;
  }
}

.banner-footer {
  padding: 15px 0;
  color: $ghost-white;
  @include flex-center();
  .link {
    font-weight: 600;
    margin-left: 10px;
    color: $ghost-white;
  }
}

.card {
  width: 425px;
  background: white;
  padding: 25px 45px;
  border-radius: 3px;
  @include box-shadow();
  h4 {
    text-align: center;
    color: $text-grey-dark;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.8px;
    margin-bottom: 30px;
  }
}
.card-team {
  text-align: center;
  margin-top: -15px;
  h5 {
    font-size: 16px;
  }
  .card-team-logo {
    width: 40px;
    height: 40px;
    margin: 10px auto;
    .logo-wrapper i {
      font-size: 30px;
      margin-top: 8px;
    }
  }
  .card-team-info {
    margin-bottom: 30px;
    text-align: center;
    font-size: 13px;
    .avatar {
      @include avatar();
      display: inline-block;
      margin-right: 6px;
    }
  }
  .card-team-city {
    display: flex;
    justify-content: center;
    color: $text-grey-blue;
    i {
      margin: 0 3px 2px 0;
      font-size: 18px;
    }
  }
}

.header-social-auth {
  padding-bottom: 15px;
  margin-bottom: 5px;
  text-align: center;
}

.header-separator {
  margin-top: 15px;
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

.btn-register {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 25px;
  line-height: 20px;
}

.error-message {
  margin-top: 10px;
  text-align: center;
  color: $red;
}

@media only screen and (max-width: 480px) {
  .card {
    width: 260px;
    padding: 25px;
    margin: 0 auto;
    .btn-register {
      font-size: 13px;
      padding: 7px 20px;
    }
    .col-left {
      padding-right: 5px;
    }
    .col-right {
      padding-left: 5px;
    }
    .el-input {
      font-size: 13px;
    }
    .el-input__inner {
      height: 34px;
    }
    .el-form-item {
      margin-bottom: 17px;
    }
    .el-form-item__error {
      font-size: 11px;
      height: 15px;
      overflow: hidden;
      line-height: 14px;
    }
    .error-message {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
