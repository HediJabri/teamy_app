<template lang="html">
  <div v-if="user">
    <el-dialog title="" :visible.sync="dialogVisible" :fullscreen="smallDevice()">
      <div class="dialog-body">
        <div class="dialog-content" v-if="$route.name === 'dashboard'">
          <h4 class="dialog-title">Tableau de bord 💻</h4>
          <p><span>Retrouve ici toute l'actualité de ton équipe: </span>événements, compétitions, nouveaux membres... 👀 </p>
          <p>Tu verras également <span>les événements du jour 🗓 </span> et <span>le prochain </span>pour lequel tu à été invité !</p>
          <p>Si tu es <span>le manager de ton équipe</span>, tu pourra directement <span>ajouter un nouvel événement </span>depuis cette page. </p>
        </div>
         <div class="dialog-content" v-else-if="$route.name === 'events-index'">
          <h4 class="dialog-title">Événements 🗓</h4>
          <p>Retrouve ici tous les événements de <span>ton équipe et de ton réseau</span> 👍</p>
          <p>Tu pourras accéder à <span>chaque événement </span>pour valider ✅ ou non ta participation.</p>
          <p>Si tu es le manager de ton équipe tu pourras <span>ajouter un nouvel événement et envoyer les invitations par mail 📩</span> aux membres de ton équipe et de ton réseau.</p>
        </div>
         <div class="dialog-content" v-else-if="$route.name === 'competitions-index'">
          <h4 class="dialog-title">Compétitions 🏆</h4>
          <p><span>Retrouve ici tous les compétitions</span> de ton équipe !</p>
          <p>Tu pourras accéder à <span>tous les événements et résultats de chaque compétition 🔍</span></p>
          <p>Si tu es le manager de ton équipe tu pourras <span>ajouter une nouvelle compétition 🏆</span> et y planifier les prochains matchs 🗓</p>
        </div>
         <div class="dialog-content" v-else-if="$route.name === 'network'">
          <h4 class="dialog-title">Réseau 🌐</h4>
          <p>Retrouve ici tous les joueurs et les équipes de ton réseau 👍</p>
          <p>❗️<span>Si un joueur de ton réseau est manager d'une équipe, celle ci se retrouvera automatiquement dans ton réseau.</span></p>
          <p>Tu y retrouvera également toutes les équipes que <span> tu as ajouté directement</span></p>
        </div>
         <div class="dialog-content" v-else-if="$route.name === 'community'">
          <h4 class="dialog-title">Communauté 👥</h4>
          <p>Retrouve ici <span>tous les joueurs et équipes </span> de la communauté Teamy.</p>
          <div v-if="currentTeam && isAdmin(currentUser, currentTeam)">
            <p>En tant que manager d’équipe, <span> tu peux ajouter de nouveaux joueurs à ton réseau 👍</span></p>
            <p>Cela te permettra de <span>les inviter pour tes matchs quand il te manques des joueurs </span>pour compléter ta compo ✅</p>
          </div>
          <div v-else-if="currentTeam">
            <p>Tu peux ajouter de <span>nouvelles équipes à ton réseau 👍</span></p>
            <p>Cela te permettra <span> d’être invité pour leurs matchs </span>quand ils seront en manques de joueurs </p>
          </div>
          <div v-else>
            <p>Si tu cherches à <span>devenir membre régulier d’une équipe</span>, clique sur l'équipe puis sur <span> "Voir l’équipe"</span> et envoie ta demande pour les rejoindre 👍</p>
            <p>Tu peux également ajouter de<span> nouvelles équipes à ton réseau.</span></p>
            <p>Cela te permettra <span>d'être invité pour leurs matchs </span>quand ils seront en manques de joueurs. </p>
          </div>
        </div>
        <div class="dialog-content" v-else-if="$route.name === 'team-show'">
          <h4 class="dialog-title">L'équipe 🌟</h4>
          <p>Retrouve ici toutes <span>les infos principales</span> de l’équipe:<br>Membres 👥, statistiques 📊 et palmarès 🏅</p>
          <div v-if="isAdminTeamFromRoute">
            <p>Tu pourras<span> modifier les infos</span> de ton équipe en cliquant sur le bouton ⚙️</p>
            <p>Tu pourras voir en détail<span> le profil de chaque membre 👤</span>le contacter par mail ou bien le retirer de l’équipe si tu le souhaites.</p>
          </div>
          <div v-else>
            <p>Tu pourras voir en détail <span> le profil de chaque membre 👤</span> et le contacter par mail. </p>
          </div>
        </div>
        <div class="dialog-content text-center" v-else>
          <h4 class="dialog-title">Page Info </h4>
          <p>Page en cours de création 🚧</p>
          <p>Bientôt dispo 👍</p>
        </div>
        <el-button class="dialog-btn" type="primary" @click="closeDialog">Ok
      </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'DialogInfoPage',
  mixins: [utilities],
  props: ['openDialog', 'user'],
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    isAdminTeamFromRoute() {
      return this.currentTeam && this.currentTeam._id && this.currentTeam._id === this.$route.params.id && this.isAdmin(this.currentUser, this.currentTeam)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  },
  watch: {
    openDialog () {
      this.dialogVisible = this.openDialog
    },
    dialogVisible () {
      if (this.dialogVisible === false) {
        this.$emit('closeDialog')
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
  .dialog-content { 
    margin-bottom: 40px;
    p { font-size: 15px; line-height: 28px; span {  font-weight: 600; } }
  }
  .dialog-title {
    @include flex-center();
    font-weight: bold;
    margin-bottom: 40px;
  }
  .dialog-content.text-center { p { text-align: center; } }
}
.dialog-btn {
  padding: 12px 17px;
  font-size: 14px;
}
.el-dialog__footer {
  padding: 20px;
}
</style>
