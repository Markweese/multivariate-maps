<template>
  <div class="content-flagger">
    <form class="content-flagger__form" action="index.html" method="post">
      <label for="violation">Select A Violation Type</label>
      <select required name="violation" v-model="violation">
        <option value="inaccurate">inaccurate</option>
        <option value="unethical">unethical fishing practices</option>
        <option value="spam">spam</option>
        <option value="offensive">offensive</option>
        <option value="moderator">needs moderator attention</option>
      </select>
      <label for="comment">Additional Comments (optional)</label>
      <textarea name="comment" rows="8" cols="80" v-model="comment"></textarea>
      <div>
        <button class="button button-blue --inline" @click="submitFlag($event)" type="submit" name="submit">Submit Complaint</button>
        <button class="button button-red --inline" @click="closeFlag()" type="button" name="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script>
  import axios from 'axios';
  import { FlashUtils } from '../mixins/flashUtils.js';

  export default {
    props: [
      'user',
      'contentType',
      'contentId'
    ],

    data() {
      return {
        comment: null,
        violation: 'inaccurate',
        flashMessages: document.querySelector('.flash-messages')
      }
    },

    methods: {
      submitFlag(event) {
        event.preventDefault();

        if (this.contentType === 'report') {
          axios({
            method: 'post',
            url: `/reports/flag/${this.contentId}`,
            data: {
              violation: this.violation,
              comment: this.comment
            }
          })
          .then(res => {
            if (res.data.status === 200) {
              this.flashMessages.appendChild(this.generateSuccess('Issue recorded'));
              this.closeFlag()
            } else if (res.data.errors.length) {
               res.data.errors.forEach(e => {
                  this.flashMessages.appendChild(this.generateError(e.msg));
                });

                this.closeFlag()
            }
          })
          .catch(e => {
            this.flashMessages.appendChild(this.generateError('Issue flagging report'));
          });
        }
      },

      closeFlag() {
        this.$emit('deactivate', false);
      }
    },

    mixins: [
      FlashUtils
    ]
 }
</script>
