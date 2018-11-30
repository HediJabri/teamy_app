<template>
  <span v-if="number === 0">0</span>
  <span v-else>{{ animatedNumber }}</span>
</template>

<script>
import TWEEN from 'tween.js'

export default {
  name: 'AnimatedNumber',
  props: {
    number: 0,
    decimals: 0
  },
  data () {
    return {
      animatedNumber: 0
    }
  },
  created: function () {
    this.setAnimation(this.number, 0)
  },
  watch: {
    number: function (newValue, oldValue) {
      this.setAnimation(newValue, oldValue)
    }
  },
  methods: {
    setAnimation: function (newValue, oldValue) {
      var vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(vm.decimals)
        })
        .start()
      animate()
    }
  }
}
</script>