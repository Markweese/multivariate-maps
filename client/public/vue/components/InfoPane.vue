<template>
  <div v-bind:class='{"infopane": true, "--left": position, "--right": !position}'>
    <div class='infopane--wrapper'>
      <h3 class='date-label'>
        {{active.time ? active.time : active.month ? parseMonth(active.month) : active.date}}<span class='date-label__year' v-if='active.year'> ({{active.year}})</span>
      </h3>
      <h3 v-if='active.y === null || active.y === undefined'>Issue with meter</h3>
      <h3 class='--ice' v-if='active.y == 0 && units == "CFS"'>Iced</h3>
      <div v-if='(active.y && active.y > 0) || (units !== "CFS" && !isNaN(active.y))' class='reading-wrapper'>
        <span class='reading' v-if='overview || units !== "CFS"'>Reading: {{round(active.y, 2)}} {{units}}</span>
        <span class='average' v-if='overview || units !== "CFS"'>Average: {{round(active.fifty, 2)}} {{units}}</span>
      </div>
      <div v-if='active.y && active.y > 0' class='overview-wrapper'>
        <span v-bind:class='overview.class' v-if='overview'>{{overview.title}}</span>
        <span class='overview' v-if='overview'>
          {{overview.description}}
        </span>
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
      'active',
      'position',
      'overview'
    ],

    methods: {
      round(value, place) {
        return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
      },

      parseMonth(num) {
        return monthNames[parseInt(num) - 1];
      }
    }
  }
</script>
