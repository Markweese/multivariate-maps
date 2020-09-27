const ArrayUtils = {
  methods: {
    chunkArray(array, breakpoint) {
      let bps = [];
      let arrs = [];

      array.forEach((item, i) => {
        if(!item[breakpoint]) {
          bps.push(i)
        }
      });

      // if there is no empty items, return the array unchanged
      if(!bps.length) {
        return [array];
      }

      // if the there are multiple fragments loop over them
      if(bps.length > 1) {
        bps.forEach((bp,i) => {
          if(i === 0) {
            arrs.push(array.slice(0, bp));
          } else if(i === bps.length - 1) {
            arrs.push(array.slice(bp + 1, array.length - 1));
          } else {
            arrs.push(array.slice(bps[i - 1] + 1, bp));
          }
        });

        // return multi-chunked array
        return arrs;

      } else if(bps.length === 1) {
        arrs.push(array.slice(0, bps[0]));
        arrs.push(array.slice(bps[0] + 1, array.length - 1));

        // return chunked array
        return arrs;
      }
    },

    getMax(arr, field) {
      let vals = arr.map(item => {
        return item[field];
      });

      return Math.max(...vals);
    },

    getLastReading(arr) {
      let reading = null;
      let reverseStep = 1;

      while(reverseStep <= (arr.length - 1)){
        if(arr[arr.length - reverseStep].reading && arr[arr.length - reverseStep].reading !== 0){
            reading = arr[arr.length - reverseStep].reading;
            reverseStep = arr.length
        }

        reverseStep++;
      }

      return reading;
    },

    trimArrayOnKV(arr, key, value, trimLength) {
      let newArr = null;

      let targetIndex = arr.findIndex(item => {
        return item[key] == value;
      });

      return targetIndex;
      // newArr = arr.slice(targetIndex);
      //
      // if(newArr.length < trimLength) {
      //   const getBefore = trimLength - newArr.length;
      //   const arrayToAppend = arr.slice((targetIndex - getBefore), targetIndex);
      //
      //   arrayToAppend.concat(newArr);
      // } else if(newArr.length > trimLength) {
      //   newArr.slice(0, (trimLength + 1));
      // }
      //
      // return newArr;
    }
  }
};

export {
  ArrayUtils
};
