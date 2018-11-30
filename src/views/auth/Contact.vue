<template lang="html">
  <div class="banner">
    <div class="banner-wrapper">
      <div class="banner-logo-wrapper">
        <a href="https://www.teamy.co">
          <img src="../../assets/img/teamy-logo-white.jpg" class="logo">
        </a>
      </div>
      <div class="card">
        <div class="header">
          <h4>Contact 👋</h4>
          <p>Tu as <span>une question ?</span> Laisse nous <span>ton email et ton message</span>, on te répond au plus vite ! </p>
        </div>
        <el-form class="form-body" :model="form" :rules="rules" ref="form" label-position="labelPosition">
          <el-form-item prop="email">
            <el-input placeholder="Email" type="email" v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="message">
            <el-input type="textarea" :rows="5" v-model="form.message" placeholder="Ecris ton message ici...">
            </el-input>
          </el-form-item>
          <!-- <hr> -->
          <el-form-item class="text-center">
            <el-button type="success"
              class="btn-send"
              :loading="isLoading"
              @click="submitForm('form')">
              Envoyer
            </el-button>
          </el-form-item>
        </el-form>
        <div v-if="hasErrors">
          <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
        </div>
      </div>
       <div class="banner-footer">
        <router-link to="/register" class="link">Inscription</router-link>
        <router-link to="/login" class="link">Connexion</router-link>
      </div>
    </div>
    <br> 
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiUsers from '@/services/ApiUsers.js'

export default {
  name: 'Contact',
  mixins: [utilities],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Ce champ est obligatoire'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      function validateEmail (email) {
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
        message: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
    ...mapActions(['initUser']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendMessage()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async sendMessage() {
      this.isLoading = true
      try {
        const body = { content: this.form.message, email: this.form.email, user: null, sender: null }
        await ApiUsers.sendMessage(body)
        this.isLoading = false
        this.$emit('closeDialog')
        this.form.message = ''
        this.form.email = ''
        this.$notify({ title: 'Succès', message: "Le message a bien été envoyé", type: 'success' })
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
      }     
    }
  }
}
</script>

<style lang="scss" scoped>

.banner {
  background-image: linear-gradient(to bottom, #1F69BD , $blue);
  min-height: 100vh;
  @include flex-center();
}

.banner-logo-wrapper {
  @include flex-center();
  margin-bottom: 30px;
  a { cursor: pointer; }
  .logo {
    height: 40px;
  }
}

.banner-footer {
  padding: 15px 0;
  color: $ghost-white;
  @include flex-center();
  .link {
    font-weight: 600;
    margin-left: 20px;
    color: $ghost-white;
  }
}

.card {
  width: 425px;
  background: white;
  padding: 25px 45px;
  border-radius: 3px;
  @include box-shadow();
}

.btn-send {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 25px;
  line-height: 20px;
}

.header {
  margin: 10px 0;
  text-align: center;
  p { margin: 20px 0; }
  span { font-weight: 600 }
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

.form-body {
  margin-top: 20px;
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
    .btn-send {
      font-size: 13px;
      padding: 7px 20px;
    }
    .el-input { font-size: 13px; }
    .el-input__inner { height: 34px;}
    .el-form-item__error { font-size: 11px;}
    .error-message { font-size: 13px; }
  }
}

</style>
