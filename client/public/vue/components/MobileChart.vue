<template>
  <div class='mobile-chart'>
    <h3 class='mobile-chart__title'>{{point.time ? point.time : point.month ? parseMonth(point.month) : point.date}}</h3>
    <div v-if='point.y && !point.errorCode' class='mobile-chart__overview'>
      <p v-if='point.y > 0 || point.fifty > 0' v-bind:class='overview.class'>{{overview.title}}</p>
      <p v-if='point.y > 0 || point.fifty > 0' class='mobile-chart__overview--details'>{{overview.description}}</p>
    </div>
    <div class='mobile-chart__bars'>
      <div class='mobile-chart__bars--bar'>
        <p v-if='point.y >= 0' class='mobile-chart__bars--reading'>Reading: {{round(point.y, 2)}}<span>{{units}}</span></p>
        <p v-else-if='point.y <= 0 && point.errorCode === "Ice"' class='--ice'>Iced</p>
        <p v-else-if='point.y <= 0 && point.errorCode === "Eqp"'>Equipment Malfunction</p>
        <p v-else-if='point.y <= 0 && point.errorCode === "Ssn"'>Seasonally Inactive</p>
        <p v-else-if='point.y <= 0 && typeof point.errorCode === "string"'>Issue with meter</p>
        <div v-if='point.y > 0 || point.fifty > 0' class='mobile-chart__bars--current' v-bind:style='calcWidth.current'></div>
      </div>
      <div class='mobile-chart__bars--bar'>
        <p class='mobile-chart__bars--reading'>Historic: {{round(point.fifty, 2)}}<span>{{units}}</span></p>
        <div v-if='point.y > 0 || point.fifty > 0' class='mobile-chart__bars--historic' v-bind:style='calcWidth.historic'></div>
      </div>
    </div>
  </div>
</template>
<script>
  // import array of months
  import monthNames from '../../../data/months';

  export default {
    props: [
      'units',
      'point',
      'overview'
    ],

    computed: {
      calcWidth() {
        let current = `width:${(this.point.y / this.point.max) * 100}%`;
        let historic = `width:${(this.point.fifty / this.point.max) * 100}%`;

        return {
          current,
          historic
        }
      }
    },

    methods: {
      parseMonth(num) {
        return monthNames[parseInt(num) - 1];
      },

      round(value, place) {
        return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
      }
    }
  }
</script>
