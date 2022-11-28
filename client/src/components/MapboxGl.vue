<template>
  <div class="">
    <div id="map"></div>
    <div v-if="summaryStats" id="color-legend" class="legend">
      <h4>Market Growth (%)</h4>
      <div><span style="background-color: #de5842"></span>{{summaryStats.growthP100}}</div>
      <div><span style="background-color: #fcd059"></span>{{summaryStats.growthP90}}</div>
      <div><span style="background-color: #ededea"></span>{{summaryStats.growthP50}}</div>
      <div><span style="background-color: #bfe1bf"></span>{{summaryStats.growthP10}}</div>
      <div><span style="background-color: #a2d7d8"></span>{{summaryStats.growthP0}}</div>
    </div>
    <div v-if="summaryStats" id="color-legend" class="legend --bottom">
      <h4>ZHVI ($/Property)</h4>
      <div class="radius-circle-wrapper"><span class="radius-circle" style="width: 30px; height: 30px"></span>{{summaryStats.zhivP100}}</div>
      <div class="radius-circle-wrapper"><span class="radius-circle" style="width: 20px; height: 20px"></span>{{summaryStats.zhivP90}}</div>
      <div class="radius-circle-wrapper"><span class="radius-circle" style="width: 15px; height: 15px"></span>{{summaryStats.zhivP50}}</div>
      <div class="radius-circle-wrapper"><span class="radius-circle" style="width: 10px; height: 10px"></span>{{summaryStats.zhivP10}}</div>
      <div class="radius-circle-wrapper"><span class="radius-circle" style="width: 5px; height: 5px"></span>{{summaryStats.zhivP0}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import SummaryTable from './SummaryTable.vue';
import ChartSection from './ChartSection.vue';

export default {
  name: 'MapboxGl',
  props: {
    mapData: Object,
    mapDataLoaded: Boolean,
    summaryData: Array,
    summaryStats: Object,
  },
  components: {
    SummaryTable,
    ChartSection
  },
  methods: {
    addPopups() {
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
      });

      this.map.on('mouseenter', 'metro-growth', (e) => {
        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const name = e.features[0].properties.regionName;
        const growth = e.features[0].properties.growth;
        const zhvi = e.features[0].properties.zhvi;
        const usdGrowth = e.features[0].properties.usdGrowth;
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = `<div class='tooltip'><h2>${name}</h2>
          <p><span>ZHVI:</span> ${zhvi}</p>
          <p><span>Growth(%):</span> ${growth}</p>
          <p><span>Growth($):</span> ${usdGrowth}</p></div>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      });

      this.map.on('mouseleave', 'metro-growth', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    },

    addMetroPoints() {
      if(!this.mapData) return;
      // Remove layer and source
      if (this.map.getLayer('metro-growth') !== undefined) this.map.removeLayer('metro-growth');
      if (this.map.getSource('metros') !== undefined) this.map.removeSource('metros');

      // Refresh source
      this.map.addSource('metros', {
        type: 'geojson',
        data: this.mapData
      });

      // Refresh layers
      this.map.addLayer({
        'id': 'metro-growth',
        'source': 'metros',
        'type': 'circle',
        'paint': {
          'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'growth'],
              this.summaryStats.growthP0,
              '#a2d7d8',
              this.summaryStats.growthP10,
              '#bfe1bf',
              this.summaryStats.growthP50,
              '#ededea',
              this.summaryStats.growthP90,
              '#fcd059',
              this.summaryStats.growthP100,
              '#de5842'
            ],
            'circle-radius': [
              'interpolate', ['linear'], ['get', 'zhvi'],
              this.summaryStats.zhivP0, 5,
              this.summaryStats.zhivP100, 30,
            ],
          'circle-blur': .50,
        }
      });

      this.addPopups();
    }
  },
  data() {
    return {
      timeRange: "1",
    }
  },
  watch: {
    mapData(next) {
      if (next && this.map) {
        this.addMetroPoints();
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

  .legend {
    background-color: #fff;
    border-radius: 3px;
    bottom: 30px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    padding: 10px;
    position: absolute;
    right: 10px;
    z-index: 1;
  }

  .legend.--bottom {
    bottom: 185px;
  }

  .radius-circle {
    background-color: white;
    border: 2px solid #dddddd;
  }

  .radius-circle-wrapper {
    text-align: left;
    display: flex;
    align-items: center;
    padding: 5px 2px;
  }

  .legend h4 {
    margin: 0 0 10px;
  }

  .legend div span {
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    width: 10px;
  }

  .tooltip h2 {
    text-align: center;
  }

  .tooltip p {
    text-align: left;
  }
</style>
