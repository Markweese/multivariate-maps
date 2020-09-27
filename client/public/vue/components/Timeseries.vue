<template>
  <div class='timeseries'>
    <DataFilter v-on:filter='filterByTime' v-bind:data='filterDataset' v-bind:context='context' v-bind:name='data.name'/>
    <MobileChart v-bind:point='activePoint ? activePoint : parsedCurrent[parsedCurrent.length - 1]' v-bind:overview='activeOverview' v-bind:units='units'/>
    <div class='timeseries__chart-container'>
      <YLabels v-bind:labels='currentMax'/>
      <InfoPane v-if='activePoint && showInfoPane' v-bind:active='activePoint' v-bind:position='paneLeft' v-bind:overview='activeOverview' v-bind:units='units'/>
      <Tooltip v-if='activePoint && showTooltip' v-bind:active='activePoint' v-bind:tracer='tooltipTracer' v-bind:previous='getPreviousPoint(activePoint)' context='CFS'/>
      <svg class='timeseries__chart' v-bind:viewBox='svgSetup.viewBox' v-on:mouseleave='mouseLeave()' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <g class='data-frame'>
          <g class='path-group__gray' v-bind:transform='svgSetup.transform'>
            <path v-if='dataset === "cfs"' class='path-group__gray--path' v-bind:stroke-width='svgSetup.pathStroke' v-bind:d='svgPath(parsedHistoric, bezierCommand)'/>
            <g v-if='drawPoints' v-for='point in parsedHistoric'>
              <circle class='path-group__gray--point' v-bind:cx='point.x' v-bind:cy='point.y' v-bind:r='circleRadius'/>
            </g>
          </g>
          <g class='path-group__blue' v-bind:transform='svgSetup.transform'>
            <path class='path-group__blue--path' v-for='path in chunkArray(parsedCurrent, "y")' v-bind:stroke-width='svgSetup.pathStroke' v-bind:d='svgPath(path, bezierCommand)'/>
            <g class='path-group__blue--point' v-for='(point, index) in parsedCurrent'>
              <g class='percentile-display' v-if='activePoint && point.x === activePoint.x && showPercentile'>
                <g class='percentile-display__positive'>
                  <line v-bind:x1='point.x' v-bind:y1='point.fifty' v-bind:x2='point.x' v-bind:y2='point.max' v-bind:stroke-width='svgSetup.axisStroke'></line>
                  <line v-bind:x1='point.x - circleRadius' v-bind:y1='point.max' v-bind:x2='point.x + circleRadius' v-bind:y2='point.max' v-bind:stroke-width='svgSetup.axisStroke'></line>
                  <line v-bind:x1='point.x - circleRadius' v-bind:y1='point.seventy' v-bind:x2='point.x + circleRadius' v-bind:y2='point.seventy' v-bind:stroke-width='svgSetup.axisStroke'></line>
                </g>
                <g class='percentile-display__negative'>
                  <line v-bind:x1='point.x' v-bind:y1='point.fifty' v-bind:x2='point.x' v-bind:y2='point.min' v-bind:stroke-width='svgSetup.axisStroke'></line>
                  <line v-bind:x1='point.x - circleRadius' v-bind:y1='point.min' v-bind:x2='point.x + circleRadius' v-bind:y2='point.min' v-bind:stroke-width='svgSetup.axisStroke'></line>
                  <line v-bind:x1='point.x - circleRadius' v-bind:y1='point.twenty' v-bind:x2='point.x + circleRadius' v-bind:y2='point.twenty' v-bind:stroke-width='svgSetup.axisStroke'></line>
                </g>
              </g>
              <circle v-if='point.y' v-bind:class='isActive(point.x).class' v-bind:cx='point.x' v-bind:cy='point.y' v-bind:r='isActive(point.x).radius'/>
              <rect v-if='point.y == 0' class='--ice' v-bind:x='point.rectX - (pointSpacing/2)' y='0' v-bind:width='pointSpacing' v-bind:height='svgSetup.xMax'></rect>
              <rect ref='touchArea' v-bind:data-point='JSON.stringify(point)' v-on:mouseover='updateDisplay($event, point)' v-bind:x='point.rectX' y='0' v-bind:width='pointSpacing' v-bind:height='svgSetup.yMax'></rect>
            </g>
          </g>
        </g>
        <defs>
          <radialGradient id="_Radial1">
            <stop offset="0%" style="stop-color:white;stop-opacity:1"/>
            <stop offset="43%" style="stop-color:rgb(226,236,254);stop-opacity:1"/>
            <stop offset="63%" style="stop-color:rgb(154,190,251);stop-opacity:1"/>
            <stop offset="100%" style="stop-color:rgb(75,139,247);stop-opacity:1"/>
          </radialGradient>
          <linearGradient id="_Linear1" x2="0%" y2="100%">
            <stop offset="0" style="stop-color:rgb(223,228,255);stop-opacity:1"/>
            <stop offset="1" style="stop-color:rgb(122,144,255);stop-opacity:1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class='timeseries__affordance'>
      <p>slide along chart to select date</p>
    </div>
    <XLabels v-bind:labels='xLabels(filterRange)'/>
  </div>
</template>
<script>
  // import xlabels, ylabels, filters, tooltip, and infopane
  import YLabels from './YLabels.vue';
  import XLabels from './XLabels.vue';
  import Tooltip from './Tooltip.vue';
  import InfoPane from './InfoPane.vue';
  import DataFilter from './DataFilter.vue';
  import MobileChart from './MobileChart.vue';

  //import necessary mixins
  import { ArrayUtils } from '../mixins/arrayUtils.js';
  import { SvgUtils } from '../mixins/svgUtils.js'
  import { TouchUtils, HistoricComparisons } from '../mixins/generalUtils.js';

  export default {
    props: [
      'units',
      'data',
      'context'
    ],

    data() {
      return {
        dataset: this.context,
        activePoint: null,
        pointSpacing: null,
        circleRadius: null,
        paneLeft: null,
        paneStyle: null,
        filterRange: null,
        drawPoints: true,
        showPercentile: true,
        showInfoPane: true,
        showTooltip: false,
        tooltipTracer: null,
        filterDataset: this.data[this.context]
      }
    },

    mounted() {
      // set the active point immediately if user is in mobile view
      if(window.innerWidth < 725) {
        this.assignActivePoint();
      }

      // initiate touch listeners
      this.activateRefs();
    },

    beforeDestroy() {
      // remove touch liseners
      this.$refs.touchArea.forEach(touchArea => {
        touchArea.removeEventListener('touchstart', this.touchEvent);
        touchArea.removeEventListener('touchmove', this.touchEvent);
      });
    },

    computed: {

      // parsedHistoric holds all of the historic points to be charted
      parsedHistoric() {
        let points;

        if(this.filterRange){
          points = this.data[this.dataset].slice(this.data[this.dataset].length - this.filterRange, this.data[this.dataset].length);
        } else {
          points = this.data[this.dataset];
        }

        return points.map((point, i) => {
          return {
            x: i == 0 ? 0 : ((i * this.pointSpacing)) - (this.circleRadius * 2),
            y: point.fifty,
          };
        });
      },

      // allows us to fetch associated historic for a date if the point doesn't have it
      todaysHistoric() {
        let today = new Date();
        let dd = String(today.getDate());
        let mm = String(today.getMonth() + 1);

        today = mm + '/' + dd;

        let historic = this.data.historicDaily.filter(date => {
          return date.day === today;
        });

        return historic[0];
      }
    },

    methods: {

      // class generator for CFS change display
      comparePoint(point) {
        return point.fifty && point.fifty > point.y ? 'line-negative' : 'line-positive';
      },

      // called every time a touchArea is hovered or touched
      updateDisplay(event, point) {
        this.activePoint = point;

        if(this.dataset === 'cfs') {
          this.paneLeft = point.x >= (this.svgSetup.xMax / 2) ? true : false;
        }

        if(this.dataset === 'cfsInstantaneous' && document.querySelector('.tooltip')) {
          let offsetTooltip = document.querySelector('.tooltip').offsetWidth;
          let offsetYLabel = document.querySelector('.y-labels').offsetWidth;
          let parentWidth = document.querySelector('.timeseries').offsetWidth;

          if(event.clientX + offsetTooltip > parentWidth) {
            this.tooltipTracer = 'max';
          } else if(event.clientX - offsetTooltip < offsetYLabel) {
            this.tooltipTracer = offsetYLabel;
          } else {
            this.tooltipTracer = event.clientX - offsetTooltip;
          }
        }
      },

      // allows for mobile point animation
      isActive(check) {
        if(this.activePoint && check === this.activePoint.x) {
          return {class:'--active', radius:(window.innerWidth < 725 ? this.circleRadius * 3 : this.circleRadius)};
        } else {
          if(this.drawPoints) {
            return {class:'', radius:this.circleRadius};
          } else {
            return {class:'', radius:0};
          }
       }
     },

     // updates activePoint on touch event
     touchEvent(ev) {
       let x = ev.touches[ev.touches.length - 1].clientX;
       let y = ev.touches[ev.touches.length - 1].clientY;

       let target = document.elementFromPoint(x, y);

       if(target.dataset.point){
         this.activePoint = JSON.parse(target.dataset.point);
       }

       if(ev.cancelable) {
         ev.preventDefault();
       }
     },

     // triggered when a filter dropdown is selected
     filterByTime(duration) {
       if(duration == 1) {
         this.drawPoints = false;
         this.showTooltip = true;
         this.showInfoPane = false;
         this.showPercentile = false;
         this.filterRange = null;
         this.dataset = 'cfsInstantaneous';
         this.assignActivePoint();
         this.updateFilterDataset();
       }

       if(duration == 7) {
         this.drawPoints = true;
         this.showTooltip = false;
         this.showInfoPane = true;
         this.showPercentile = true;
         this.filterRange = 7;
         this.dataset = 'cfs';
         this.assignActivePoint();
         this.updateFilterDataset()
       }

       if(duration == 30) {
         this.drawPoints = true;
         this.showTooltip = false;
         this.showInfoPane = true;
         this.showPercentile = true;
         this.filterRange = null;
         this.dataset = 'cfs';
         this.assignActivePoint();
         this.updateFilterDataset();
       }
     }
   },

   // initialize all necessary utilities
    mixins: [
      SvgUtils,
      ArrayUtils,
      TouchUtils,
      HistoricComparisons
    ],

    // initialize all necessary vue components
    components: {
      YLabels,
      XLabels,
      Tooltip,
      InfoPane,
      DataFilter,
      MobileChart
    }
  }
</script>
