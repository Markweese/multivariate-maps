<template>
  <div class='datafilter'>
    <div class='datafilter__left'>
      <h2 v-if='data[data.length - 1].reading >= 0' v-bind:class='historicComparisonClass(data)' v-bind:aria-label='`most recent ${context} reading`'>{{round(data[data.length - 1].reading, 2)}}
        <span aria-label='measurement units' class='stats-summary__unit'>
          {{units}}
        </span>
        <span v-if='compareHistoric(data) && compareHistoric(data) !== "no change"' v-bind:aria-label='`change in ${context} since last measurement`' class='stats-summary__change'>
          ({{compareHistoric(data)}} <span class='stats-summary__unit'>{{units}}</span>)
        </span>
      </h2>
      <h2 v-if='!data[data.length - 1].reading && data[data.length - 1].reading >= 0'>
        {{getLastReading(data)}}
        <span aria-label='measurement units' class='stats-summary__unit'>
          {{units}}
        </span>
      </h2>
      <h2 v-if='data[data.length - 1].errorCode == "Ice"'>
        Iced
      </h2>
      <h2 v-else-if='data[data.length - 1].errorCode == "Ssn"'>
        Seasonally Inactive
      </h2>
      <h2 v-else-if='data[data.length - 1].errorCode == "Eqp"'>
        Equipment Malfunction
      </h2>
      <h2 v-else-if='typeof data[data.length - 1].errorCode == "string"'>
        Issue with meter
      </h2>
    </div>
    <div class='datafilter__right'>
      <button class="button button-blue button-small --hollow" type="button" name="button" v-bind:aria-label="showAriaTable ? 'Hide ARIA table' : 'Show ARIA table'" v-on:click="toggleTable($event)" tabindex='0'>
        {{showAriaTable ? 'Hide' : 'Show'}} ARIA Table
      </button>
      <div v-on:click='toggleFilter()' v-on:keyup='processKeyEvent($event)' class='button button-blue button-small --hollow datafilter__right--filter' aria-role='dropdown' aria-label='time filter' v-bind:aria-expanded='filterOpen ? true : false' tabindex='0'>
        <p>{{currentDuration}} Day <span class='datafilter__right--filter-arrow'>▼</span>
          <ul v-bind:class='{"dropdown":true,"--active":filterOpen}'>
            <li v-on:click='filterByTime($event, 1)' v-on:keydown='filterByTime($event, 1)' v-on:keyup='' v-if='context === "cfs"' aria-role='button' aria-label='1 day' tabindex='0'>1 Day</li>
            <li v-on:click='filterByTime($event, 7)' v-on:keydown='filterByTime($event, 7)' v-on:keyup='' aria-role='button' aria-label='7 days' tabindex='0'>7 Day</li>
            <li v-on:click='filterByTime($event, 30)' v-on:keydown='filterByTime($event, 30)' v-on:keyup='' aria-role='button' aria-label='30 days' tabindex='0'>30 Day</li>
            <li v-on:click='filterByTime($event, 365)' v-on:keydown='filterByTime($event, 365)' v-on:keyup='' v-if='context !== "cfs"' aria-role='button' aria-label='365 days' tabindex='0'>365 Day</li>
          </ul>
        </p>
      </div>
    </div>
    <AriaTable v-if='showAriaTable' v-bind:data='data' v-bind:context='context' v-bind:name='name' v-bind:duration='currentDuration'/>
  </div>
</template>
<script>
  //import aria table
  import AriaTable from './AriaTable.vue';

  //import necessary mixins
  import { ArrayUtils } from '../mixins/arrayUtils.js';
  import { HistoricComparisons, MathUtils } from '../mixins/generalUtils.js';

  export default {
    props: [
      'name',
      'data',
      'context'
    ],

    data() {
      return {
        filterOpen: false,
        currentDuration: 30,
        showAriaTable: false,
        currentData: this.data
      }
    },

    computed: {
      units() {
        if(this.context === 'cfs') {
          return 'CFS';
        } else if(this.context === 'swe') {
          return 'IN';
        } else if (this.context === 'storage') {
          return 'M³';
        }
      }
    },

    methods: {
      toggleFilter() {
        if(this.filterOpen) {
          this.filterOpen = false;
        } else {
          this.filterOpen = true;
        }
      },

      processKeyEvent(event) {
        if(event.keyCode === 13) {
          this.toggleFilter();
        }
      },

      filterByTime(e, duration) {
        if(e.code) {
          if(e.code === 'Enter') {
            this.$emit('filter', duration);
            this.currentDuration = duration;
          }
        } else {
          this.$emit('filter', duration);
          this.currentDuration = duration;
        }
      },

      toggleTable(e) {
        e.target.classList.toggle('--hollow');
        this.showAriaTable = !this.showAriaTable;
      }
    },

    mixins: [
      MathUtils,
      ArrayUtils,
      HistoricComparisons
    ],

    //import all necessary components
    components: {
      AriaTable
    }
  }
</script>
