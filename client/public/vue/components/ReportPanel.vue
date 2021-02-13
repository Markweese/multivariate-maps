<template>
  <div class='report-panel'>
    <div class="report-panel__header">
      <h2>Trip Reports</h2>
      <button v-if="user && !isReporting" v-on:click="openReport" class="button button-green button-small">+ Write A Report</button>
    </div>
    <div class="report-panel__list">
      <div v-if='isLoadingReports' class='station-list__loader'><p>Loading Reports</p><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div></div>
      <p class='report-panel__no-reports' v-else-if="!reports || reports.length === 0">No reports to show</p>
      <div v-if="reports && reports.length > 0" v-for="report in reports" class="report-panel__report">
        <div class="report-header">
          <div class="report-header__left">
            <img v-bind:src="`data:${report.photo.contentType};base64,${getBuff(report.photo.data.data)}`" alt="user photo">
            <h3>{{report.title}}</h3>
            <p class="report-header__author">{{report.author}}</p>
            <p class="report-header__date">{{report.startDate}}</p>
          </div>
          <div class="report-header__right">
            <button type="button" name="options">...</button>
            <div class="activity-icons">
              <img src="/images/icons/fish.png" alt="fishing report">
              <img src="/images/icons/outfitters.png" alt="floating report">
            </div>
          </div>
        </div>
        <div class="report-body">
          <p class="report-body__copy">{{report.comment}}</p>
        </div>
        <div class="report-data">
          <div v-if="report.activity.includes('fish') || report.activity.includes('both')">
            <p class="report-data__data-point"><strong></strong><span></span></p>
            <p class="report-data__data-point"><strong></strong><span></span></p>
            <p class="report-data__data-point"><strong></strong><span></span></p>
          </div>
          <div v-if="report.activity.includes('float') || report.activity.includes('both')">
            <p class="report-data__data-point"><strong></strong><span></span></p>
            <p class="report-data__data-point"><strong></strong><span></span></p>
            <p class="report-data__data-point"><strong></strong><span></span></p>
            <p class="report-data__data-point"><strong></strong><span></span></p>
          </div>
        </div>
      </div>
    </div>
    <ReportCreator v-if="user && isReporting" v-on:deactivate="closeReport" v-bind:data="data" v-bind:user="user">
    </ReportCreator>
  </div>
</template>
<script>
  import axios from 'axios';
  import ReportCreator from '../components/ReportCreator.vue';

  export default {
    props: [
      'data',
      'user'
    ],

    data() {
      return {
        reports: null,
        allFish: [],
        allFlys: [],
        isReporting: false,
        isLoadingReports: false
      }
    },

    mounted() {
      this.getReports();
    },

    methods: {
      getBuff(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      },
      openReport() {
        this.isReporting = true;
      },
      closeReport() {
        this.isReporting = false;
        document.querySelector('.inner.--flash').scrollIntoView();
      },
      getReports() {
        this.isLoadingReports = true;

        axios.get(`/reports/station/${this.data.stationNumber}`)
          .then(res => {
            if (res.data.status === 200) {
              this.reports = res.data.data;
            }

            this.isLoadingReports = false;
          });
      }
    },

    components: {
      ReportCreator
    }
  }
</script>
