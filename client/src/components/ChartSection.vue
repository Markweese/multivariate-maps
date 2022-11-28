<template>
  <div :class="{'--active': chartData, 'chart-panel': true}">
    <multi-line-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      field="zhvi"
      chart-title="ZHVI"
      y-axis-title="$"
      pivot="RegionName"
    >
    </multi-line-chart>
    <multi-line-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      field="growth"
      chart-title="Growth"
      y-axis-title="%"
      pivot="RegionName"
    >
    </multi-line-chart>
  </div>
</template>
<script>
import MultiLineChart from "./MultiLineChart.vue";

export default {
  name: 'ChartSection',
  props: {
    chartData: Array,
    icon: Array,
  },
  components: {
    MultiLineChart
  }
}
</script>
<style scoped>
  .chart-panel {
    width: 50%;
    left: -50%;
    top: 135px;
    position: absolute;
    transition: left .5s;
    background-color: #fff;
    height: calc(100vh - 150px);
  }

  .chart-panel.--active {
    left: 0;
  }
</style>
