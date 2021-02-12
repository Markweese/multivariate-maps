<template>
  <div class='report-panel'>
    <div class="report-panel__header">
      <h2>Trip Reports</h2>
      <button v-if="user && !isReporting" v-on:click="openReport" class="button button-green button-small">+ Write A Report</button>
    </div>
    <div class="report-panel__list">
      <p class='report-panel__no-reports' v-if="!reports || reports.length === 0">No reports to show</p>
      <div v-if="reports && resports.length > 0" v-for="report in reports" class="report-panel__report">
        <h2>placeholder</h2>
      </div>
    </div>
    <ReportCreator v-if="user && isReporting" v-on:deactivate="closeReport" v-bind:data="data" v-bind:user="user">
    </ReportCreator>
    <div v-if="!isReporting && reports.length" v-for="report in reports" class="report-panel__report-card">
      <h1>report</h1>
    </div>
  </div>
</template>
<script>
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
        isReporting: false
      }
    },

    methods: {
      openReport() {
        this.isReporting = true;
      },
      closeReport() {
        this.isReporting = false;
        document.querySelector('.inner.--flash').scrollIntoView();
      }
    },

    components: {
      ReportCreator
    }
  }
</script>
