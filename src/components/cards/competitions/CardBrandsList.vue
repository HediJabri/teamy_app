<template lang="html">
  <div class="card-list">
    <div class="card-list-header">
      <h5>sélectionnes ta compétition</h5>
      <hr>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-3" v-for="brand in competitionBrands" :key="brand.name">
        <div class="card-list-item" @click="setBrand(brand)"
          :class="{'disable': brand.disable}">
          <div class="card-list-logo">
            <div class="logo-wrapper">
              <img :src="brand.image" alt="">
            </div>
          </div>
          <h5>{{ brand.name }}</h5>
          <p v-if="brand.disable"><span>à venir</span></p>
          <p v-else>{{ brand.category }}</p>
        </div>
      </div>
      <div class="col-xs-12 col-sm-3">
        <div class="card-list-item" @click="setBrand('custom')">
          <div class="icon-trophy">
            <i class="fa fa-trophy"></i>
          </div>
          <h5>Autre</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/data/forms.js'

export default {
  name: 'CardBrandsList',
  data () {
    return {
      competitionBrands: data.competitionBrands
    }
  },
  methods: {
    setBrand (brand) {
      if (brand !== 'custom' && brand.disable) return
      this.$emit('setBrand', brand)
    }
  }
}
</script>

<style lang="scss" scoped>

.row {
  margin-right: 0;
  margin-left: 0;
}
.col-sm-3 {
  padding-right: 0;
  padding-left: 0;
}
.card-list {
  padding: 0 10px;
}
.card-list-header {
  @include page-header();
}
.card-list-item {
  @include card();
  height: 145px;
  padding: 15px 10px!important;
  text-align: center;
  cursor: pointer;
  transition: all .3s ease;
  p {
    text-align: center;
    span {
      @include tag-flat();
    }
  }
  .card-list-logo {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
  .icon-trophy {
    @include icon-logo-wrapper();
    font-size: 18px;
    margin-top: 15px;
  }
  &:hover {
    box-shadow: 1px 3px 5px rgba(5,15,44,0.15);
  }
}
.card-list-item.disable {
  opacity: 0.6;
  cursor: auto;
  &:hover { box-shadow: 0 2px 4px rgba(5,15,44,0.1); }
}
</style>
