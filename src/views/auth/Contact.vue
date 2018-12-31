<template>
  <div>
    <div class="card">
      <div class="header">
        <h4>Contact 👋</h4>
        <p v-html="$t('contactUsSentence')"></p>
      </div>
      <el-form 
        class="form-body" :model="form" :rules="rules" 
        ref="form" label-position="labelPosition">
        <el-form-item prop="email">
          <el-input :placeholder="$t('email')" type="email" v-model="form.email">
          </el-input>
        </el-form-item>
        <el-form-item prop="message">
          <el-input type="textarea" :rows="4" v-model="form.message" 
            :placeholder="`${$t('leaveYourMessageHere')}...`">
          </el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="success"
            class="form-btn"
            :loading="isLoading"
            @click="submitForm('form')">
            {{$t('send')}}
          </el-button>
        </el-form-item>
      </el-form>
      <div v-if="hasErrors">
        <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
      </div>
    </div>
    <div class="footer">
      <router-link to="/register" class="link">{{$t('signUp')}}</router-link>
      <router-link to="/login" class="link">{{$t('login')}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiUsers from '@/services/ApiUsers.js'

export default {
  name: 'Contact',
  mixins: [utilities],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('fieldRequired')))
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
      form: {
        email: '',
        message: ''
      },
      rules: {
        email: [
          { validator: validatePass, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        message: [{ validator: validatePass, trigger: 'blur' }]
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
          this.sendMessage()
        } else {
          return false
        }
      })
    },
    async sendMessage() {
      this.isLoading = true
      try {
        const body = {
          content: this.form.message,
          email: this.form.email,
          user: null,
          sender: null
        }
        await ApiUsers.sendMessage(body)
        this.isLoading = false
        this.$emit('closeDialog')
        this.form.message = ''
        this.form.email = ''
        this.$notify({
          title: this.$t('success'),
          message: this.$t('messageSent'),
          type: 'success'
        })
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
      }
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
  margin: 10px 0;
  text-align: center;
  p {
    margin: 20px 0;
    /deep/ span {
      font-weight: 600;
    }
  }
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

.form-body {
  margin-top: 20px;
}

.form-btn {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 25px;
  line-height: 20px;
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
