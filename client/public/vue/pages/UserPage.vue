<template>
  <div class="user-page">
    <div v-if="user" class="user-page__header">
      <div class="avatar-photo --large">
        <img v-if="user.photo" v-bind:src="`data:${user.photo.contentType};base64,${getBuff(user.photo.data.data)}`" alt="user photo">
        <img v-else src="/images/photos/user-default.png" alt="user photo">
      </div>
      <div class="stats-overview">
        <h2>{{user.name}}</h2>
      </div>
    </div>
    <div v-else class="user-page__header">
      <div class="avatar-photo --large">
        <img src="/images/photos/user-default.png" alt="user photo">
      </div>
      <div class="stats-overview">
        <h2>user not found</h2>
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
