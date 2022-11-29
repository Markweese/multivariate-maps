<template>
  <div :class="{'--active': chartData, 'chart-panel': true}">
    <div class="control-block">
      <div>
        <button :class="{'--active': analysisType === 'historical'}" @click="$emit('update:analysis-type', 'historical')" name="button">Historical</button>
        <button :class="{'--active': analysisType === 'forecasted'}" @click="$emit('update:analysis-type', 'forecasted')" name="button">Forecasted</button>
      </div>
      <button :class="{'--active': showHotMarkets}" @click="$emit('update:show-hot-markets', 'forecasted')" name="button">🌶️  Hot Markets</button>
    </div>
    <template v-if="showHotMarkets">
      <div v-if="hotMarkets" class="hot-markets">
        <div v-for="market in hotMarkets">
          <p>
            {{market.RegionName}} -
          </p>
          <span>{{market.growth}} %</span>
          <span> / </span>
          <span>{{market.usd_growth}} $</span>
        </div>
      </div>
    </template>
    <template v-if="analysisType === 'historical'">
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
  </template>
  <template v-if="analysisType === 'forecasted'">
    <multi-line-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      field="zhvi_mean"
      chart-title="ZHVI"
      y-axis-title="$"
      pivot="RegionName"
    >
    </multi-line-chart>
    <multi-line-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      field="growth_mean"
      chart-title="Growth"
      y-axis-title="%"
      pivot="RegionName"
    >
    </multi-line-chart>
    <!-- <confidence-interval-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      pivot="RegionName"
      field="zhvi_mean"
      chart-title="ZHVI"
      y-axis-title="$"
      upperField="zhvi_max"
      lowerField="zhvi_min"
      highlightedField="zhvi_mean"
    >
    </confidence-interval-chart>
    <confidence-interval-chart
      v-if="chartData"
      :chart-data="chartData"
      :chart-gridLines="false"
      pivot="RegionName"
      field="growth_mean"
      chart-title="Growth"
      y-axis-title="%"
      upperField="growth_max"
      lowerField="growth_min"
      highlightedField="growth_mean"
    >
    </confidence-interval-chart> -->
</template>
  </div>
</template>
<script>
import MultiLineChart from "./MultiLineChart.vue";
import ConfidenceIntervalChart from "./ConfidenceIntervalChart.vue";

export default {
  name: 'ChartSection',
  props: {
    hotMarkets: Array,
    showHotMarkets: Boolean,
    analysisType: String,
    chartData: Array,
    icon: Array,
  },
  components: {
    MultiLineChart,
    ConfidenceIntervalChart
  }
}
</script>
<style scoped>
  .chart-panel {
    width: 50%;
    left: -50%;
    top: 100px;
    position: absolute;
    transition: left .5s;
    background-color: #fff;
    height: calc(100vh - 130px);
  }

  .chart-panel.--active {
    left: 0;
  }

  .control-block {
    display: flex;
    justify-content: space-between;
  }

  button.--active {
    color: white;
    background-color: #406ade;
  }

  button {
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 0px;
  }
  .hot-markets {
    max-height: calc(100vh - 130px);
    overflow-y: scroll;
  }
</style>
