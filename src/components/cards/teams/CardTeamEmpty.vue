<template lang="html">
  <div class="card">
    <div class="card-btn-box">
      <router-link to="/home/team-create">
        <el-button type="default">
          {{$t('createTeam')}}
          <i class="fa fa-plus-circle blue margin-left"></i>
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
.card {
  height: 270px;
  width: 95%;
  border: 3px dashed #d6dae7;
  border-radius: 3px;
  margin: 0px auto;
  margin-bottom: 20px;
  @include flex-center;
}

.card-btn-box {
  text-align: center;
}
</style>
