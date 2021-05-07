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
        <div v-for="report in pageItems" :key="report._id" class="report-panel__report" v-if="report.score > -10">
          <div class="report-header">
            <div class="report-header__left">
              <div class="avatar-photo --medium">
                <img v-if="report.photo" v-bind:src="`data:${report.photo.contentType};base64,${getBuff(report.photo.data.data)}`" alt="user photo">
                <img v-else src="/images/photos/user-default.png" alt="user photo">
              </div>
              <div class="header-block">
                <h3 class="header-block__title">{{report.title}}</h3>
                <a class="header-block__author --link" :href="`/user/${report.author}`">{{report.author}}</a>
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
                <!-- Report Editin, needs work -->
                <!-- <button v-if="user._id === report.authorId" class="social-button social-button__edit" type="button" name="edit">
                  <img src="/images/icons/edit.png" alt="edit icon"/>
                </button> -->
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
              <h2 class="info-section__header">Fishing Information <button class="button button-blue --inline" name="show fish information" aria-haspopup="true" @click="report.fishOpen = !report.fishOpen" :aria-expanded="report.fishOpen">{{report.fishOpen ? 'Close' : 'View'}}<img :src="`${report.fishOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.fishOpen">
                <p class="report-data__data-point"><strong>Number Caught: </strong><span v-if="report.numCaught">{{report.numCaught}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Species Reported: </strong><span v-if="report.fish.length" v-for="(species, index) in getSpecies(report.fish)">{{species}}</span><span v-if="!report.fish.length" class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Flies Used: </strong><span v-if="report.flys.length" v-for="(fly, index) in report.flys">{{fly.name}}</span><span v-if="!report.flys.length"class="--empty">none listed</span></p>
              </div>
            </div>
            <div class="info-section" v-if="report.activity.includes('float') || report.activity.includes('both')">
              <h2 class="info-section__header">Float Information <button class="button button-blue --inline" name="show navigation information" aria-haspopup="true" @click="report.navOpen = !report.navOpen" :aria-expanded="report.navOpen">{{report.navOpen ? 'Close' : 'View'}}<img :src="`${report.navOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.navOpen">
                <p class="report-data__data-point"><strong>Obstacles: </strong><span v-if="report.obstacles.length">{{report.obstacles.length}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Put In Point: </strong><span v-if="report.putIn.coordinates">{{report.putIn.name}}</span><span v-else class="--empty">none listed</span></p>
                <p class="report-data__data-point"><strong>Take Out Point: </strong><span v-if="report.takeOut.coordinates">{{report.takeOut.name}}</span><span v-else class="--empty">none listed</span></p>
                <button v-if="report.obstacles.length || report.putIn.coordinates || report.takeOut.coordinates" type="button" class="text-button --blue" name="view on map" @click="openPointViewer(report)">See on map</button>
              </div>
            </div>
            <div class="info-section">
              <h2 class="info-section__header">Comments <button class="button button-blue --inline" name="show navigation information" aria-haspopup="true" @click="report.commentsOpen = !report.commentsOpen" :aria-expanded="report.commentsOpen">{{report.commentsOpen ? 'Close' : 'View Comments'}}<span v-if="report.comments.length && !report.commentsOpen"> ({{report.comments.length}})</span><img :src="`${report.commentsOpen ? '/images/icons/upvote-white.png' : '/images/icons/downvote-white.png'}`" alt="close"/></button></h2>
              <div class="info-section__data" v-if="report.commentsOpen">
                <div class="comment-block" v-if="report.comments.length" v-for="comment in report.comments">
                  <div class="comment-block__left">
                    <p class="comment-body" v-html="enrichComment(comment.comment)"></p>
                    <span class="comment-author">- <a :href="`/user/${comment.author}`">{{comment.author}}</a> on {{getDisplayDate(comment.date)}}</span>
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
                <button v-if="user && !report.writingComment" @click="report.writingComment = true" class="edit-button button button-green" type="button" name="Leave a comment">+ Add Comment</button>
                <a v-if="!user" href="/login" class="button button-inactive" type="button" name="Log In">Log In To Comment</a>
                <form v-if="user && report.writingComment" class="comment-box" method="post">
                  <textarea :id="`comment${report._id}`" name="comment" rows="8" cols="80" maxlength="30000" @focus="activateComment(report._id, $event)" @focusout="currentReport = null" @input="setComment($event)"></textarea>
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
                    <button @click="report.writingComment = false" class="edit-button button button-red --inline" type="button" name="Cancel">Cancel</button>
                  </fieldset>
                </form>
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
          <div class="report-actions">
            <a :href="`/report/${report._id}`" class="button button-blue button-small" type="button" name="see full report">View Report</a>
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
    <ReportCreator v-if="user && isReporting" v-on:deactivate="closeReport" v-on:successfulCreate="successfulCreate" v-bind:data="data" v-bind:user="user" v-bind:usernames="usernames" v-bind:hashTags="hashTags"></ReportCreator>
    <ContentFlag v-if="user && flagReport" v-on:deactivate="closeFlagger" contentType="report" v-bind:contentId="flagReport" v-bind:user="user"></ContentFlag>
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
    props: [
      'data',
      'user',
      'usernames',
      'hashTags'
    ],

    data() {
      return {
        currentPage: 1,
        currentReport: null,
        currentComment: null,
        perPage: 3,
        perPageMobile: 1,
        reports: null,
        allFish: [],
        allFlys: [],
        flagReport: null,
        openSocial: null,
        userOptions: null,
        hashtagOptions: null,
        isReporting: false,
        isLoadingReports: false,
        reportLoadError: null,
        pointViewerOpen: false,
        pointViewerPoints: [],
        flashMessages: document.querySelector('.flash-messages')
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
            this.isLoadingReports = false;
            this.reportLoadError = 'We had an issue loading reports, please refresh the page.';
          });
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

        const comment = document.getElementById(`comment${reportId}`).value;
        const commentId = `${this.user._id}-${Math.random().toString(36).substring(7)}`
        const tags = this.parseTags(comment);

        const commentObject = {
                                commentId,
                                date: new Date().toISOString(),
                                author: this.user.name,
                                authorId: this.user._id,
                                replyTo: null,
                                score: 0,
                                comment: comment,
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
            const rIndex = this.reports.findIndex(r => r._id === reportId);
            this.reports[rIndex].writingComment = false;
            this.reports[rIndex].comments.push(commentObject);
            this.flashMessages.appendChild(this.generateSuccess('Comment recorded'));
            this.sendNotifications(tags.hashTags, tags.userTags, reportId, commentId);
          } else if (res.data.errors.length) {
             res.data.errors.forEach(e => {
                this.flashMessages.appendChild(this.generateError(e.msg));
              });
          }
        });
      }
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
