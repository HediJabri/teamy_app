<template lang="html">
  <div class="form-user-wrapper" 
    v-if="currentUser.local">
    <div class="form-user-card">
      <div class="form-user-title">
        <h5 class="uppercase">email</h5>
      </div>
      <el-form :model="formEmail" :rules="rulesEmail" ref="formEmail" label-position="labelPosition">
        <div class="row">
          <div class="col-xs-12">
          <!-- <p class="form-user-avatar-label"><span>Email</span></p> -->
            <el-form-item prop="email">
              <el-input placeholder="Email" v-model="formEmail.email"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-user-btn-submit">
          <el-button type="success" class="btn-xl" 
            :loading="isLoading" @click="submitForm('formEmail')">
            Modifier mon email
          </el-button>
        </div>
      </el-form>
      <div v-if="hasErrors" class="form-user-errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
    </div>
     <div class="form-user-card">
      <div class="form-user-title">
        <h5 class="uppercase">mot de passe</h5>
      </div>
      <el-form :model="formPassword" :rules="rulesPassword" ref="formPassword" label-position="labelPosition">
        <div class="row">
          <div class="col-xs-12">
            <!-- <p class="form-user-avatar-label"><span>Ancien mot de passe</span></p> -->
            <el-form-item prop="oldPassword">
              <el-input type="password" v-model="formPassword.oldPassword" 
                placeholder="Ancien mot de passe"></el-input>
            </el-form-item>
          </div>
           <div class="col-xs-12">
            <!-- <p class="form-user-avatar-label"><span>Nouveau mot de passe</span></p> -->
            <el-form-item prop="newPassword">
              <el-input type="password" v-model="formPassword.newPassword" 
                placeholder="Nouveau mot de passe"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-user-btn-submit">
          <el-button type="success" class="btn-xl" 
            :loading="isLoading" @click="submitForm('formPassword')">
            Modifier
          </el-button>
        </div>
      </el-form>
      <div v-if="hasErrors" class="form-user-errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import ApiUsers from '@/services/ApiUsers.js'
import { utilities } from '@/mixins/utilities.js'
import TagPosition from '@/components/global/TagPosition'

export default {
  name: 'FormUserAccount',
  mixins: [utilities],
  components: { TagPosition },
  data () {
    var validateField = (rule, value, callback) => {
      if (value === '' || null) {
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
    var validatePassLength = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('8 charactères minimum'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      labelPosition: 'top',
      errors: [],
      formEmail: {
        email: '',
      },
      formPassword: {
        oldPassword: '',
        newPassword: '',
      },
      rulesEmail: {
        email: [
          { validator: validateField, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' } 
        ],
      },
      rulesPassword: {
        oldPassword: [
          { validator: validateField, trigger: 'blur' },
          { validator: validatePassLength, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateField, trigger: 'blur' },
          { validator: validatePassLength, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    hasErrors () {
      return this.errors.length > 0
    }
  },
  methods: {
     ...mapActions(['initUser']),
    fillFormUser () {
      if (this.currentUser) {
        this.formEmail.email = this.currentUser.local && this.currentUser.local.email
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editUser(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async editUser(formName) {
      this.isLoading = true
      try {
        let body 
        if (formName === 'formPassword') body =  { oldPassword: this.formPassword.oldPassword, newPassword: this.formPassword.newPassword }
        if (formName === 'formEmail') body = { local: { email: this.formEmail.email } }
        await ApiUsers.patchAccount(this.currentUser._id, body)
        this.getUser()
      } catch (err) {
        console.log(err)
        this.$notify({ title: 'Erreur', message: 'Mot de passe invalide', type: 'error' })
        this.isLoading = false
      }     
    },
    async getUser() {
      try {
        const user = (await ApiUsers.get(this.currentUser._id)).data.user
        this.afterRequestSucceed(user)
      } catch (err) {
        this.errorNotify(err)
        this.isLoading = false
      }     
    },
    afterRequestSucceed (user) {
      this.initUser(user)
      this.isLoading = false
      this.$router.push('/')
      const notifMessage =  'Ton compte a bien été modifié'
      this.$notify({ title: 'Succès', message: notifMessage, type: 'success' })
    }
  },
  created () {
    this.fillFormUser()
  }
}
</script>

<style lang="scss" scoped>

.form-user-wrapper {
  width: 100%;
  margin: 0px auto;
  padding: 0 0 60px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.form-user-title {
  @include title-card();
  text-align: center;
}
.form-user-card {
  @include card();
  padding: 80px 40px 30px 40px;
}

.form-user-wrapper.onbording-mode {
  padding: 0;
  .form-user-card {
    padding: 30px 20px 0px 20px;
    border: none;
    box-shadow: none;
  }
}

.form-user-title-text {
  @include flex-center();
  text-transform: uppercase;
  i {
    color: $blue-dark-medium;
    margin: 0 0 5px 5px;
    font-size: 18px;
  }
}
.form-user-avatar-label {
  @include flex-start();
  color: $nepal;
  i {
    margin: 0 5px 1px 0;
    font-size: 20px;
  }
}
.form-user-btn-submit {
  padding-top: 10px;
  text-align: center;
}
.form-user-errors {
  text-align: center;
  color: $red;
}
.form-user-select-left {
  float: left
}
.form-user-select-right {
  float: right;
  line-height: 10px!important;
  margin-top: 8px;
}
.form-user-bottom {
  color: $blue-grey;
  cursor: pointer;
  transition: all ease 0.4s;
  &:hover {
    color: $blue-dark;
  }
}
// Element UI
.el-button {
  font-size: 14px;
}
.el-select {
  width: 100%;
}


@media only screen and (max-width: 479px) {
  .form-user-card { padding: 80px 20px 30px 20px; }
  .col-xs-6 { padding-right: 5px; padding-left: 5px }
}

</style>
