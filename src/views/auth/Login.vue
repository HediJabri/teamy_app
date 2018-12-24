<template>
  <div>
    <div class="card">
      <div class="header">
        <button-fb-auth v-on:AuthWithFb="loginWithFb($event)" :text="$t('login')"/>
        <div class="header-separator">
          <span class="header-separator-line"></span>
          <span class="header-separator-text">{{ $t('or')}}</span>
          <span class="header-separator-line"></span>
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
        <el-form-item prop="email">
          <el-input :placeholder="$t('email')" type="email" 
            v-model="form.email" @keyup.enter.native="submitForm('form')">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :placeholder="$t('password')" type="password" 
            v-model="form.password" @keyup.enter.native="submitForm('form')">
          </el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="success"
            class="form-btn"
            :loading="isLoading"
            @click="submitForm('form')">
            {{$t('login')}}
          </el-button>
        </el-form-item>
      </el-form>
      <div v-if="hasErrors">
        <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
      </div>
    </div>
    <div class="footer">
      <span>{{ $t('noAccountYet') }}</span>
      <router-link to="/register" class="link">
        {{ $t('signUp') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Auth from '@/services/Auth.js'
import ButtonFbAuth from '@/components/buttons/users/ButtonFbAuth'

export default {
  name: 'Login',
  components: { ButtonFbAuth },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('fieldRequired')))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      errors: [],
      labelPosition: 'top',
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
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
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      this.errors = []
      this.isLoading = true
      try {
        const res = await Auth.login(this.form)
        this.authUser(res.data)
      } catch (err) {
        this.errors.push('Email ou mot de passe invalide')
        this.isLoading = false
      }
    },
    async loginWithFb(token) {
      this.errors = []
      this.isLoading = true
      try {
        const res = await Auth.loginWithFb({ access_token: token })
        this.authUser(res.data)
      } catch (err) {
        this.errors.push('Connexion Impossible')
        this.isLoading = false
      }
    },
    authUser(data) {
      Auth.setToken(data.token)
      Auth.setUser(data.user)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 425px;
  background: white;
  padding: 25px 45px;
  border-radius: 3px;
  @include box-shadow();
}

.header {
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

.form-btn {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 25px;
  line-height: 20px;
}

.footer {
  padding: 15px 0;
  color: $ghost-white;
  @include flex-center();
  .link {
    font-weight: 600;
    margin-left: 10px;
    color: $ghost-white;
  }
}

.error-message {
  text-align: center;
  color: $red;
}

@media only screen and (max-width: 480px) {
  .card {
    width: 260px;
    padding: 25px 25px 15px 25px;
    margin: 0 auto;
    .form-btn {
      font-size: 13px;
      padding: 7px 20px;
    }
    .el-input {
      font-size: 13px;
    }
    .el-input__inner {
      height: 34px;
    }
    .el-form-item__error {
      font-size: 11px;
    }
    .error-message {
      font-size: 13px;
    }
  }
}
</style>
