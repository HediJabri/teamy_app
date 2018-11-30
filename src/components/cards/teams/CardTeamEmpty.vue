<template lang="html">
  <div class="card-team-empty">
    <div class="card-team-empty-btn-box">
      <router-link to="/home/team-create">
        <el-button type="default">
          Créer une équipe <i class="fa fa-plus-circle blue margin-left"></i>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTeamEmpty'
}
</script>

<style lang="scss" scoped>

.card-team-empty {
  height: 270px;
  width: 95%;
  border: 3px dashed #D6DAE7;
  border-radius: 3px;
  margin: 0px auto;
  margin-bottom: 20px;
  @include flex-center;
}

.card-team-empty-btn-box {
  text-align: center;
}

</style>
