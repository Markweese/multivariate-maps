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
          <p v-if="user.reports.length">Reports Created: {{user.reports.length}}</p>
          <p v-if="(user.activity === 'fish' || user.activity === 'both') && user.reports">Fish Caught: {{fishCount}}</p>
        </div>
      </div>
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
  import { FlashUtils } from '../mixins/flashUtils.js';
  import { ImageUtils } from '../mixins/imageUtils.js';
  import ContentFlag from '../components/ContentFlag.vue';
  import PointViewer from '../components/PointViewer.vue';
  import { CommentUtils } from '../mixins/commentUtils.js';

  export default {
    data() {
      return {
        user: null,
        viewingUser: null,
        isDashboard: null
      }
    },

    mounted() {
      this.fetchData();
    },

    computed: {
      fishCount() {
        return this.user.reports.reduce((acc, r) => {
          acc + r.fish.length;
        });
      }
    },

    methods: {
      fetchData() {
        let dataElement = document.querySelector('#dataPasser')
        let user = dataElement.dataset.user;
        let dashboard = dataElement.dataset.dashboard;
        let viewingUser = dataElement.dataset.viewinguser;

        this.user = user ? JSON.parse(user) : null;
        this.isDashboard = dashboard === 'true' ? true : false;
        this.viewingUser = viewingUser ? JSON.parse(viewingUser) : null;
      }
    },

    mixins: [
      FlashUtils,
      ImageUtils,
      CommentUtils
    ],

    components: {
      PointViewer,
      ContentFlag
    }
  }
</script>
