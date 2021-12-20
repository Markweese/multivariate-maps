<template>
  <div class="user-page">
    <div v-if="user">
      <div class="user-page__header">
        <div class="avatar-photo --large">
          <img v-if="user.photo" v-bind:src="`data:${user.photo.contentType};base64,${getBuff(user.photo.data.data)}`" alt="user photo">
          <img v-else src="/images/photos/user-default.png" alt="user photo">
        </div>
        <div class="stats-overview">
          <h2 class="header">{{user.name}}</h2>
          <div v-if="user.activity" class="activities">
            <img v-if="user.activity === 'fish' || user.activity === 'both'" src="/images/icons/fish.png" alt="fishing"/>
            <img v-if="user.activity === 'float' || user.activity === 'both'" src="/images/icons/outfitters.png" alt="floating"/>
          </div>
          <p v-if="reports && reports.length">Trips Logged: <span>{{reports.length}}</span></p>
          <p v-if="reports && states.length">Regular Haunts: <span v-for="(state, index) in statesReported">{{state}}{{index + 1 !== statesReported.length ? ', ' : ''}}</span></p>
          <p v-if="['fish', 'both'].includes(user.activity) && reports">Primary Species: <span v-for="(species, index) in primarySpecies">{{species}}{{index + 1 !== primarySpecies.length ? ', ' : ''}}</span></p>
          <p v-if="['float', 'both'].includes(user.activity) && user.waterCraft">Boat: <span>{{user.waterCraft.length}} foot {{user.waterCraft.make}} {{user.waterCraft.model}}</span></p>
        </div>
      </div>
      <ReportPanel v-if="reports" v-bind:slimView="true" v-bind:data='reports' v-bind:user='user' v-bind:usernames='usernames' v-bind:hashTags='hashTags'/>
    </div>
    <!-- invalid username -->
    <div v-else>
      <div class="user-page__header">
        <div class="avatar-photo --large">
          <img src="/images/photos/user-default.png" alt="user photo">
        </div>
        <div class="stats-overview">
          <h2 class="header">user not found</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios';
  import states from '../../data/states';
  import { FlashUtils } from '../mixins/flashUtils.js';
  import { ImageUtils } from '../mixins/imageUtils.js';
  import ContentFlag from '../components/ContentFlag.vue';
  import PointViewer from '../components/PointViewer.vue';
  import ReportPanel from '../components/ReportPanel.vue';
  import { CommentUtils } from '../mixins/commentUtils.js';

  export default {
    data() {
      return {
        user: null,
        states: states,
        hashTags: null,
        usernames: null,
        reports: null,
        viewingUser: null,
        isDashboard: null,
        isLoadingReports: false,
        reportLoadError: null
      }
    },

    mounted() {
      this.fetchData();
    },

    computed: {
      statesReported() {
        const uniqueStates = [];
        this.reports.forEach(r => {
          const state = this.states.find(s => s.fip === r.state);

          if (!uniqueStates.includes(state.name)) {
            uniqueStates.push(state.name);
          }
        });

        return uniqueStates;
      },
      homeStateName() {
        const state = this.states.find(s => s.abbr === this.user.origin);
        return state.name;
      },
      primarySpecies() {
        const uniqueSpecies = [];
        this.reports.forEach(r => {
          r.fish.forEach(f => {
            if (!uniqueSpecies.includes(f.species)) {
              uniqueSpecies.push(f.species);
            }
          });
        });

        return uniqueSpecies;
      }
    },

    methods: {
      fetchData() {
        let dataElement = document.querySelector('#dataPasser')
        let user = dataElement.dataset.user;
        let hashTags = dataElement.dataset.hashtags;
        let usernames = dataElement.dataset.usernames;
        let dashboard = dataElement.dataset.dashboard;
        let viewingUser = dataElement.dataset.viewinguser;

        this.user = user ? JSON.parse(user) : null;
        this.hashTags = hashTags ? JSON.parse(hashTags) : null;
        this.usernames = usernames ? JSON.parse(usernames) : null;
        this.isDashboard = dashboard === 'true' ? true : false;
        this.viewingUser = viewingUser ? JSON.parse(viewingUser) : null;

        if (this.user && this.user.reports) {
          this.getReports();
        }
      },

      getReports() {
        this.isLoadingReports = true;

        axios.get(`/user/reports/${this.user._id}`)
          .then(res => {
            if (res.data.status === 200) {
              this.reports = res.data.data.map(r => {
                r.navOpen = false;
                r.fishOpen = false;
                r.boatOpen = false;
                r.commentsOpen = false;
                r.writingComment = false;

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
            console.log(e);
            this.isLoadingReports = false;
            this.reportLoadError = 'We had an issue loading reports, please refresh the page.';
          });
      }
    },

    mixins: [
      FlashUtils,
      ImageUtils,
      CommentUtils
    ],

    components: {
      PointViewer,
      ContentFlag,
      ReportPanel
    }
  }
</script>
