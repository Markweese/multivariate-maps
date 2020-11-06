const SvgUtils = {
  computed: {
    // parsedCurrent holds all of the points to be charted
    parsedCurrent() {
      let points;
      const re = /(?<=-)[0-9]*/g;

      if(this.filterRange){
        points = this.data[this.dataset].slice(this.data[this.dataset].length - this.filterRange, this.data[this.dataset].length);
      } else {
        points = this.data[this.dataset];
      }

      this.configureSpacing(points);

      // if return raw is true, don't return svg points
      return points.map((point, i) => {
        let parsedDate = point.date ? point.date.match(re) : null;
        let date = parsedDate ? `${parsedDate[0]}/${[parsedDate[1]]}` : `${point.month}/${point.year}`;

        if(this.dataset === 'cfsInstantaneous') {
          let historic = this.todaysHistoric;

          point.min = historic.zero,
          point.ten = historic.ten,
          point.twenty = historic.twenty,
          point.thirty = historic.thirty,
          point.fifty = historic.fifty,
          point.seventy = historic.seventy,
          point.eighty = historic.eighty,
          point.ninety = historic.ninety,
          point.max = historic.hundred
        }

        return {
          x: i == 0 ? 0 : ((i * this.pointSpacing)) - (this.circleRadius * 2),
          y: point.reading,
          barX: i * this.pointSpacing,
          rectX: i == 0 ? 0 : ((i * this.pointSpacing) - (this.pointSpacing / 2)) - (this.circleRadius * 2),
          min: point.min,
          ten: point.ten,
          twenty: point.twenty,
          thirty: point.thirty,
          fifty: point.fifty,
          seventy: point.seventy,
          eighty: point.eighty,
          ninety: point.ninety,
          max: point.max,
          time: point.time,
          month: point.month,
          date,
          year: point.year ? point.year : null
        };
      });
    },

    // svgSetup derives all SVG formatting for the chart
    svgSetup() {
      let yMax = this.currentMax;
      let xMax = yMax * 3;
      let pathStroke = yMax * .01;
      let axisStroke = yMax * .008;
      let circleRadius = yMax * .015;
      let viewBox = `0 0 ${xMax} ${yMax}`;
      let transform = `scale(1, -1) translate(${circleRadius}, -${yMax})`;

      return {
        yMax,
        xMax,
        viewBox,
        transform,
        pathStroke,
        axisStroke,
        circleRadius
      }
    },

    // returns the max y value of all points in the current dataset
    currentMax() {
      let arr = this.parsedCurrent.map((item) => {return item.max});
      let max = Math.max(...arr);

      return max;
    }
  },

  methods: {
    line(pointA, pointB) {
      const lengthX = pointB.x - pointA.x
      const lengthY = pointB.y - pointA.y
      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
      }
    },

    controlPoint(current, previous, next, reverse) {

      // When 'current' is the first or last point of the array
      // 'previous' or 'next' don't exist.
      // Replace with 'current'
      const smoothing = 0.2;
      const n = next || current;
      const p = previous || current

      // Properties of the opposed-line
      const o = this.line(p, n)

      // If is end-control-point, add PI to the angle to go backward
      const angle = o.angle + (reverse ? Math.PI : 0)
      const length = o.length * smoothing

      // The control point position is relative to the current point
      const x = current.x + Math.cos(angle) * length
      const y = current.y + Math.sin(angle) * length
      return [x, y]
    },

    bezierCommand(point, i, a) {

      // start control point
      const cps = this.controlPoint(a[i - 1], a[i - 2], point)

      // end control point
      const cpe = this.controlPoint(point, a[i - 1], a[i + 1], true)
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point.x},${point.y}`
    },

    svgPath(points, command) {
      // build the d attributes by looping over the points
      const d = points.reduce((accumulator, point, i, a) => i === 0
        ? `M ${point.x},${point.y}`
        : `${accumulator} ${command(point, i, a)}`
      , '')
      return d
    },

    // if a desired value needs to load, this will wait one second then try again
    configureSpacing(points) {

      if(points[0].max) {
        let max = this.getMax(points,'max');

        this.circleRadius = max * .015;
        this.pointSpacing = (max * 3) / (points.length - 1);
      } else {

        setTimeout(() => {
          let max = this.getMax(points, 'max');

          this.circleRadius = max * .015;
          this.pointSpacing = (max * 3) / (points.length - 1);
        }, 1000);
      }
    },

    xLabels(numLabels) {
      let length = Math.round(this.parsedCurrent.length / numLabels);

      let arr = this.parsedCurrent.filter((point,i) => {
        if(i===0 || i === this.parsedCurrent.length - 1 || i % length === 0) {
          return true;
        }
      });

      return arr.map((item) => {return item.time ? item.time : item.month ? item.month : item.date});
    },
  }
};

export {
  SvgUtils
}
