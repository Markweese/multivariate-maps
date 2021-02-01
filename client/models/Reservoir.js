const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const reservoirSchema = new mongoose.Schema({
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
  resId: {
    type: Number
  },
  //georeferences the station on Google Map
  coordinates: [{
    type: Number
  }],
  //storage live reading holder
  storage: [{
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
    date: String
  }],
  //storage monthly reading holder
  storageMonthly: [{
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
    month: Number
  }],
  //historic daily storage and air temperature stats(need to decide on how much we want to flatten data)
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

reservoirSchema.index({
  huc: 'text'
});

module.exports = mongoose.model('Reservoir', reservoirSchema);
