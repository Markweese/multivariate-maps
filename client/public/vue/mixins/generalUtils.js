// dependencies
import levels from '../../../data/levels';

const HistoricComparisons = {
  computed: {
    // returns qualitative analysis for each point
    activeOverview() {
      let sorter = [];
      var point = null;
      let reading = null;
      const fields = ['min', 'ten', 'twenty', 'thirty', 'fifty', 'seventy', 'eighty', 'ninety', 'max', 'y'];

      if (this.activePoint) {
        point = this.activePoint;
        reading = this.activePoint.y;
      } else {
        point = this.parsedCurrent[this.parsedCurrent.length - 1];
        reading = this.parsedCurrent[this.parsedCurrent.length - 1].y;
      }

      if(!isNaN(reading)) {
        for(let key in point){
          if(fields.includes(key)) {
              sorter.push(point[key]);
          }
        }

        sorter.sort((a,b) => {return a - b});

        let location = sorter.findIndex(item => item === reading);
        let shiftLocation = location > 4 ? location - 1 : location;

        // levels is an external JSON object that stores qualitative overviews
        return levels[shiftLocation];
      } else {

        return   {
            title: 'Undefined',
            percentile:'',
            description:'There was an issue with the station during this period',
            class: 'overview --normal'
          };
      }
    }
  },

  methods: {
    currentReadingPercentile(dataset) {
      let sorter = [];
      const point = dataset[dataset.length - 1];
      const fields = ['min', 'ten', 'twenty', 'thirty', 'fifty', 'seventy', 'eighty', 'ninety', 'max', 'reading'];

      if(point && point.reading) {
        for(let key in point){
          if(fields.includes(key)) {
              sorter.push({key, val: point[key]});
          }
        }

        sorter.sort((a,b) => {return a.val - b.val});

        let location = sorter.findIndex(item => item.key === 'reading');
        let shiftLocation = location > 4 ? location - 1 : location;

        // levels is an external JSON object that stores qualitative overviews
        return levels[shiftLocation];
      } else {
        return {color: '#888'};
      }
    },

    compareHistoric(data) {
      let lastStat = data[data.length-2] ? data[data.length-2].reading : null;
      let currentStat = data[data.length-1] ? data[data.length-1].reading : null;
      let currentDiff = lastStat && currentStat ? Math.round((currentStat - lastStat) * 10)/10 : null;

      if (!isNaN(currentDiff)) {
        if (currentDiff > 0) {
          return `↑ ${currentDiff}`;
        } else if (currentDiff == 0) {
          return 'no change';
        } else if (currentDiff < 0) {
          let signRemoved = currentDiff.toString().substr(1);
          return `↓ ${signRemoved}`;
        }
      }
    },

    historicComparisonClass(data) {
      let lastStat = data[data.length-2] ? data[data.length-2].reading : null;
      let currentStat = data[data.length-1] ? data[data.length-1].reading : null;

      if (lastStat && currentStat) {
        if(lastStat > currentStat) {
          return 'stats-summary__negative';
        } else if (lastStat < currentStat) {
          return 'stats-summary__positive';
        } else if (lastStat === currentStat) {
          return 'stats-summary__unchanged';
        }
      }
    },

    // gets the a points preceeding point, allows for change comparison
    getPreviousPoint(point) {
      let previous;

      this.parsedCurrent.forEach((parsed, i) => {

        if (parsed.x === point.x && i > 0) {
          previous = this.parsedCurrent[i - 1].y;
        }
      });

      return previous;
    }
  }
};

const TouchUtils = {
  methods: {
    activateRefs() {
      if(this.$refs.touchArea) {
        this.$refs.touchArea.forEach(touchArea => {
          touchArea.addEventListener('touchstart', this.touchEvent, {passive: true});
          touchArea.addEventListener('touchmove', this.touchEvent, {passive: true});
        });
      } else {
        setTimeout(() => {
          this.activateRefs();
        }, 1000);
      }
    },

    assignActivePoint() {
      this.activePoint = this.parsedCurrent[this.parsedCurrent.length - 1];
    },

    mouseLeave() {
      if(window.innerWidth < 725) {
        this.activePoint = this.activePoint;
      } else {
        this.activePoint = null;
      }
    },

    updateFilterDataset() {
      // rawCurrent passes raw filtered data to other child components for consumption
      let points;

      if(this.filterRange){
        points = this.data[this.dataset].slice(this.data[this.dataset].length - this.filterRange, this.data[this.dataset].length);
      } else {
        points = this.data[this.dataset];
      }

      this.filterDataset = points;
    }
  }
}

const MathUtils = {
  methods: {
    round(value, place) {
      return Math.round((value) * Math.pow(10, place))/Math.pow(10, place);
    }
  }
}

export {
  MathUtils,
  TouchUtils,
  HistoricComparisons
};
