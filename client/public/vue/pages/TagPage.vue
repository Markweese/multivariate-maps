<template>
  <div class="tag-page">
    <div class="tag-page__header">
      <div class="stats-overview">
        <h2 class="header">#{{tagName}}</h2>
        <p v-if="reports">Occurences: <span>{{reports.length}}</span></p>
        <p v-if="reports">Popular Locales: <span v-for="(state, index) in statesReported">{{state}}{{index + 1 !== statesReported.length ? ', ' : ''}}</span></p>
      </div>
    </div>
    <ReportPanel v-if="reports"
      v-bind:slimView="true"
      v-bind:data='reports'
      v-bind:user='user'
      v-bind:customTitle='"Tagged Reports"'
      v-bind:displayUserPhotos="true"
    />
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
        hashTags: null,
        usernames: null,
        states: states,
        reports: null,
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
      tagName() {
        return window.location.pathname.split('/')[2];
      }
    },

    methods: {
      fetchData() {
        let dataElement = document.querySelector('#dataPasser')
        let user = dataElement.dataset.user;
        let reports = dataElement.dataset.reports;
        let hashTags = dataElement.dataset.hashtags;
        let usernames = dataElement.dataset.usernames;

        this.user = user ? JSON.parse(user) : null;
        this.reports = reports ? JSON.parse(reports) : null;
        this.hashTags = hashTags ? JSON.parse(hashTags) : null;
        this.usernames = usernames ? JSON.parse(usernames) : null;
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
