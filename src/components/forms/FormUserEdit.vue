<template lang="html">
  <div class="form-user-wrapper" 
    :class="{'onbording-mode': onbordingMode}">
    <div class="form-user-card">
      <div class="form-user-title" v-if="!onbordingMode">
        <h5 class="uppercase">mon compte</h5>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
        <div>
          <p class="form-user-avatar-label" >
            <i class="material-icons">account_circle</i>
            <span>Photo de profil</span>
          </p>
          <image-upload
            :preview="true"
            @photoUploaded="addUserAvatar($event)"
            @photoIsLoading="photoIsLoading = $event" />
          <div v-if="!onbordingMode" class="row">
            <div class="col-xs-6">
              <el-form-item prop="firstName">
                <el-input placeholder="Prénom" v-model="form.firstName"></el-input>
              </el-form-item>
            </div>
            <div class="col-xs-6">
              <el-form-item prop="lastName">
                <el-input placeholder="Nom" v-model="form.lastName"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <el-form-item prop="phone">
              <el-input placeholder="Numéro de téléphone" v-model="form.phone"></el-input>
            </el-form-item>
          </div>
          <div class="col-xs-12 col-sm-6">
            <el-form-item prop="birthdate">
              <el-date-picker
                type="date"
                format="dd-MM-yyyy"
                placeholder="Date de naissance"
                v-model="form.birthdate"
                style="width: 100%;"
                :default-value="defaultBirthdate">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="form-user-btn-submit">
          <el-button v-if="!onbordingMode" type="success" 
            class="btn-xl" :class="{'disabled': photoIsLoading}"
            :loading="isLoading" @click="submitForm('form')" >
            Modifier mes infos
          </el-button>
           <el-button v-else type="primary" 
            class="btn-xl btn-onbording-mode" :class="{'disabled': photoIsLoading}"
            :loading="isLoading" @click="submitForm('form')" >
            Valider mes infos
          </el-button>
        </div>
      </el-form>
      <div v-if="hasErrors" class="form-user-errors">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
    </div>
    <div class="form-user-bottom" @click="openDialogDeleteAccount()"
      v-if="!onbordingMode">
      Suprimer mon compte
    </div>
    <dialog-delete-account
      v-show="currentUser"
      :openDialog="dialogDeleteAccount"
      @closeDialog="dialogDeleteAccount = false" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiUsers from '@/services/ApiUsers.js'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import ImageUpload from '@/components/global/ImageUpload'
import DialogDeleteAccount from '@/components/dialogs/DialogDeleteAccount'

export default {
  name: 'FormUserEdit',
  mixins: [utilities],
  props: ['onbordingMode'],
  components: { ImageUpload, DialogDeleteAccount },

  data() {
    var validatePhone = (rule, value, callback) => {
      function validatePhone(phone) {
        // eslint-disable-next-line no-useless-escape
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(phone)
      }
      if (!validatePhone(value)) {
        callback(new Error('Numéro invalide'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      dialogDeleteAccount: false,
      photoIsLoading: false,
      labelPosition: 'top',
      defaultBirthdate: new Date(90, 0),
      errors: [],
      form: {
        avatar: null,
        firstName: '',
        lastName: '',
        birthdate: '',
        phone: null
      },
      rules: {
        firstName: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        birthdate: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('fieldRequired'),
            trigger: 'blur'
          },
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      formData: formData
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    hasErrors() {
      return this.errors.length > 0
    }
  },
  methods: {
    ...mapActions(['initUser']),
    openDialogDeleteAccount() {
      this.dialogDeleteAccount = true
    },
    fillFormUser() {
      if (this.currentUser) {
        this.form.avatar = this.currentUser.avatar
          ? this.currentUser.avatar
          : null
        this.form.firstName = this.currentUser.firstName
        this.form.lastName = this.currentUser.lastName
        this.form.birthdate = this.currentUser.birthdate
          ? this.currentUser.birthdate
          : null
        this.form.phone = this.currentUser.phone ? this.currentUser.phone : null
      }
    },
    addUserAvatar(url) {
      this.form.avatar = url
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editUser()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async editUser() {
      this.isLoading = true
      try {
        await ApiUsers.put(this.currentUser._id, this.form)
        this.onbordingMode ? this.$emit('infosValidated') : this.getUser()
      } catch (err) {
        this.impossibleActionNotify(err)
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
    afterRequestSucceed(user) {
      this.initUser(user)
      this.isLoading = false
      this.$router.push('/')
      const notifMessage = 'Les infos de ton compte ont bien été modifiées'
      this.$notify({ title: 'Succès', message: notifMessage, type: 'success' })
    }
  },
  created() {
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
    padding: 10px 20px 0px 20px;
    border: none;
    box-shadow: none;
    margin-bottom: 5px;
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
  padding-top: 24px;
  text-align: center;
}
.form-user-errors {
  text-align: center;
  color: $red;
}
.form-user-select-left {
  float: left;
}
.form-user-select-right {
  float: right;
  line-height: 10px !important;
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
  .form-user-card {
    padding: 80px 20px 30px 20px;
  }
  .col-xs-6 {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
