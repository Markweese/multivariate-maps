<template>
  <div class='tooltip' v-bind:style='computeOffset'>
    <p class='tooltip__overview'><span class='tooltip__overview--reading'>{{active.y ? round(active.y, 2) : 'Iced'}}</span><span class='--unit'>{{active.y ? context : ''}}</span></p>
    <p v-if='previous' v-bind:class='comparePoint'>{{Math.abs(active.y - previous) > 0 ? Math.abs(round((active.y - previous), 2)) : 'no change'}}</p>
    <p v-if='active.time' class='tooltip__label'>{{active.time}}</p>
  </div>
</template>
<script>
  export default {
    props: [
      'context',
      'tracer',
      'active',
      'previous',
      'overview'
    ],

    computed: {
      computeOffset() {
        if(Number.isInteger(this.tracer)) {
          return `left:${this.tracer}px`;
        } else if (this.tracer == 'max') {
          return 'right:0';
        }
      },

      comparePoint() {
        let flag = '';
        let base = 'tooltip__diff';

        if(this.previous > this.active.y) {
           flag = ' --negative';
         } else if (this.previous < this.active.y) {
           flag = ' --positive';
         }

         return base + flag;
     }
   },

   methods: {
     round(value, place) {
       return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
     }
   }
 }
</script>
