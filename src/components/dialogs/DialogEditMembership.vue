<template lang="html">
  <div v-if="team && membership">
    <el-dialog title="" :visible.sync="dialogVisible" size="small" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <h4 class="dialog-title">
          Modifier le profil
        </h4>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-position="labelPosition">
        <p class="form-label">Rôle</p>
        <el-form-item prop="category">
          <el-select v-model="form.category" placeholder="Selectionnes une categorie">
            <el-option v-for="category in categories" :label="formatMemberCategory(category)" :value="category" :key="category">
              <span>{{ formatMemberCategory(category) }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <p class="form-label">Poste</p>
        <el-form-item prop="position">
          <el-input v-model="form.position"
            :placeholder="placeholderPosition">
          </el-input>
        </el-form-item>
        <div class="dialog-buttons">
          <el-button class="dialog-btn" type="default"
          @click="closeDialog()">
            Annuler
          </el-button>
          <el-button class="dialog-btn" type="success"
            @click="submitForm('form')" :loading="isLoading">
            <span>Valider</span>
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main'
import { utilities } from '@/mixins/utilities.js'
import ApiMemberships from '@/services/ApiMemberships.js'

export default {
  name: 'DialogEditMembership',
  mixins: [utilities],
  props: ['openDialog', 'team', 'membership'],
  data () {
    return {
      dialogVisible: false,
      isLoading: false,
      categories: ['player', 'staff'],
      form: { category: 'player', position: null },
      rules: {
        category: [
          { required: true, message: 'Ce champ est obligatoire', trigger: 'change' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    placeholderPosition () {
      let placeholder
      this.form.category === 'player' ? placeholder = 'Attaquant, Défenseur...' : placeholder = 'Coach, Dirigeant...'
      return placeholder
    }
  },
  methods: {
    ...mapActions(['initUser', 'updateUserMembership']),
    closeDialog () {
      this.$emit('closeDialog')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editMembership()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async editMembership () {
      this.isLoading = true
      try {
        const membership = (await ApiMemberships.patch(this.membership._id, this.form)).data
        this.isLoading = false
        this.updateUserMembership(membership)
        this.closeDialog()
        this.$notify({ title: 'Succès', message: 'Le profil a bien été modifié', type: 'success' })
        eventBus.$emit('showTeamCard')
        eventBus.$emit('reloadTeamShow')
      } catch (err) {
        this.isLoading = false
        this.errorNotify(err)
      }
    },
    resetForm () {
      this.form.category = 'player'
      this.form.position = null
    },
    fillMembershipForm () {
      this.resetForm()
      this.form.category = this.membership.category
      if (this.membership.position) this.form.position = this.membership.position
    }
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
      this.fillMembershipForm()
    },
    dialogVisible () {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog')
      }
    }
  },
  created () {
    if (this.membership) this.fillMembershipForm()
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  padding: 0px 25px 10px 25px;
  text-align: center;
  color: $blue-dark-medium;
  .dialog-title {
    @include flex-center;
    font-weight: bold;
  }
}
.dialog-buttons {
  @include flex-center;
  margin-top: 40px;
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}

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
</style>
