<template>
  <div class='station-page'>
    <div class='station-page__header'>
      <h1>
        {{usgsData.name}}
      </h1>
      <p>
        <a :href='googleUrl(usgsData.coordinates)' target='blank' aria-label='view on google map'>{{round(usgsData.coordinates[0], 3)}}, {{round(usgsData.coordinates[1], 3)}}</a>
      </p>
      <div v-if="!checkCFS(usgsData.cfs) && user">
        <a v-on:click="trackStation(usgsData)" style="color: white; text-decoration: none; margin-top: 10px;" class="button button-green button-medium" v-bind:aria-label="`Begin tracking ${usgsData.name}`">+ Begin Tracking</a>
      </div>
    </div>
    <div v-if="activePanel" class='station-page__filters'>
      <a v-if='dataPresent.usgs' v-on:click='activatePanel("usgs")' v-on:keyup='processKeyEvent($event, "usgs")' :class='buttonClass.usgs' role='button' aria-label='view stream flow data' tabindex='0'>FLOWS</a>
      <div :class='buttonClassMobile.usgs'>
        <a v-if='dataPresent.usgs' v-on:click='activatePanel("usgs")' role='button' aria-label='view stream flow data'></a>
        <p>Flows</p>
      </div>

      <a v-if='dataPresent.snotel' v-on:click='activatePanel("snotel")' v-on:keyup='processKeyEvent($event, "snotel")' :class='buttonClass.snotel' role='button' aria-label='view snow pack data' tabindex='0'>SNOWPACK</a>
      <div :class='buttonClassMobile.snotel'>
        <a v-if='dataPresent.snotel' v-on:click='activatePanel("snotel")' role='button' aria-label='view snow pack data'></a>
        <p>Snowpack</p>
      </div>

      <!-- <a v-if='dataPresent.reservoir' v-on:click='activatePanel("reservoir")' v-on:keyup='processKeyEvent($event, "reservoir")' :class='buttonClass.reservoir' role='button' aria-label='view reservoir data' tabindex='0'>RESERVOIRS</a>
      <div :class='buttonClassMobile.reservoir'>
        <a v-if='dataPresent.reservoir' v-on:click='activatePanel("reservoir")' role='button' aria-label='view reservoir data'></a>
        <p>Reservoir</p>
      </div> -->
    </div>

    <Timeseries v-if='activePanel === "usgs" && usgsData.cfs.length' v-bind:data='usgsData' v-bind:context='"cfs"' units='CFS'/>
    <ReportPanel v-if='activePanel === "usgs"' v-bind:data='usgsData' v-bind:user='user'/>
    <div v-if='activePanel === "snotel"' v-for='item in snotelData'>
      <BarGraph v-if='item.swe.length' v-bind:data='item' v-bind:context='"swe"' units='IN'/>
    </div>
    <!-- <div v-if='activePanel === "reservoir"' v-for='item in reservoirData'>
      <BarGraph v-if='item.storage.length' v-bind:data='item' v-bind:context='"storage"' units='M³'/>
    </div> -->
    <a v-if="checkCFS(usgsData.cfs) && !isTracked(usgsData.stationNumber)" v-bind:href="`/explorer/${usgsData.stationNumber}`" class="button button-green button-medium --button-shadow station-page__add-station" v-bind:aria-label="`Add ${usgsData.name} to list`">+ Add To List</a>
  </div>
</template>
<script>
// import the base pages for visualization
import axios from 'axios';
import BarGraph from '../components/BarGraph.vue';
import { FlashUtils } from '../mixins/flashUtils.js';
import Timeseries from '../components/Timeseries.vue';
import ReportPanel from '../components/ReportPanel.vue';

export default {
  data() {
		return {
      user: null,
			usgsData: null,
      snotelData: null,
      reservoirData: null,
      activePanel: null,
      flashMessages: document.querySelector('.flash-messages')
		}
	},

	created: function(){
		this.fetchData();
	},

  computed: {
    dataPresent() {
      return {
        usgs: this.usgsData.cfs.length ? true : false,
        snotel: this.snotelData.length ? true : false,
        reservoir: this.reservoirData.length ? true : false
      }
    },

    buttonClass() {
      let baseClass = 'button button-medium button-blue --hollow';

      return {
        usgs: this.activePanel === 'usgs' ? `${baseClass} -active` : baseClass,
        snotel: this.activePanel === 'snotel' ? `${baseClass} -active` : baseClass,
        reservoir: this.activePanel === 'reservoir' ? `${baseClass} -active` : baseClass
      }
    },

    buttonClassMobile() {
      let baseClassUsgs = 'mobile-button --usgs';
      let baseClassSnotel = 'mobile-button --snotel';
      let baseClassReservoir = 'mobile-button --reservoir';

      return {
        usgs: this.activePanel === 'usgs' ? `${baseClassUsgs} -active` : baseClassUsgs,
        snotel: this.activePanel === 'snotel' ? `${baseClassSnotel} -active` : baseClassSnotel,
        reservoir: this.activePanel === 'reservoir' ? `${baseClassReservoir} -active` : baseClassReservoir
      }
    }
  },

	methods: {
		fetchData() {
      let dataElement = document.querySelector('#dataPasser')
      let user = dataElement.dataset.user;
			let usgs = dataElement.dataset.cfs;
      let snotel = dataElement.dataset.snotel;
      let reservoir = dataElement.dataset.reservoir;

      this.user = user ? JSON.parse(user) : null;
			this.usgsData = usgs ? JSON.parse(usgs) : null;
      this.snotelData = snotel ? JSON.parse(snotel) : null;
      this.reservoirData = reservoir ? JSON.parse(reservoir) : null;
      this.activePanel = this.usgsData.cfs.length ? 'usgs' : this.snotelData.length ? 'snotel' : this.reservoirData.length ? 'reservoir' : null;
		},

    trackStation(station) {
      let errorMessage = this.generateFlashMessage(station.stationNumber, station.name, 'error');
      let compileMessage = this.generateFlashMessage(station.stationNumber, station.name, 'pending');
      let successMessage = this.generateFlashMessage(station.stationNumber, station.name, 'success');

      this.flashMessages.appendChild(compileMessage);

      axios.get(`/api/station/new/${station.stationNumber}`, {
        headers: {
          'user': this.user.email,
          'token': this.user.sessionToken
        }
      })
        .then(res => {
          compileMessage.remove();
          this.flashMessages.appendChild(successMessage);
        }).catch(e => {
          compileMessage.remove();
          this.flashMessages.appendChild(errorMessage);
        });
    },

    activatePanel(panel) {
      this.activePanel = panel;
    },

    googleUrl(coordinates) {
      return `https://www.google.com/maps/place/${coordinates[0]},${coordinates[1]}`;
    },

    round(value, place) {
      return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
    },

    processKeyEvent(event, context) {
      if(event.keyCode === 13) {
        this.activatePanel(context);
      }
    },

    isTracked(station) {
      return this.user && this.user.stations.includes(station);
    },

    checkCFS(cfs) {
      let today = new Date;
      let dateCompare = `${today.getMonth() + 1}/${today.getDate()}`;

      return cfs.length > 0 && cfs[cfs.length - 1].date === dateCompare;
    },
  },

  components: {
    BarGraph,
    Timeseries,
    ReportPanel
  },

  mixins: [
    FlashUtils
  ]
}
</script>
