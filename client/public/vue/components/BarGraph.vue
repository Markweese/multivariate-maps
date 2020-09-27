<template>
  <div class='bargraph' v-if='parsedCurrent.length > 0'>
    <DataFilter v-on:filter='filterByTime' v-bind:data='filterDataset' v-bind:context='context' v-bind:name='data.name'/>
    <h2 class='bargraph__title'>{{data.name}}</h2>
    <MobileChart v-bind:point='activePoint ? activePoint : parsedCurrent[parsedCurrent.length - 1]' v-bind:overview='activeOverview' v-bind:units='units'/>
    <div v-if='currentMax > 1'>
      <div class='bargraph__chart-container'>
        <YLabels v-bind:labels='currentMax.toFixed(2)'/>
        <InfoPane v-if='activePoint && showInfoPane' v-bind:active='activePoint' v-bind:position='paneLeft' v-bind:overview='activeOverview' v-bind:units='units'/>
        <Tooltip v-if='activePoint && showTooltip' v-bind:active='activePoint' v-bind:tracer='tooltipTracer' v-bind:previous='getPreviousPoint(activePoint)' v-bind:context='units'/>
        <svg class='bargraph__chart' v-bind:viewBox='`0 0 ${determineSvgX} ${determineSvgY}`' v-on:mouseleave='mouseLeave()' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <g class='bargraph__chart--data-frame' v-bind:transform='`scale(1, -1) translate(0, -${determineSvgY})`'>
            <g class='bar-group' v-for='(point, index) in parsedCurrent'>
              <g class='bargraph__chart--bars'>
                <rect class='bar --dark' v-bind:x='getXSpacing(point, index, "current")' y='0' v-bind:width='pointSpacing' v-bind:height='showMultiple ? point.y * 2 : point.y'></rect>
                <rect v-if='showOverlay' class='bar --opaque' v-bind:x='getXSpacing(point, index, "current")' y='0' v-bind:width='pointSpacing' v-bind:height='showMultiple ? point.fifty * 2 : point.fifty'></rect>
                <rect v-if='showMultiple' class='bar --light' ref='touchArea' v-bind:x='getXSpacing(point, index, "historic")' y='0' v-bind:width='pointSpacing' v-bind:height='showMultiple ? point.fifty * 2 : point.fifty'></rect>
              </g>
              <rect v-if='point.y' v-bind:class='"bar-highlighter " + isActive(point.x)' v-bind:x='getXSpacing(point, index, "current")' y='0' v-bind:width='showMultiple ? pointSpacing * 2 : pointSpacing' v-bind:height='determineSvgY' v-bind:stroke-width='svgSetup.axisStroke'/>
              <rect class='touch-rect' v-bind:x='getXSpacing(point, index, "current")' y='0' ref='touchArea' v-bind:width='pointSpacing * 2' v-bind:height='determineSvgY' v-on:mouseover='updateDisplay($event, point)' v-bind:data-point='JSON.stringify(point)'></rect>
            </g>
          </g>
        </svg>
      </div>
      <XLabels v-bind:labels='convertXLabels'/>
    </div>
    <div class='insufficient-data' v-else>
      <h3>Limited Data</h3>
      <div class='insufficient-data--image'>
        <img v-bind:src='`/images/icons/${context}-icon.png`'/>
      </div>
      <p class='insufficient-data--info'>There isn't much data to show. Adjust the time filter to show more data.</p>
    </div>
  </div>
</template>
<script>
  // import tooltip, import xLabels, import yLabels, import dataFilter
  import YLabels from './YLabels.vue';
  import XLabels from './XLabels.vue';
  import Tooltip from './Tooltip.vue';
  import InfoPane from './InfoPane.vue';
  import DataFilter from './DataFilter.vue';
  import MobileChart from './MobileChart.vue';

  // import necessary components
  import { SvgUtils } from '../mixins/svgUtils.js';
  import { ArrayUtils } from '../mixins/arrayUtils.js';
  import { TouchUtils, HistoricComparisons } from '../mixins/generalUtils.js';

  // import array of months
  import monthNames from '../../../data/months';

  export default {
    props: ['data', 'context', 'units'],

    data() {
      return {
        filterRange: 30,
        activePoint: null,
        showOverlay: true,
        showMultiple: false,
        groupSpacing: null,
        pointSpacing: null,
        dataset: this.context,
        tooltipTracer: null,
        paneLeft: null,
        paneStyle: null,
        showTooltip: false,
        showInfoPane: true,
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

    computed: {
      convertXLabels() {
        if(this.filterRange === 365) {
          let labels = this.xLabels(12)

          return labels.map(label => {
            return monthNames[parseInt(label) - 1];
          });
        } else {
          return this.xLabels(1);
        }
      },

      determineSvgX() {
        if(this.showMultiple) {
          return this.svgSetup.xMax + ((this.pointSpacing * 2) * this.parsedCurrent.length - 1);
        } else {
          return this.svgSetup.xMax + this.pointSpacing;
        }
      },

      determineSvgY() {
        if(this.showMultiple) {
          return this.svgSetup.yMax * 2;
        } else {
          return this.svgSetup.yMax;
        }
      }
    },

    methods: {
      filterByTime(duration) {
        this.filterRange = duration;

        if(duration === 365) {
          this.showInfoPane = true;
          this.showTooltip = false;
          this.dataset = `${this.context}Monthly`;
          this.assignActivePoint();
          this.updateFilterDataset();
        } else {
          this.showTooltip = false;
          this.showInfoPane = true;
          this.dataset = this.context.split("Monthly")[0];
          this.assignActivePoint();
          this.updateFilterDataset();
        }

        if(duration === 30) {
          this.showOverlay = true;
          this.showMultiple = false;
        } else {
          this.showOverlay = false;
          this.showMultiple = true;
        }
      },

      getXSpacing(point, index, barType) {
        let barX;
        let indexCurrent = index === 0 ? 0 : (index * 2);
        let indexHistoric = index === 0 ? 1 : (index * 2) + 1;

        if(barType === 'current'){
          if(this.showMultiple){
            barX = point.barX + (this.pointSpacing * (indexCurrent));
          } else {
            barX = point.barX;
          }
        }

        if(barType === 'historic'){
          barX = point.barX + (this.pointSpacing * (indexHistoric));
        }

        return barX;
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

      // called every time a touchArea is hovered or touched
      updateDisplay(event, point) {
        this.activePoint = point;

        if(this.filterRange !== 365 && document.querySelector('.tooltip')) {
          let offsetTooltip = document.querySelector('.tooltip').offsetWidth;
          let offsetYLabel = document.querySelector('.y-labels').offsetWidth;
          let parentWidth = document.querySelector('.bargraph').offsetWidth;

          if(event.clientX + offsetTooltip > parentWidth) {
            this.tooltipTracer = 'max';
          } else if(event.clientX - offsetTooltip < offsetYLabel) {
            this.tooltipTracer = offsetYLabel;
          } else {
            this.tooltipTracer = event.clientX - offsetTooltip;
          }
        } else {
          this.paneLeft = point.x >= (this.svgSetup.xMax / 2) ? true : false;
        }
      },

      // allows for mobile point animation
      isActive(check) {
        if(this.activePoint && check === this.activePoint.x) {
          return '--active';
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

    //import all necessary components
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
