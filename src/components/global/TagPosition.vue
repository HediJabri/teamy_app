<template lang="html">
  <span v-if="position" class="tag-position"
  :class="classPositionTag(position)">
    {{ formatPositionTag(position) }}
  </span>
</template>

<script>
export default {
  name: 'TagPosition',
  props: ['position'],
  methods: {
    classPositionTag(position) {
      return {
        'tag-blue': position !== 'Gardien',
        'tag-green': position === 'Gardien'
      }
    },
    formatPositionTag(position) {
      if (position === 'Attaquant') return 'AT'
      if (position === 'Milieu de Terrain') return 'ML'
      if (position === 'Défenseur') return 'DF'
      if (position === 'Gardien') return 'GB'
      if (position === '?') return '--'
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-position {
  @include tag();
  @include tag-blue();
}
.tag-blue {
  @include tag-blue();
}
.tag-red {
  @include tag-red();
}
.tag-orange {
  @include tag-orange();
}
.tag-green {
  @include tag-green();
}
</style>
