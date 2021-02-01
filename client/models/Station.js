const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const stationSchema = new mongoose.Schema({
  //for indexing and searching by text filter.
  name: {
    type: String
  },
  //this forms the basis of all data binding to SNOTEL, reservoirs, and weather monitoring systems
  huc: {
    type: String
  },
  //allows state filtering on map
  state: {
    type: String
  },
  //enables access from front-end click id's
  stationNumber: {
    type: String
  },
  //georeferences the station on Google Map
  coordinates: [{
    type: Number
  }],
  //short term array to hold all readings for the current day
  cfsInstantaneous: [{
    reading: Number,
    date: String,
    time: String,
    errorCode: String
  }],
  //stores usgs cfs reading to make only one call every few hours to USGS
  //transfers server demand to our db
  // skips 60th and 40th
  cfs: [{
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
    errorCode: String,
    date: String
  }],
  temp: [{
    reading: Number,
    date: String
  }],
  conductance: [{
    reading: Number,
    date: String
  }],
  ph: [{
    reading: Number,
    date: String
  }],
  //historic daily data store
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
  }],
  //logs element interaction
  views: Number
});

  stationSchema.index({
    name: 'text',
    state: 'text'
  });

  module.exports = mongoose.model('Station', stationSchema);
