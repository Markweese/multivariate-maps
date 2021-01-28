<template>
  <div>
    <div v-for="station in selection" class="station-list__item">
      <div class="station-list__item-left">
        <h2>{{station.name}}</h2>
      </div>
      <div class="station-list__item-right">
        <div class="stats-summary">
          <div v-if="checkCFS(station.cfs)">
            <a class="button button-blue button-medium" v-bind:href="`/site/${station.stationNumber}`" v-bind:aria-label="`${station.name}`" tabindex="-1">View Page</a>
            <a v-if="!isTracked(station.stationNumber)" class="button button-green button-medium stats-summary__add-button" v-bind:href="`/explorer/${station.stationNumber}`" v-bind:aria-label="`${station.name}`" tabindex="-1">+ Add To List</a>
          </div>
          <div v-if="!checkCFS(station.cfs) && user">
            <p class="stats-summary__inactive --no-icon"> We're not currently tracking this station. Would you like us to?</p>
            <a v-on:click="trackStation(station)" class="button button-green button-medium" v-bind:aria-label="`Begin tracking ${station.name}`" tabindex="-1">+ Begin Tracking</a>
          </div>
          <div v-if="!checkCFS(station.cfs) && !user">
            <p class="stats-summary__inactive --no-icon">Our system is not currently tracking this station. Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to request tracking, or visit the <a v-bind:href="`https://waterdata.usgs.gov/nwis/uv?site_no=${station.stationNumber}&agency_cd=USGS`">USGS page</a> for more information</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { FlashUtils } from '../mixins/flashUtils.js';

  export default {
    props: [
      'user',
      'subset',
      'selection'
    ],

    data() {
      return {
        flashMessages: document.querySelector('.flash-messages')
      }
    },

    methods: {
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

      checkCFS(cfs) {
        let today = new Date;
        let dateCompare = `${today.getMonth() + 1}/${today.getDate()}`;
        return cfs.length > 0 && cfs[cfs.length - 1].date === dateCompare;
      },

      isTracked(station) {
        return this.user && this.user.stations.includes(station);
      }
    },

    mixins: [
      FlashUtils
    ]
  }
</script>
