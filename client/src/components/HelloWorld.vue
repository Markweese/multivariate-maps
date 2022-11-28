<template>
  <page-header
    icon="https://resurety.com/wp-content/themes/REsurety/assets/images/global/REsurety-logo.svg"
  />
  <!-- title="Zillow Home Value Index (ZHVI)" -->
  <div>
    <button :class="{'btn-active': timeRange ==='1m'}" value="1m" @click="updateTimeRange('1m')">1 Mo</button>
    <button :class="{'btn-active': timeRange ==='6m'}" value="6m" @click="updateTimeRange('6m')">6 Mo</button>
    <button :class="{'btn-active': timeRange ==='1y'}" value="1y" @click="updateTimeRange('1y')">1 Yr</button>
    <button :class="{'btn-active': timeRange ==='5y'}" value="5y" @click="updateTimeRange('5y')">5 Yr</button>
    <button :class="{'btn-active': timeRange ==='Max'}" value="Max" @click="updateTimeRange('Max')">Max</button>
  </div>
  <mapbox-gl @update:metro-selection="pushToMetros($event)" :map-data="mapData" :summary-stats="summaryStats" :summary-data="summaryData"></mapbox-gl>
  <chart-section
    :chart-data="chartData"
  ></chart-section>
</template>

<script>
import axios from 'axios';
import { monthMap } from "../utils/mapUtils";
import MapboxGl from "./MapboxGl.vue";
import PageHeader from "./PageHeader.vue";
import SummaryTable from "./SummaryTable.vue";
import ChartSection from"./ChartSection.vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    MapboxGl,
    PageHeader,
    SummaryTable,
    ChartSection
  },
  methods: {
    updateTimeRange(timeRange) {
      this.timeRange = timeRange;
      axios.get("/api/regions/all", { params: this.getStartEnd })
      .then(res => {
        this.mapData = res.data.response.geoJson;
        this.summaryData = res.data.response.summaryData.data;
        this.summaryStats = res.data.response.summaryData.summaryStats;
      });
      this.updateChartData();
    },
    pushToMetros(metro) {
      this.selectedMetros.push(metro);
      this.updateChartData();
    },
    updateChartData() {
      if (this.selectedMetros.length)
        axios.get("/api/metros", { params: {
            metros: this.selectedMetros.join('|'),
            start_month: this.getStartEnd.start_month,
            end_month: this.getStartEnd.end_month
          }
        })
        .then(res => {
          console.log(res.data.response);
          this.chartData = res.data.response;
        })
      else this.chartData = null;
    }
  },
  computed: {
    getStartEnd() {
      const start_month = new Date();
      let end_month = new Date();
      end_month.setMonth(end_month.getMonth() - monthMap[this.timeRange]);

      return {
        start_month: end_month.toISOString().split('T')[0],
        end_month: start_month.toISOString().split('T')[0],
      }
    }
  },
  data() {
    return {
      selectedMetros: [],
      timeRange: "1m",
      mapData: null,
      chartData: null,
      summaryData: null,
      summaryStats: null,
    }
  },
  mounted() {
    axios.get("/api/regions/all", { params: this.getStartEnd })
    .then(res => {
      this.mapData = res.data.response.geoJson;
      this.summaryData = res.data.response.summaryData.data;
      this.summaryStats = res.data.response.summaryData.summaryStats;
    })
  }
}
</script>
<style scoped>
  button {
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 0px;
  }
  .btn-active {
    color: white;
    background-color: #406ade;
  }
</style>
