<template>
  <div class='report-panel'>
    <div class="report-panel__header">
      <h2>Trip Reports</h2>
      <button v-if="user && !isReporting" v-on:click="openReport" class="button button-green button-small">+ Write A Report</button>
    </div>
    <div class="report-panel__list">
      <div v-if='isLoadingReports' class='station-list__loader'><p>Loading Reports</p><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div></div>
      <div v-else-if="reportLoadError" class='report-panel__no-reports'>{{reportLoadError}}</div>
      <p class='report-panel__no-reports' v-else-if="!reports || reports.length === 0">No reports to show</p>
      <div v-if="reports && reports.length > 0">
        <div v-for="report in pageItems" :key="report._id" class="report-panel__report">
          <div class="report-header">
            <div class="report-header__left">
              <div class="avatar-photo --medium">
                <img v-bind:src="`data:${report.photo.contentType};base64,${getBuff(report.photo.data.data)}`" alt="user photo">
              </div>
              <div class="header-block">
                <h3 class="header-block__title">{{report.title}}</h3>
                <p class="header-block__author">{{report.author}}</p>
                <p class="header-block__author" v-if="getDisplayDate(report.startDate) !== '12/32/1969'">{{getDisplayDate(report.startDate)}}</p>
                <p v-if="report.conditions"><span v-if="report.conditions.cfs">{{Math.round(report.conditions.cfs)}} CFS</span><span v-if="report.conditions.temp">, {{Math.round(report.conditions.temp)}} °F</span></p>
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
              <h2 class="info-section__header">Fishing Information <button class="button button-blue --inline" name="show fish information" aria-haspopup="true" @click="report.fishOpen = !report.fishOpen" :aria-expanded="report.fishOpen">{{report.fishOpen ? 'Close' : 'View'}}<img :src="`${report.fishOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.fishOpen">
                <p class="report-data__data-point"><strong>Number Caught: </strong><span v-if="report.numCaught">{{report.numCaught}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Species Reported: </strong><span v-if="report.fish.length" v-for="(species, index) in getSpecies(report.fish)">{{species}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Flies Used: </strong><span v-if="report.flys.length" v-for="(fly, index) in report.flys">{{fly.name}}</span><span v-else class="--empty">none listed</span></p>
              </div>
            </div>
            <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
              <h2 class="info-section__header">Float Information <button class="button button-blue --inline" name="show navigation information" aria-haspopup="true" @click="report.navOpen = !report.navOpen" :aria-expanded="report.navOpen">{{report.navOpen ? 'Close' : 'View'}}<img :src="`${report.navOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.navOpen">
                <p class="report-data__data-point"><strong>Obstacles: </strong><span v-if="report.obstacles.length">{{report.obstacles.length}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Put In Point: </strong><span v-if="report.putIn.coordinates">{{report.putIn.name}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Take Out Point: </strong><span v-if="report.takeOut.coordinates">{{report.takeOut.name}}</span><span v-else class="--empty">none listed</span></p>
                <button type="button" class="text-button --blue" name="view on map" @click="openPointViewer(report)">See on map</button>
              </div>
            </div>
            <!-- <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
              <h2 class="info-section__header">Boat Information <button class="button button-blue --inline" name="show boat information" aria-haspopup="true" @click="report.boatOpen = !report.boatOpen" :aria-expanded="report.boatOpen">{{report.boatOpen ? 'Close' : 'View'}}<img :src="`${report.boatOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.boatOpen">
                <p class="report-data__data-point"><strong>Boat Type: </strong><span v-if="report.waterCraft.category">{{report.waterCraft.category}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Boat Make: </strong><span v-if="report.waterCraft.make">{{report.waterCraft.make}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Boat Model: </strong><span v-if="report.waterCraft.model">{{report.waterCraft.model}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Boat Length: </strong><span v-if="report.waterCraft.length">{{report.waterCraft.length}}</span><span v-else class="--empty">none listed</span></p>
              </div>
            </div> -->
          </div>
          <div v-if="report.comments && report.comments.length" class="report-comments">
            <div v-for="c in report.comments" class="report-comments__comment">
              <p>{{c.comment}}</p>
            </div>
          </div>
          <div class="report-actions">
            <a href="" class="button button-blue button-small" type="button" name="see full report">View Report</a>
            <button v-if="user" class="edit-button button button-black button-small --hollow" type="button" name="Leave a comment">Comment <img src="/images/icons/edit.png" alt="edit icon"/></button>
          </div>
        </div>
      </div>
      <div v-if="reports && numPages > 1" class="report-pagination">
        <button class="button button-blue --inline prev" type="button" v-if="currentPage !== 1" @click="currentPage --">Newer</button>
        <button v-for="page in numPages" :class="{'report-pagination__indicator': 1, '--active-page': page === currentPage}" @click="currentPage = page"></button>
        <button class="button button-blue --inline" type="button" v-if="currentPage !== numPages" @click="currentPage ++">Older</button>
      </div>
    </div>
    <PointViewer v-if="pointViewerOpen" v-on:deactivate="closePointViewer" v-bind:points="pointViewerPoints"></PointViewer>
    <ReportCreator v-if="user && isReporting" v-on:deactivate="closeReport" v-bind:data="data" v-bind:user="user"></ReportCreator>
  </div>
</template>
<script>
  import axios from 'axios';
  import PointViewer from '../components/PointViewer.vue';
  import ReportCreator from '../components/ReportCreator.vue';

  export default {
    props: [
      'data',
      'user'
    ],

    data() {
      return {
        currentPage: 1,
        perPage: 3,
        perPageMobile: 1,
        reports: null,
        allFish: [],
        allFlys: [],
        openSocial: null,
        isReporting: false,
        isLoadingReports: false,
        reportLoadError: null,
        pointViewerOpen: false,
        pointViewerPoints: []
      }
    },

    mounted() {
      this.getReports();
    },

    computed: {
      numPages() {
        let pp = window.innerWidth < 725 ? this.perPageMobile : this.perPage;
        return Math.ceil(this.reports.length / pp);
      },
      pageItems() {
        return this.reports.slice((this.currentPage - 1) * 3, ((this.currentPage - 1) * 3) + 3 )
      }
    },

    methods: {
      getBuff(buffer) {
        var binstr = Array.prototype.map.call(new Uint8Array(buffer), (ch) => {
            return String.fromCharCode(ch);
        }).join('');

        return btoa(binstr);
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
      closePointViewer() {
        this.pointViewerOpen = false;
        this.pointViewerPoints = [];
      },
      openPointViewer(report) {
          let points = report.obstacles.map(o => {
            return {
              latLng: {
                lat: o.coordinates[0],
                lng: o.coordinates[1]
              },
              icon: '/images/icons/hazard-marker.png',
              place: o
            }
          });

          if (report.putIn.coordinates) {
            points.push(
              {
                latLng: {
                  lat: report.putIn.coordinates[0],
                  lng: report.putIn.coordinates[1]
                },
                icon: '/images/icons/boat-launch-marker.png',
                place: report.putIn
              }
            );
          }

          if (report.takeOut.coordinates) {
            points.push(
              {
                latLng: {
                  lat: report.takeOut.coordinates[0],
                  lng: report.takeOut.coordinates[1]
                },
                icon: '/images/icons/boat-launch-marker.png',
                place: report.takeOut
              }
            );
          }

          this.pointViewerOpen = true;
          this.pointViewerPoints = points;
      },
      getReports() {
        this.isLoadingReports = true;

        axios.get(`/reports/station/${this.data.stationNumber}`)
          .then(res => {
            if (res.data.status === 200) {
              this.reports = res.data.data.map(r => {
                r.navOpen = false;
                r.fishOpen = false;
                r.boatOpen = false;

                return r;
              })
              .sort((a,b) => {
                a = new Date(a.startDate);
                b = new Date(b.startDate);

                if (a < b) {
                  return 1;
                }

                if (b > a) {
                  return -1;
                }
              });
            }

            this.isLoadingReports = false;
          })
          .catch(e => {
            this.isLoadingReports = false;
            this.reportLoadError = 'We had an issue loading reports, please refresh the page.';
          });
      }
    },

    components: {
      ReportCreator,
      PointViewer
    }
  }
</script>
