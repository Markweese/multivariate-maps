<template>
  <div class="report-panel">
    <div v-if="report" class="report-panel__report">
      <div class="report-panel__back-button">
        <a class="text-button --blue" :href="`/site/${report.stationNumber}`">« Back</a>
      </div>
      <div class="report-header">
        <div class="report-header__left">
          <div class="avatar-photo --medium">
            <img v-if="report.photo" v-bind:src="`data:${report.photo.contentType};base64,${getBuff(report.photo.data.data)}`" alt="user photo">
            <img v-else src="/images/photos/user-default.png" alt="user photo">
          </div>
          <div class="header-block">
            <h3 class="header-block__title">{{report.title}}</h3>
            <p class="header-block__author">{{report.author}}</p>
            <p class="header-block__author" v-if="getDisplayDate(report.startDate) !== '12/32/1969'">{{getDisplayDate(report.startDate)}}</p>
            <p v-if="report.conditions"><span v-if="report.conditions.cfs && report.conditions.cfs > 0">{{Math.round(report.conditions.cfs)}} CFS</span><span v-if="report.conditions.temp">, {{Math.round(report.conditions.temp)}} °F</span></p>
          </div>
        </div>
        <div class="report-header__right">
          <button v-on:click="openSocial === report._id ? openSocial = null : openSocial = report._id" :class="{'social-open': 1, '--active': openSocial === report._id}" type="button" name="options">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </button>
          <div :class="{'social-buttons': 1, '--active': openSocial === report._id}">
            <button :disabled="userVoted(report.votes)" @click="upvoteReport(report._id)" class="social-button social-button__upvote" type="button" name="upvote">
              <img v-if="!userVoted(report.votes)" src="/images/icons/upvote-blue.png" alt="upvote icon"/>
              <img v-else :src="userVote(report.votes) > 0 ? '/images/icons/upvote.png' : '/images/icons/upvote-inactive.png'" alt="upvote icon"/>
            </button>
            <button :disabled="userVoted(report.votes)" @click="downvoteReport(report._id)" class="social-button social-button__downvote" type="button" name="downvote">
              <img v-if="!userVoted(report.votes)" src="/images/icons/downvote-blue.png" alt="downvote icon"/>
              <img v-else :src="userVote(report.votes) < 0 ? '/images/icons/downvote.png' : '/images/icons/downvote-inactive.png'" alt="downvote icon"/>
            </button>
            <button :disabled="user && userFlagged(report.flags)" @click="flagReport = report._id" :class="{'social-button social-button__flag': 1, '--filled': userFlagged(report.flags)}" type="button" name="flag">
              <img v-if="!user" @click="flashMessages.appendChild(generateError('You need to <a href=`/login`>log in</a> to flag reports'))" src="/images/icons/flag.png" alt="flag icon"/>
              <img v-else-if="!userFlagged(report.flags)" src="/images/icons/flag.png" alt="flag icon"/>
              <img v-else src="/images/icons/flag-white.png" alt="flag icon"/>
            </button>
          </div>
          <div class="activity-icons">
            <img src="/images/icons/fish.png" v-if="report.activity.includes('fish')" alt="fishing report">
            <img src="/images/icons/outfitters.png" v-if="report.activity.includes('float')" alt="floating report">
          </div>
        </div>
      </div>
      <div v-if="report.comment" class="report-body">
        <p class="report-body__copy" v-html="enrichComment(report.comment)"></p>
      </div>
      <div class="report-data">
        <div class="info-section" v-if="report.activity.includes('fish') || report.activity.includes('both')">
          <h2 class="info-section__header">Fishing Information</h2>
          <div class="info-section__data --white-bg">
            <div class="info-section__block">
              <h3 class="report-data__data-title">Catches:</h3>
              <table
               v-if="report.fish.length"
               role="table"
               cellspacing=0
               class="aria-table"
               aria-label="fish caught"
               aria-describedby="table_desc">
                <caption class="aria-table__desc" id="table_desc">
                  All fish caught on {{getDisplayDate(report.startDate)}}
                </caption>
                <thead>
                  <tr role="row">
                    <th class="bl" role="columnheader">
                      species
                    </th>
                    <th role="columnheader">
                      length (in)
                    </th>
                    <th role="columnheader">
                      weight (lb)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in report.fish" role="row">
                    <td :class="{'bl': true, 'bb': i + 1 === report.fish.length}" role="cell">
                      {{row.species}}
                    </td>
                    <td :class="{'bb': i + 1 === report.fish.length}" role="cell">
                      {{row.length}}
                    </td>
                    <td :class="{'bb': i + 1 === report.fish.length}" role="cell">
                      {{row.weight}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="report-data__data-point">
                <span class="--empty">none listed</span>
              </div>
            </div>
            <div class="info-section__block">
              <h3 class="report-data__data-title">Flies:</h3>
              <table
               v-if="report.flys.length"
               role="table"
               cellspacing=0
               class="aria-table"
               aria-label="flys used"
               aria-describedby="table_desc">
                <caption class="aria-table__desc" id="table_desc">
                  All flies used on {{getDisplayDate(report.startDate)}}
                </caption>
                <thead>
                  <tr role="row">
                    <th class="bl" role="columnheader">
                      method
                    </th>
                    <th role="columnheader">
                      name
                    </th>
                    <th role="columnheader">
                      size
                    </th>
                    <th role="columnheader">
                      color
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in report.flys" role="row">
                    <td :class="{'bl': true, 'bb': i + 1 === report.flys.length}" role="cell">
                      {{row.method}}
                    </td>
                    <td :class="{'bb': i + 1 === report.flys.length}" role="cell">
                      {{row.name}}
                    </td>
                    <td :class="{'bb': i + 1 === report.flys.length}" role="cell">
                      {{row.size}}
                    </td>
                    <td :class="{'bb': i + 1 === report.flys.length}" role="cell">
                      {{row.color}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="report-data__data-point">
                <span class="--empty">none listed</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
          <h2 class="info-section__header">Float Information</h2>
          <div class="info-section__data --white-bg">
            <div class="info-section__block">
              <h3 class="report-data__data-title">Boat Launch Info:</h3>
              <div v-if="report.putIn.coordinates || report.takeOut.coordinates">
                <p class="report-data__data-point"><strong>Put In Point: </strong><span v-if="report.putIn.coordinates">{{report.putIn.name}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Take Out Point: </strong><span v-if="report.takeOut.coordinates">{{report.takeOut.name}}</span><span v-else class="--empty">none listed</span></p>
              </div>
              <div v-else class="report-data__data-point">
                <span class="--empty">none listed</span>
              </div>
            </div>
            <div class="info-section__block">
              <h3 class="report-data__data-title">Obstacles:</h3>
              <table
               v-if="report.obstacles.length"
               role="table"
               cellspacing=0
               class="aria-table"
               aria-label="obstacles encountered"
               aria-describedby="table_desc">
                <caption class="aria-table__desc" id="table_desc">
                  All obstacles reported on {{getDisplayDate(report.startDate)}}
                </caption>
                <thead>
                  <tr role="row">
                    <th class="bl" role="columnheader">
                      type
                    </th>
                    <th role="columnheader">
                      name
                    </th>
                    <th role="columnheader">
                      description
                    </th>
                    <th role="columnheader">
                      accident occurred
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in report.obstacles" role="row">
                    <td :class="{'bl': true, 'bb': i + 1 === report.obstacles.length}" role="cell">
                      {{row.obstacle}}
                    </td>
                    <td :class="{'bb': i + 1 === report.obstacles.length}" role="cell">
                      {{row.name}}
                    </td>
                    <td :class="{'bb': i + 1 === report.obstacles.length}" role="cell">
                      {{row.description}}
                    </td>
                    <td :class="{'bb': i + 1 === report.obstacles.length}" role="cell">
                      {{row.incidentOccurred ? 'yes' : 'no'}}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="report-data__data-point">
                <span class="--empty">none listed</span>
              </div>
            </div>
            <button v-if="report.obstacles.length || report.putIn.coordinates || report.takeOut.coordinates" type="button" class="text-button --blue" name="view on map" @click="openPointViewer">See on map</button>
          </div>
        </div>
        <div class="info-section">
          <h2 class="info-section__header">Comments</h2>
          <div class="info-section__data">
            <div class="comment-block" v-if="report.comments.length" v-for="comment in report.comments">
              <div class="comment-block__left">
                <p class="comment-body" v-html="enrichComment(comment.comment)"></p>
                <span class="comment-author">- <a :href="`/users/user/${comment.author}`">{{comment.author}}</a> on {{getDisplayDate(comment.date)}}</span>
              </div>
              <div class="comment-block__right">
                <button :disabled="userVoted(comment.votes)" @click="upvoteComment(report._id, comment._id)" type="button" name="upvote">
                  <img v-if="!userVoted(comment.votes)" src="/images/icons/upvote-blue.png" alt="upvote icon"/>
                  <img v-else :src="userVote(comment.votes) > 0 ? '/images/icons/upvote.png' : '/images/icons/upvote-inactive.png'" alt="upvote icon"/>
                </button>
                <span class="comment-score">{{comment.score}}</span>
                <button :disabled="userVoted(comment.votes)" @click="downvoteComment(report._id, comment._id)" type="button" name="downvote">
                  <img v-if="!userVoted(comment.votes)" src="/images/icons/downvote-blue.png" alt="downvote icon"/>
                  <img v-else :src="userVote(comment.votes) < 0 ? '/images/icons/downvote.png' : '/images/icons/downvote-inactive.png'" alt="downvote icon"/>
                </button>
              </div>
            </div>
            <button v-if="user && !writingComment" @click="writingComment = true" class="edit-button button button-green" type="button" name="Leave a comment">+ Add Comment</button>
            <a v-if="!user" href="/login" class="button button-inactive" type="button" name="Log In">Log In To Comment</a>
            <form v-if="user && writingComment" class="comment-box" method="post">
              <textarea :id="`comment${report._id}`"  name="comment" rows="8" cols="80" maxlength="30000" @input="setComment($event)" v-model="comment"></textarea>
              <div class="comment-tag-dropdown" v-if="userOptions && userOptions.length">
                <button class="comment-tag" v-for="user in userOptions" type="button" :name="user.name" v-on:click="autocompleteComment(user.name, report._id)">
                  <img class="avatar-photo --small" v-if="user.photo" v-bind:src="`data:${user.photo.contentType};base64,${getBuff(user.photo.data.data)}`" alt="user photo">
                  <img class="avatar-photo --small" v-else-if="user.name" src="/images/photos/user-default.png" alt="user photo">
                  {{user.name}}
                </button>
              </div>
              <div class="comment-tag-dropdown" v-if="hashtagOptions && hashtagOptions.length">
                <button class="comment-tag" v-for="tag in hashtagOptions" type="button" :name="tag" v-on:click="autocompleteComment(tag, report._id)">
                  #{{tag}}
                </button>
              </div>
              <fieldset>
                <button @click="submitComment($event, report._id)" type="submit" class="edit-button button button-blue --inline" name="submit comment">Submit</button>
                <button @click="writingComment = false" class="edit-button button button-red --inline" type="button" name="Cancel">Cancel</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ContentFlag v-if="user && flagReport" v-on:deactivate="closeFlagger" contentType="report" v-bind:contentId="flagReport" v-bind:user="user"></ContentFlag>
    <PointViewer v-if="pointViewerOpen" v-on:deactivate="closePointViewer" v-bind:points="pointViewerPoints"></PointViewer>
  </div>
</template>
<script>
  import axios from 'axios';
  import { FlashUtils } from '../mixins/flashUtils.js';
  import { ImageUtils } from '../mixins/imageUtils.js';
  import { CommentUtils } from '../mixins/commentUtils.js';
  import ContentFlag from '../components/ContentFlag.vue';
  import PointViewer from '../components/PointViewer.vue';
  import ReportCreator from '../components/ReportCreator.vue';

  export default {
    data() {
      return {
        user: null,
        report: null,
        allFish: [],
        allFlys: [],
        comment: null,
        hashTags: null,
        usernames: null,
        flagReport: null,
        openSocial: null,
        userOptions: null,
        hashtagOptions: null,
        isReporting: false,
        isLoadingReports: false,
        reportLoadError: null,
        pointViewerOpen: false,
        pointViewerPoints: [],
        writingComment: false,
        flashMessages: document.querySelector('.flash-messages')
      }
    },

    mounted() {
      this.fetchData();
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
      fetchData() {
        let dataElement = document.querySelector('#dataPasser')
        let user = dataElement.dataset.user;
        let report = dataElement.dataset.report;
        let hashTags = dataElement.dataset.hashtags;
        let usernames = dataElement.dataset.usernames;

        this.user = user ? JSON.parse(user) : null;
        this.report = report ? JSON.parse(report) : null;
        this.hashTags = hashTags ? JSON.parse(hashTags) : null;
        this.usernames = usernames ? JSON.parse(usernames) : null;
      },

      openReport() {
        this.isReporting = true;
      },
      closeReport() {
        this.isReporting = false;
      },
      successfulCreate(options) {
        this.reports.unshift(options.report);
        this.sendNotifications(options.hashTags, options.userTags, options.report._id);
      },
      closeFlagger() {
        this.flagReport = null;
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
      openPointViewer() {
          let points = this.report.obstacles.map(o => {
            return {
              latLng: {
                lat: o.coordinates[0],
                lng: o.coordinates[1]
              },
              icon: '/images/icons/hazard-marker.png',
              place: o
            }
          });

          if (this.report.putIn.coordinates) {
            points.push(
              {
                latLng: {
                  lat: this.report.putIn.coordinates[0],
                  lng: this.report.putIn.coordinates[1]
                },
                icon: '/images/icons/boat-launch-marker.png',
                place: this.report.putIn
              }
            );
          }

          if (this.report.takeOut.coordinates) {
            points.push(
              {
                latLng: {
                  lat: this.report.takeOut.coordinates[0],
                  lng: this.report.takeOut.coordinates[1]
                },
                icon: '/images/icons/boat-launch-marker.png',
                place: this.report.takeOut
              }
            );
          }

          this.pointViewerOpen = true;
          this.pointViewerPoints = points;
      },

      upvoteReport(reportId) {
        if (this.user) {
          axios.post(`/reports/upvote/${reportId}`)
            .then(res => {
              if (res.data.status === 200) {
                this.flashMessages.appendChild(this.generateSuccess(res.data.msg));
              }

              if (res.data.status === 401) {
                this.flashMessages.appendChild(this.generateError(res.data.msg));
              }

              this.openSocial = null;
            });
        } else {
          this.flashMessages.appendChild(this.generateError('You need to <a href="/login">log in</a> to vote'));
        }
      },

      downvoteReport(reportId) {
        if (this.user) {
          axios.post(`/reports/downvote/${reportId}`)
            .then(res => {
              if (res.data.status === 200) {
                this.flashMessages.appendChild(this.generateSuccess(res.data.msg));
              }

              if (res.data.status === 401) {
                this.flashMessages.appendChild(this.generateError(res.data.msg));
              }

              this.openSocial = null;
            });
          } else {
            this.flashMessages.appendChild(this.generateError('You need to <a href="/login">log in</a> to vote'));
          }
      },

      userFlagged(flags) {
        if (flags && this.user) {
            return flags.find(f => f.flagger.toString() === this.user._id.toString());
        } else {
          return false;
        }
      },

      userVoted(votes) {
        if (votes && this.user) {
          return votes.find(v => v.userId.toString() === this.user._id.toString());
        } else {
          return false;
        }
      },

      userVote(votes) {
        if (votes && this.user) {
          return votes.find(v => v.userId.toString() === this.user._id.toString()).vote;
        } else {
          return null;
        }
      },

      submitComment(event, reportId) {
        event.preventDefault();

        const commentId = `${this.user._id}-${Math.random().toString(36).substring(7)}`
        const tags = this.parseTags(this.comment);

        const commentObject = {
                                commentId,
                                date: new Date().toISOString(),
                                author: this.user.name,
                                authorId: this.user._id,
                                replyTo: null,
                                score: 0,
                                comment: this.comment,
                                hashTags: tags.hashTags,
                                userTags: tags.userTags
                              };

        axios({
          method: 'post',
          url: `/reports/comment/add/${reportId}`,
          data: commentObject
        })
        .then(res => {
          if (res.data.status === 200) {
            this.writingComment = false;
            this.report.comments.push(commentObject);
            this.flashMessages.appendChild(this.generateSuccess('Comment recorded'));
            this.sendNotifications(tags.hashTags, tags.userTags, reportId, commentId);
          } else if (res.data.errors.length) {
             res.data.errors.forEach(e => {
                this.flashMessages.appendChild(this.generateError(e.msg));
              });
          }
        });
      },
      getDisplayDate(date) {
        const d = new Date(date);

        return `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
      },
    },

    mixins: [
      FlashUtils,
      ImageUtils,
      CommentUtils
    ],

    components: {
      ReportCreator,
      PointViewer,
      ContentFlag
    }
  }
</script>
