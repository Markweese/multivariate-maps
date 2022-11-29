<template>
  <page-header
    icon="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
    title="Zillow Home Value Index (ZHVI)"
    :time-range="timeRange"
    :analysis-type="analysisType"
    @update:time-range="updateTimeRange"
  />
  <mapbox-gl @update:metro-selection="pushToMetros($event)" :map-data="mapData" :summary-stats="summaryStats" :summary-data="summaryData"></mapbox-gl>
  <chart-section
    @update:show-hot-markets="updateHotMarketView($event)"
    @update:analysis-type="updateAnalysisType($event)"
    :chart-data="chartData"
    :show-hot-markets="showHotMarkets"
    :hot-markets="getHotMarkets"
    :analysis-type="analysisType"
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
    updateHotMarketView() {
      this.showHotMarkets = !this.showHotMarkets;
    },
    updateAnalysisType(analysisType) {
      this.analysisType = analysisType
      this.updateChartData();
    },
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
      if(!this.selectedMetros.includes(metro)) this.selectedMetros.push(metro);
      else this.selectedMetros.filter(m => m !== metro);
      this.updateChartData();
    },
    updateChartData() {
      if (this.selectedMetros.length)
        if(this.analysisType === 'historical')  {
          axios.get("/api/metros", { params: {
              metros: this.selectedMetros.join('|'),
              start_month: this.getStartEnd.start_month,
              end_month: this.getStartEnd.end_month
            }
          })
          .then(res => {
            this.chartData = res.data.response;
          });
        } else {
          this.timeRange = '1y';
          axios.get("/api/metros/forecast", { params: {
              metros: this.selectedMetros.join('|'),
              current_date: '2022-10-01',
            }
          })
          .then(res => {
            this.chartData = res.data.response;
          })
        }
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
    },
    getHotMarkets() {
      if (this.summaryData) {
        return this.summaryData.sort(function (objA, objB) {
          // Sort first on growth
          if(objA.growth > objB.growth) {
              return -1;
          } else if (objA.growth < objB.growth) {
              return 1;
          } else {
              // If the growth is the same,
              // do a nested sort on raw usd_growth.
              if(objA.usd_growth > objB.usdgrowth) {
                  return -1;
              } else if (objA.usd_growth < objB.usdgrowth) {
                  return 1;
              } else {
                  return 0;
              }
          }
      });
      }
    }
  },
  data() {
    return {
      showHotMarkets: false,
      analysisType: 'historical',
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
