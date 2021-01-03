const ArrayUtils = {
  methods: {
    chunkArray(array, breakpoint) {
      let arrs = [];
      let currentArr = [];

      array.forEach((item, i) => {
        if(item[breakpoint]) {
          currentArr.push(item);

          if (i + 1 === array.length) {
            arrs.push(currentArr);
          }
        } else {
          if (currentArr.length) {
            arrs.push(currentArr);
          }

          currentArr = [];
        }
      });

      return arrs;
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
