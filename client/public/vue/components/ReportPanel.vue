<template>
  <div class='report-panel'>
    <div class="report-panel__header">
      <h2>Trip Reports</h2>
      <button v-if="user && !isReporting" v-on:click="openReport" class="button button-green button-small">+ Write A Report</button>
    </div>
    <div class="report-panel__list">
      <div v-if='isLoadingReports' class='station-list__loader'><p>Loading Reports</p><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div></div>
      <p class='report-panel__no-reports' v-else-if="!reports || reports.length === 0">No reports to show</p>
      <div v-if="reports && reports.length > 0" v-for="report in reports" :key="report._id" class="report-panel__report">
        <div class="report-header">
          <div class="report-header__left">
            <div class="avatar-photo --medium">
              <img v-bind:src="`data:${report.photo.contentType};base64,${getBuff(report.photo.data.data)}`" alt="user photo">
            </div>
            <div class="header-block">
              <h3 class="header-block__title">{{report.title}}</h3>
              <p class="header-block__author">{{report.author}}</p>
              <p class="header-block__date">{{getDisplayDate(report.startDate)}}</p>
            </div>
          </div>
          <div class="report-header__right">
            <button v-on:click="openSocial ? openSocial = null : openSocial = report._id" :class="{'social-open': 1, '--active': openSocial === report._id}" type="button" name="options">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </button>
            <button :class="{'social-button': 1, 'social-button__upvote': 1, '--active': openSocial === report._id}" type="button" name="upvote">
              <img src="/images/icons/upvote-blue.png" alt="upvote icon"/>
            </button>
            <button :class="{'social-button': 1, 'social-button__downvote': 1, '--active': openSocial === report._id}" type="button" name="downvote">
              <img src="/images/icons/downvote-blue.png" alt="downvote icon"/>
            </button>
            <button :class="{'social-button': 1, 'social-button__edit': 1, '--active': openSocial === report._id}" type="button" name="edit">
              <img src="/images/icons/edit.png" alt="edit icon"/>
            </button>
            <button :class="{'social-button': 1, 'social-button__flag': 1, '--active': openSocial === report._id}" type="button" name="flag">
              <img src="/images/icons/flag.png" alt="flag icon"/>
            </button>
            <div class="activity-icons">
              <img src="/images/icons/fish.png" v-if="report.activity.includes('fish')" alt="fishing report">
              <img src="/images/icons/outfitters.png" v-if="report.activity.includes('float')" alt="floating report">
            </div>
          </div>
        </div>
        <div v-if="report.comment" class="report-body">
          <p class="report-body__copy">{{trimComment(report.comment, 500)}}<a href="#"> ...see full report</a></p>
        </div>
        <div class="report-data">
          <div class="info-section" v-if="report.activity.includes('fish') || report.activity.includes('both')">
            <h2 class="info-section__header">Fishing Information</h2>
            <div class="info-section__data">
              <p class="report-data__data-point"><strong>Number Caught: </strong><span v-if="report.numCaught">{{report.numCaught}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Species Reported: </strong><span v-if="report.fish.length" v-for="(species, index) in getSpecies(report.fish)">{{species}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Flies Used: </strong><span v-if="report.flys.length" v-for="(fly, index) in report.flys">{{fly.name}}</span><span v-else class="--empty">none listed</span></p>
            </div>
          </div>
          <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
            <h2 class="info-section__header">Navigation Information</h2>
            <div class="info-section__data">
              <p class="report-data__data-point"><strong>Obstacles Reported: </strong><span v-if="report.obstacles.length">{{report.obstacles.length}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Put In Point: </strong><span v-if="report.putIn.coordinates">{{report.putIn.name}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Take Out Point: </strong><span v-if="report.takeOut.coordinates">{{report.takeOut.name}}</span><span v-else class="--empty">none listed</span></p>
            </div>
          </div>
          <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
            <h2 class="info-section__header">Boat Information</h2>
            <div class="info-section__data">
              <p class="report-data__data-point"><strong>Boat Type: </strong><span v-if="report.waterCraft.category">{{report.waterCraft.category}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Boat Make: </strong><span v-if="report.waterCraft.make">{{report.waterCraft.make}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Boat Model: </strong><span v-if="report.waterCraft.model">{{report.waterCraft.model}}</span><span v-else class="--empty">none listed</span></p>
              <p class="report-data__data-point"><strong>Boat Length: </strong><span v-if="report.waterCraft.length">{{report.waterCraft.length}}</span><span v-else class="--empty">none listed</span></p>
            </div>
          </div>
        </div>
        <div v-if="report.comments && report.comments.length" class="report-comments">
          <div v-for="c in report.comments" class="report-comments__comment">
            <p>{{c.comment}}</p>
          </div>
        </div>
        <div class="report-actions">
          <a href="" class="button button-blue" type="button" name="see full report">See Full Report</a>
          <button v-if="user" class="edit-button button button-black --hollow" type="button" name="Leave a comment">Write A Comment <img src="/images/icons/edit.png" alt="edit icon"/></button>
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
        openSocial: null,
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
      getDisplayDate(date) {
        const d = new Date(date);

        return `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
      },
      getSpecies(fish) {
        return new Set(fish.map(f => {return f.species}));
      },
      trimComment(s, n) {
        return s.substring(0, n);
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
