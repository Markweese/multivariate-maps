<template>
  <div class="map">
    <div id="map" class="__mapbox-map">
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
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
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.stations[0].coordinates[1], this.stations[0].coordinates[0]],
      zoom: 15
    });

    map.on('load', () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': this.geometry,
      });
      map.addLayer({
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
        console.log(this.geometry.features)
      });

      axios.get(downstreamGeometryUrl)
      .then(res => {
        this.geometry.features = this.geometry.features.concat(res.data.features);
        console.log(this.geometry.features)
      });
    }
  }
}
</script>
