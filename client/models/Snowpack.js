const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const snowpackSchema = new mongoose.Schema({
  name: {
    type: String
  },
  //this forms the basis of all data binding to SNOTEL, reservoirs, and weather monitoring systems
  huc: {
    type: String
  },
  state: {
    type: String
  },
  //one more data point for analyzing temp and snowpack variations
  elevation: {
    type: Number
  },
  //for individual API calls
  stationNumber: {
    type: String
  },
  //georeferences the station on Google Map
  coordinates: [{
    type: Number
  }],
  //SWE(snow water equivalent) live reading holder
  swe: [{
    min: Number,
    ten: Number,
    twenty: Number,
    thirty: Number,
    fifty: Number,
    seventy: Number,
    eighty: Number,
    ninety: Number,
    max: Number,
    reading: Number,
    density: Number,
    date: String
  }],
  //SWE(snow water equivalent) live reading holder
  sweMonthly: [{
    min: Number,
    ten: Number,
    twenty: Number,
    thirty: Number,
    fifty: Number,
    seventy: Number,
    eighty: Number,
    ninety: Number,
    max: Number,
    reading: Number,
    month: Number,
    year: Number
  }],
  //air temperature live reading holder
  temp: [{
    reading: Number,
    date: String
  }],
  //historic daily SWE and air temperature stats(need to decide on how much we want to flatten data)
  historicDaily: [{
    day: String,
    zero: Number,
    ten: Number,
    twenty: Number,
    thirty: Number,
    fourty: Number,
    fifty: Number,
    sixety: Number,
    seventy: Number,
    eighty: Number,
    ninety: Number,
    hundred: Number,
  }]
});

snowpackSchema.index({
  huc: 'text'
});

module.exports = mongoose.model('Snowpack', snowpackSchema);
