<template>
  <div id="map"></div>
</template>

<script>
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { regionRequestParams } from "../utils/mapUtils";
import SummaryTable from './SummaryTable.vue';
import ChartSection from './ChartSection.vue';

export default {
  name: 'MapboxGl',
  props: {
    mapData: Object,
    mapDataLoaded: Boolean,
    summaryData: Array,
  },
  components: {
    SummaryTable,
    ChartSection
  },
  methods: {
    addMetroPoints: () => {
      console.log(this.mapData);
      map.addSource('metros', {
        type: 'geojson',
        data: this.mapData
      });

      // Add some layers
      map.addLayer(
      {
      'id': 'metro-growth',
      'source': 'metros',
      'type': 'fill',
      'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'growth'],
        0,
        '#de5842',
        500000,
        '#fcd059',
        750000,
        '#ededea',
        1000000,
        '#bfe1bf',
        2500000,
        '#a2d7d8'
      ],
        'fill-opacity': 0.75
      }
      },
        'road-label-simple' // Add layer below labels
      );
    }
  },
  data() {
    return {
      timeRange: "1",
    }
  },
  watch: {
    mapDataLoaded(next) {
      if (next && this.map) {
        this.map.on('load', () => {
          this.addMetroPoints();
        });
      }
    }
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2JyZXdlciIsImEiOiJja3hkdGpvNHQxYTdyMnF0aHl0emsyajltIn0.oNkq4DvIu2A68CEE0lPFkw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [-101.299591, 47.116386],
      zoom: 3
    });

    if (this.map) {
      this.addMetroPoints();
    }
  }
}
</script>
<style scoped>
  #map {
    height: calc(100vh - 150px);
  }
</style>
