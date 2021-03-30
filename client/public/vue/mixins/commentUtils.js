import axios from 'axios';

const CommentUtils = {
  methods: {
    parseTags(comment) {
      const hashRe = /(#)(.*?)(\s|$|,|\.|\;|!|\?)/gm;
      const userRe = /(@)(.*?)(\s|$|,|\.|\;|!|\?)/gm;
      const userTags = comment.match(userRe);
      const hashTags = comment.match(hashRe);
      const userTagsClean = userTags ? userTags.map(t => {return t.replace(/[\s|@]/g, '')}) : userTags;
      const hashTagsClean = hashTags ? hashTags.map(t => {return t.replace(/[\s|#]/g, '')}) : hashTags;

      return {hashTags: hashTagsClean, userTags: userTagsClean}
    },

    sendNotifications(hashTags, userTags, id, commentId) {
      const commentedUser = id && this.reports ? this.reports.find(r => r._id === id) : null;

      const sendObject =   {
              date: new Date().toISOString(),
              tags: hashTags,
              userTags: userTags,
              reportId: id ? id : null,
              commentId: commentId ? commentId : null,
              authorId: commentedUser ? commentedUser.authorId : null
            }

            console.log(sendObject)

      if (hashTags) {
        axios({
          method: 'post',
          url: `/reports/comment/register-tags`,
          data: sendObject
        })
        .catch(e => {
          console.log(e);
        })
      }

      if (userTags) {
        axios({
          method: 'post',
          url: `/reports/comment/notify-tagged`,
          data: sendObject
        })
        .catch(e => {
          console.log(e);
        })
      }

      if (commentedUser && commentedUser._id) {
        axios({
          method: 'post',
          url: `/reports/comment/notify-commented`,
          data: sendObject
        })
        .catch(e => {
          console.log(e);
        })
      }
    },

    activateComment(id, e) {
      const targetEl = document.getElementById(`comment${id}`);
      this.currentReport = id;

      targetEl.focus();
    },

    setComment(e) {
      const re = /(#|@)[^@]*$/;
      const word = event.target.value.split(' ')[event.target.value.split(' ').length - 1];
      const tag = re.exec(word);

      if (tag) {
          if (tag[1] === '@') {
            this.hashtagOptions = null;
            this.userOptions = this.usernames.filter(u => u.name && u.name.toLowerCase().includes(tag[0].substring(1).toLowerCase()));
          } else if (tag[1] === '#') {
            this.userOptions = null;
            this.hashtagOptions = this.hashTags.filter(h => h.includes(tag[0].substring(1)));
          } else {
            this.userOptions = null;
            this.hashtagOptions = null;
          }
      }
    },

    autocompleteComment(term, id) {
      const re = /(#|@)[^#|@]*$/;
      const targetEl = document.getElementById(`comment${id}`);

      this.currentReport = id;
      this.userOptions = null;
      this.hashtagOptions = null;

      if (this.comment) {
        this.comment = this.comment.replace(re, '$1') + term;
      } else {
        targetEl.value = targetEl.value.replace(re, '$1') + term;
        targetEl.focus();
      }
    },

    enrichComment(comment) {
      const hashRe = /(#)(.*?)(\s|$|,|\.|\;|!|\?)/gm;
      const userRe = /(@)(.*?)(\s|$|,|\.|\;|!|\?)/gm;

      comment = comment.replace(hashRe, '<a href="/reports/tag/$2">$1$2</a>$3');
      comment = comment.replace(userRe, '<a href="/users/user/$2">$1$2</a>$3');

      return comment;
    },

    upvoteComment(reportId, commentId) {
      axios.post(`/reports/comment/upvote/${reportId}/${commentId}`)
        .then(res => {
          if (res.data.status === 200) {
            this.flashMessages.appendChild(this.generateSuccess(res.data.msg));
          }

          if (res.data.status === 401) {
            this.flashMessages.appendChild(this.generateError(res.data.msg));
          }
        });
    },

    downvoteComment(reportId, commentId) {
      axios.post(`/reports/comment/downvote/${reportId}/${commentId}`)
        .then(res => {
          if (res.data.status === 200) {
            this.flashMessages.appendChild(this.generateSuccess(res.data.msg));
          }

          if (res.data.status === 401) {
            this.flashMessages.appendChild(this.generateError(res.data.msg));
          }
        });
    }
  }
}

export {
  CommentUtils
};
