<template>
  <div class='station-page'>
    <div class='station-page__header'>
      <h1>
        {{usgsData.name}}
      </h1>
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
    <div class="station-page__inactive" v-if="usgsData.flagged">
      <p>
        This station appears to be missing some data, and it is probably no longer active. To confirm, visit the <a :href="`https://nwis.waterdata.usgs.gov/usa/nwis/uv/?cb_00060=on&format=gif_default&site_no=${usgsData.stationNumber}&period=&begin_date=2020-09-01&end_date=2022-05-09`" class="text-button --blue">{{usgsData.name}} USGS page</a>. If this message was delivered in error, please reach out to us <a href="mailto:checktheflows+qa@gmail.com" class="text-button --blue">@checktheflows</a>
      </p>
    </div>
    <Timeseries v-if='activePanel === "usgs" && usgsData.cfs.length' v-bind:data='usgsData' v-bind:context='"cfs"' units='CFS'/>
    <ReportPanel v-if='activePanel === "usgs"' v-bind:data='usgsData' v-bind:user='user' v-bind:usernames='usernames' v-bind:hashTags='hashTags'/>
    <div v-if='activePanel === "snotel"' v-for='item in snotelData'>
      <BarGraph v-if='item.swe.length' v-bind:data='item' v-bind:context='"swe"' units='IN'/>
    </div>
    <!-- <div v-if='activePanel === "reservoir"' v-for='item in reservoirData'>
      <BarGraph v-if='item.storage.length' v-bind:data='item' v-bind:context='"storage"' units='M³'/>
    </div> -->
    <a v-if="!usgsData.flagged && user && !isTracked" v-on:click="trackStation(usgsData.stationNumber, usgsData.name)" class="button button-green button-medium --button-shadow station-page__add-station" v-bind:aria-label="`Add ${usgsData.name} to list`">+ Begin Tracking</a>
    <a v-else-if="!usgsData.flagged && user && !isTrackedByUser(usgsData.stationNumber)" v-bind:href="`/explorer/${usgsData.stationNumber}`" class="button button-green button-medium --button-shadow station-page__add-station" v-bind:aria-label="`Add ${usgsData.name} to list`">+ Add To List</a>
  </div>
</template>
<script>
// import the base pages for visualization
import axios from 'axios';
import BarGraph from '../components/BarGraph.vue';
import { FlashUtils } from '../mixins/flashUtils.js';
import Timeseries from '../components/Timeseries.vue';
import ReportPanel from '../components/ReportPanel.vue';
import { DataHandlers } from '../mixins/dataHandlers.js';

export default {
  data() {
		return {
      user: null,
      usernames: null,
      hashTags: null,
			usgsData: null,
      snotelData: null,
      reservoirData: null,
      activePanel: null,
      isTracked: false,
      flashMessages: document.querySelector('.flash-messages')
		}
	},

	created: function(){
		this.fetchData();
    this.getTrackingStatus(this.usgsData.stationNumber);
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
    },
  },

	methods: {
		fetchData() {
      let dataElement = document.querySelector('#dataPasser')
      let user = dataElement.dataset.user;
			let usgs = dataElement.dataset.cfs;
      let snotel = dataElement.dataset.snotel;
      let reservoir = dataElement.dataset.reservoir;
      let usernames = dataElement.dataset.usernames;
      let hashTags = dataElement.dataset.hashtags;

      this.user = user ? JSON.parse(user) : null;
			this.usgsData = usgs ? JSON.parse(usgs) : null;
      this.snotelData = snotel ? JSON.parse(snotel) : null;
      this.usernames = usernames ? JSON.parse(usernames) : null;
      this.hashTags = hashTags ? JSON.parse(hashTags) : null;
      this.reservoirData = reservoir ? JSON.parse(reservoir) : null;
      this.activePanel = this.usgsData.cfs.length ? 'usgs' : this.snotelData.length ? 'snotel' : this.reservoirData.length ? 'reservoir' : null;
		},

    activatePanel(panel) {
      this.activePanel = panel;
    },

    round(value, place) {
      return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
    },

    processKeyEvent(event, context) {
      if(event.keyCode === 13) {
        this.activatePanel(context);
      }
    }
  },

  components: {
    BarGraph,
    Timeseries,
    ReportPanel
  },

  mixins: [
    FlashUtils,
    DataHandlers
  ]
}
</script>
