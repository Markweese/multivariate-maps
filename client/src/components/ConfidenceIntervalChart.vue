<template>
  <div ref="confidenceIntervalChart"></div>
</template>

<script lang="ts">
import Vue from "vue";

// Vega-lite chart specs:
import { confidenceIntervalChart } from "../utils/confidenceIntervalChart";

/* -------------------------------- methods -------------------------------- */

export default {
  name: 'ConfidenceIntervalChart',
  props: {
    chartTitle: {
      required: false,
      type: String,
      default: () => "",
    },
    chartGridLines: {
      type: Boolean,
      default: () => false,
    },
    chartTheme: {
      type: String,
      default: () => "default",
    },
    yAxisTitle: {
      required: false,
      type: String,
      default: "",
    },
    pivot: {
      type: String,
      default: () => "RegionName",
    },
    chartData: {
      type: Array,
      default: () => [],
    },
    chartWidth: {
      type: [Number, String],
      default: () => "container",
    },
    colorSet: {
      type: Array,
      default: () => ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],
    },
    compressTooltip: {
      type: Boolean,
      default: () => false,
    },
    showErrorBand: {
      type: Boolean,
      default: () => true,
    },
    chartInterpolation: {
      type: String,
      default: () => "linear",
    },
    displayFields: {
      type: Object,
    },
    dateFormat: {
      type: String,
      default: () => "%b %Y",
    },
    excludeGroups: {
      type: Array,
      default: () => [],
    },
    customSort: {
      required: false,
      type: Array,
      default: () => null,
    },
    numberFormat: {
      type: String,
      default: () => ".2f",
    },
    upperField: {
      type: String,
      default: () => "zhvi_max"
    },
    lowerField: {
      type: String,
      default: () => "zhvi_min"
    },
    highlightedField: {
      type: String,
      default: () => "zhvi_mean"
    }
  },
  watch: {
    chartData() {
      this.renderChart();
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      confidenceIntervalChart(
        this.$refs.confidenceIntervalChart,
        this.chartData,
        this.chartTheme,
        this.chartTitle,
        this.yAxisTitle,
        this.colorSet,
        this.chartGridLines,
        this.chartInterpolation,
        this.compressTooltip,
        this.showErrorBand,
        this.displayFields,
        this.pivot,
        this.dateFormat,
        this.excludeGroups,
        this.customSort,
        this.numberFormat,
        this.upperField,
        this.lowerField,
        this.highlightedField,
      );
    }
  },
};
</script>
