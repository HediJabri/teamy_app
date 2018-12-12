<template v-if="statsEvents">
  <chartjs-doughnut
    :labels="mylabels"
    :datasets="mydatasets"
    :option="myoption"
  ></chartjs-doughnut>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChartResultRate',
  props: ['winResult', 'drawResult', 'lostResult'],
  data() {
    return {
      mylabels: [
        '%' + this.$tc('Win', 2),
        '%' + this.$tc('Lost', 2),
        '%' + this.$tc('Draw', 2)
      ],
      mydatasets: [
        {
          data: null,
          backgroundColor: ['#56C59A', '#DA4F46', '#BFC5D9'],
          hoverBackgroundColor: ['#56C59A', '#DA4F46', '#BFC5D9']
        }
      ],
      myoption: {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: false,
          position: 'top',
          text: this.$tc('Game', 2)
        },
        legend: {
          display: false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['statsEvents'])
  },
  methods: {
    fillDataset() {
      const winRate =
        this.winResult === 0
          ? 0
          : (this.winResult / this.statsEvents.length) * 100
      const drawRate =
        this.drawResult === 0
          ? 0
          : (this.drawResult / this.statsEvents.length) * 100
      const lostRate =
        this.lostResult === 0
          ? 0
          : (this.lostResult / this.statsEvents.length) * 100
      this.mydatasets[0].data = [
        Math.round(winRate),
        Math.round(lostRate),
        Math.round(drawRate)
      ]
      if (winRate + drawRate + lostRate === 0) {
        this.mydatasets[0].data = [0, 0, 100]
        this.mylabels[2] = this.$tc('Game', 0)
      }
    }
  },
  created() {
    this.fillDataset()
  }
}
</script>
