<template>
  <div class="map">
    <div id="map" class="__mapbox-map">
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { HistoricComparisons } from '../mixins/generalUtils.js';

export default {
  data() {
    return {
      map: null,
      user: null,
      river: null,
      stations: null,
      snowpacks: null,
      reservoirs: null,
      geometry: {
        type: "FeatureCollection",
        features: []
      },
      flashMessages: document.querySelector('.flash-messages')
    }
  },

  created: function(){
    this.fetchData();
  },

  mounted: function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2JyZXdlciIsImEiOiJja3hkdGpvNHQxYTdyMnF0aHl0emsyajltIn0.oNkq4DvIu2A68CEE0lPFkw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.stations[0].coordinates[1], this.stations[0].coordinates[0]],
      zoom: 15
    });

    if (this.map) {
      this.map.on('load', () => {
        this.map.addSource('route', {
          'type': 'geojson',
          'data': this.geometry,
        });
        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 8
          }
        });
      });

      this.addStationPoints();
      // this.addSnowpackPoints();
      // this.addReservoirPoints();
    }
  },

  methods: {
    fetchData() {
      let dataElement = document.querySelector('#dataPasser');
      let user = dataElement.dataset.user;
      let river = dataElement.dataset.river;
      let stations = dataElement.dataset.stations;
      let snowpacks = dataElement.dataset.snowpacks;
      let reservoirs = dataElement.dataset.reservoirs;

      this.user = user ? JSON.parse(user) : null;
      this.river = river ? JSON.parse(river) : null;
      this.stations = stations ? JSON.parse(stations) : null;
      this.snowpacks = snowpacks ? JSON.parse(snowpacks) : null;
      this.reservoirs = reservoirs ? JSON.parse(reservoirs) : null;
      this.fetchRiverGeometry();
    },
    fetchRiverGeometry() {
      let upstreamGeometryUrl = `https://labs.waterdata.usgs.gov/api/nldi/linked-data/nwissite/USGS-${this.stations[0].stationNumber}/navigation/UM/flowlines?f=json&distance=999`
      let downstreamGeometryUrl = `https://labs.waterdata.usgs.gov/api/nldi/linked-data/nwissite/USGS-${this.stations[0].stationNumber}/navigation/DM/flowlines?f=json&distance=999`

      axios.get(upstreamGeometryUrl)
      .then(res => {
        this.geometry.features = this.geometry.features.concat(res.data.features);
      });

      axios.get(downstreamGeometryUrl)
      .then(res => {
        this.geometry.features = this.geometry.features.concat(res.data.features);
      });
    },
    addStationPoints() {
      this.stations.forEach(station => {
        // create a HTML element for each feature
        const percentileResult = this.currentReadingPercentile(station.cfs);
        const el = document.createElement('div');
        const html = `
          <svg id='station-${station.stationNumber}' width='100%' height='400px'>
            <!-- pattern -->
            <defs>
              <pattern id='image' x='0%' y='0%' height='100%' width='100%' viewBox='0 0 512 512'>
                <image x='0%' y='0%' width='510' height='510' xlink:href='/images/icons/river_result_icon.png'></image>
              </pattern>
            </defs>

            <circle id='sd' class='medium' cx='5%' cy='40%' r='5%' fill='url(#image)' stroke='${percentileResult.color}' stroke-width='0.5%' />
          </svg>`;
        el.innerHTML = html;
        new mapboxgl.Marker(el).setLngLat([station.coordinates[1], station.coordinates[0]]).addTo(this.map);
      })
    },
    addSnowpackPoints() {
    },
    addReservoirPoints() {
    },
  },
  mixins: [
    HistoricComparisons
  ],
}
</script>
