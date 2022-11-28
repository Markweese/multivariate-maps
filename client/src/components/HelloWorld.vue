<template>
  <page-header
    icon="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
    title="Zillow Home Value Index (ZHVI)"
  />
  <div>
    <button :class="{'btn-active': timeRange ==='1m'}" value="1m" @click="updateTimeRange('1m')">1 Mo</button>
    <button :class="{'btn-active': timeRange ==='6m'}" value="6m" @click="updateTimeRange('6m')">6 Mo</button>
    <button :class="{'btn-active': timeRange ==='1y'}" value="1y" @click="updateTimeRange('1y')">1 Yr</button>
    <button :class="{'btn-active': timeRange ==='5y'}" value="5y" @click="updateTimeRange('5y')">5 Yr</button>
    <button :class="{'btn-active': timeRange ==='Max'}" value="Max" @click="updateTimeRange('Max')">Max</button>
  </div>
  <mapbox-gl :map-data="mapData" :summary-stats="summaryStats" :summary-data="summaryData"></mapbox-gl>
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
      console.log(this.getStartEnd);
      axios.get("/api/regions/all", { params: this.getStartEnd })
      .then(res => {
        this.mapData = res.data.response.geoJson;
        this.summaryData = res.data.response.summaryData.data;
        this.summaryStats = res.data.response.summaryData.summaryStats;
      })
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
      timeRange: "1m",
      mapData: null,
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
