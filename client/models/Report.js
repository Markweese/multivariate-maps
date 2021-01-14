const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const reportSchema = new Schema({
  stationNumber: {
    type: String
  },
  activity: {
    type: String,
    enum: ['float', 'fish', 'other']
  },
  conditions: {
    cfs: Number,
    temp: Number,
    conductance: Number,
    ph: Number
  },
  coordinates: [{
    type: Number
  }],
  river:String,
  author: {
    type: String,
    required: 'an author name must be set'
  },
  state: String,
  created:  Date,
  flys: [{
    method: {
      type: String,
      enum: ['nymph', 'emerger', 'fly', 'terrestrial', 'streamer']
    },
    size: Number,
    color: String,
    name: String
  }],
  waterCraft: {
    type: String,
    enum: ['drift', 'raft', 'kayak', 'motorized', 'sup']
  },
  creel: Number,
  fish: [{
    species: String,
    length: Number,
    weight: Number
  }],
  comment: String
});

reportSchema.index({
  stationNumber: 'text',
  state: 'text'
});

module.exports = mongoose.model('Report', reportSchema);
