<template>
  <div class="chart-container" ref="multiLineChart">
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { multiLineChart } from "../utils/multiLineChart";

export default {
  name: 'MultiLineChart',
  props:  {
    chartData: {
      type: Array,
      default: () => [],
    },
    chartTheme: {
      type: String,
      default: () => "default",
    },
    chartGridLines: {
      type: Boolean,
      default: () => false,
    },
    chartWidth: {
      type: Number as () => number | "container",
      default: () => 560,
    },
    colorSet: {
      type: Array,
      default: () => ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],
    },
    field: {
      type: String,
      default: () => "zhvi",
    },
    chartTitle: {
      type: String,
      default: () => "Value"
    },
    yAxisTitle: {
      type: String,
      default: () => "$"
    },
    chartInterpolation: {
      type: String,
      default: () => "linear",
    },
    displayFields: {
      type: Object,
    },
    pivot: {
      type: String,
      default: () => "RegionName",
    },
    dateFormat: {
      type: String,
      default: () => "%b %Y",
    },
    numberFormat: {
      type: String,
      default: () => ".2f",
    },
  },
  methods: {
    renderChart() {
      multiLineChart(
        this.$refs.multiLineChart,
        this.chartData,
        this.chartTitle,
        this.yAxisTitle,
        this.colorSet,
        this.chartGridLines,
        this.chartInterpolation,
        this.displayFields,
        this.field,
        this.pivot,
        this.dateFormat,
        this.numberFormat,
      );
    }
  },
  watch: {
    chartData() {
      this.renderChart();
    },
    colorSet() {
      this.renderChart();
    },
    chartInterpolation() {
      this.renderChart();
    },
    chartGridLines() {
      this.renderChart();
    },
    chartWidth() {
      this.renderChart();
    },
  },
  mounted() {
    this.renderChart();
  },
};
</script>
<style scoped>
  .chart-container{
    padding: 15px;
  }
</style>
