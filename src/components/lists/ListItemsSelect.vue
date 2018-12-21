<template>
  <div class="list-items">
    <div class="list-item" v-for="item in items" :key="item._id"
      :class="{'active': isSelected(item)}">
      <div class="list-item-content" @click="selectItem(item)">
        <div class="list-item-img avatar">
          <img v-if="item.user.avatar" :src="item.user.avatar">
          <img v-else src="../../assets/img/user.png">
        </div>
        <div class="list-item-body">
          <p class="list-item-body-top">
            {{ item.user.firstName }} {{ item.user.lastName }}
            <template v-if="item.position">
              <slot name="itemTag" :item="item"></slot>
            </template>
          </p>
        </div>
      </div>
      <div class="list-item-body-right">
        <slot name="itemButton" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItemsSelect',
  props: ['items', 'selectedItem'],
  model: {
    prop: 'selectedItem',
    event: 'selectItem'
  },
  methods: {
    isSelected(item) {
      return this.selectedItem && this.selectedItem._id === item._id
    },
    selectItem(item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  @include list-item-s();
  .list-item-content {
    cursor: pointer;
  }
  .list-item-tag {
    @include tag-flat-s();
    min-width: 30px;
  }
  &:hover,
  &.active {
    background: $background-grey;
  }
}
</style>
