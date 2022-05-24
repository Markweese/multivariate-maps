<template>
  <div class="map">
    <div id="map" class="__mapbox-map">
    </div>
    <div ref="reportList" :class="{'map__right-panel': true, '--closed': !rightPanelOpen}">
      <ReportPanel
        v-if="reports"
        :hideEditingTools="true"
        :data="reports"
        :user="user"
        :displayUserPhotos="true"
        :hidePagination="true"
        :buttonFullWidth="true"
        customTitle=" "
      />
      <span v-else>no reports available</span>
    </div>
    <button
      @click="toggleRightPanel"
      type="toggle"
      class="map__right-panel--toggle button button-blue button-blue--small"
      name="toggle report viewer"
    >
        <img src="/images/icons/book.png" alt="reports icon">
        {{rightPanelOpen ? 'Hide' : 'View'}} Reports
    </button>
  </div>
</template>
<script>
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FlashUtils } from '../mixins/flashUtils.js';
import { DataHandlers } from '../mixins/dataHandlers.js';
import { HistoricComparisons } from '../mixins/generalUtils.js';
import ReportPanel from '../components/ReportPanel.vue';

export default {
  data() {
    return {
      map: null,
      user: null,
      usernames: null,
      river: null,
      reports: null,
      stations: null,
      snowpacks: null,
      reservoirs: null,
      rightPanelOpen: false,
      trackedStations: null,
      geometry: {
        type: "FeatureCollection",
        features: []
      },
      flashMessages: document.querySelector('.flash-messages')
    }
  },

  created: function(){
    this.fetchData();
    this.getTrackedStations();
    window.trackStation = (stationNumber, stationName) => {
        this.trackStation(stationNumber, stationName)
    }

    window.addStationToList = (id) => {
        this.addStationToList(id)
    }
  },

  mounted: function(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2JyZXdlciIsImEiOiJja3hkdGpvNHQxYTdyMnF0aHl0emsyajltIn0.oNkq4DvIu2A68CEE0lPFkw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [this.stations[0].coordinates[1], this.stations[0].coordinates[0]],
      zoom: 15
    });

    if (this.map) {
      this.map.on('load', () => {
        this.addStationPoints();
        this.fetchRiverGeometry();
        // this.addSnowpackPoints();
        // this.addReservoirPoints();
      });
    }
  },

  methods: {
    fetchData() {
      let dataElement = document.querySelector('#dataPasser');
      let user = dataElement.dataset.user;
      let usernames = dataElement.dataset.usernames;
      let river = dataElement.dataset.river;
      let reports = dataElement.dataset.reports;
      let stations = dataElement.dataset.stations;
      let snowpacks = dataElement.dataset.snowpacks;
      let reservoirs = dataElement.dataset.reservoirs;

      this.user = user ? JSON.parse(user) : null;
      this.usernames = usernames ? JSON.parse(usernames) : null;
      this.river = river ? JSON.parse(river) : null;
      this.reports = reports ? JSON.parse(reports) : null;
      this.stations = stations ? JSON.parse(stations) : null;
      this.snowpacks = snowpacks ? JSON.parse(snowpacks) : null;
      this.reservoirs = reservoirs ? JSON.parse(reservoirs) : null;
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
            'line-color': '#4B8BF7',
            'line-width': 3
          }
        });
      });
    },
    addStationPoints() {
      const coords = [];
      this.stations.forEach(station => {
        // create a HTML element for each feature
        coords.push([station.coordinates[1], station.coordinates[0]]);
        const percentileResult = this.currentReadingPercentile(station.cfs);
        const popupHTML = this.getPopupHTML(station, percentileResult);
        const el = document.createElement('div');
        const iconHTML=`<div class="point_icon station" style="border-color: ${percentileResult.color}"/>`
        el.innerHTML = iconHTML;

        // Set popup and marker
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML)

        new mapboxgl.Marker(el)
          .setLngLat([station.coordinates[1], station.coordinates[0]])
          .setPopup(popup)
          .addTo(this.map);
      });

      const bounds = coords.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coords[0], coords[0]));

      this.map.fitBounds(bounds, {
        padding: 20
      });
    },
    addSnowpackPoints() {
      this.snowpacks.forEach(snowpack => {
        // create a HTML element for each feature
        const percentileResult = this.currentReadingPercentile(snowpack.cfs);
        const el = document.createElement('div');
        const html=`<div class="point_icon snowpack" style="border-color: ${percentileResult.color}"/>`
        el.innerHTML = html;
        new mapboxgl.Marker(el).setLngLat([snowpack.coordinates[1], snowpack.coordinates[0]]).addTo(this.map);
      })
    },
    addReservoirPoints() {
      this.reservoirs.forEach(reservoir => {
        // create a HTML element for each feature
        const percentileResult = this.currentReadingPercentile(reservoir.cfs);
        const el = document.createElement('div');
        const html=`<div class="point_icon reservoir" style="border-color: ${percentileResult.color}"/>`
        el.innerHTML = html;
        new mapboxgl.Marker(el).setLngLat([reservoir.coordinates[1], reservoir.coordinates[0]]).addTo(this.map);
      })
    },

    checkCFS(cfs) {
      let today = new Date;
      let dateCompare = `${today.getMonth() + 1}/${today.getDate()}`;
      return cfs.length > 0 && cfs[cfs.length - 1].date === dateCompare;
    },

    whichError(err) {
      switch(err) {
        case("Ice"):
          return "Iced"
        case("Eqp"):
          return "Equipment Failure"
        case("Ssn"):
          return "Seasonally Inactive"
        default:
          return "Issue with meter"
      }
    },

    getPopupHTML(station, percentile) {
      const isTracked = this.trackedStations.includes(station.stationNumber);

      if (station.cfsInstantaneous.length) {
        return `<div class="__popup">
              <h2> ${station.name} </h2>
              <p style="color: ${percentile.color}">${station.cfsInstantaneous[station.cfsInstantaneous.length - 1].reading}CFS</p>
              <p>${percentile.description}</p>
              <a class="button button-blue button-full __popup--view-button" href="/site/${station.stationNumber}">View Page</a>
              ${ !this.user || this.isTrackedByUser(station.stationNumber) ? '' : `<a class="button button-green button-full" onclick="addStationToList('${station.stationNumber}')" class="button"/>+ Add To List</a>`}
            </div>`;
      } else if (!station.flagged && this.user && !this.isTracked) {
        return `<div class="__popup">
            <h2> ${station.name} </h2>
            <p class="no-info-block"> We're not currently tracking this station. Would you like us to?</p>
            <button onclick="trackStation('${station.stationNumber}', '${station.name}')" class="button button-green button-full" aria-label="Begin Tracking ${station.stationNumber}" class="button"/>+ Begin Tracking</button>
          </div>`;
      } else if(!station.flagged && this.user && !isTrackedByUser(station.stationNumber)) {
        return `<div class="__popup">
            <h2> ${station.name} </h2>
            <p class="no-info-block"> We're not currently tracking this station. Would you like us to?</p>
            <button onclick="addStationToList('${station.stationNumber}')" class="button button-green button-full" aria-label="Begin Tracking ${station.stationNumber}" class="button"/>+ Add To List</button>
          </div>`;
      } else {
        return `<h2> ${station.name} </h2>
          <p class="no-info-block">
            Our system is not currently tracking this station. Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to request tracking, or visit the <a href="https://waterdata.usgs.gov/nwis/uv?site_no=${station.stationNumber}&agency_cd=USGS">USGS page</a> for more information
          </p>
          <a href="/login" class="button button-blue --full-width __popup--view-button" value="Log In" class="button">Log In</a>
          <a href="/signup" class="button button-blue --full-width __popup--view-button" value="Sign Up" class="button">Sign Up</a>`
      }
    },

    toggleRightPanel() {
      this.rightPanelOpen = !this.rightPanelOpen

      if (this.rightPanelOpen) {
        this.$refs.reportList.focus();
      }
    }
  },
  mixins: [
    FlashUtils,
    DataHandlers,
    HistoricComparisons
  ],
  components: {
    ReportPanel
  }
}
</script>
