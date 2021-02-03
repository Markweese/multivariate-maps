const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const reportSchema = new Schema({
  stationNumber: {
    type: String
  },
  activity: [{
    type: String,
    enum: ['float', 'fish', ' both', 'other']
  }],
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
      enum: ['nymph', 'emerger', 'fly', 'terrestrial', 'streamer', 'stimulator']
    },
    size: Number,
    color: String,
    name: String
  }],
  waterCraft: {
    category: {
      type: String,
      enum: ['drift', 'raft', 'wwkayak', 'ifkayak', 'genkayak', 'canoe', 'motorized', 'other']
    },
    writein: String,
    make: String,
    model: String,
    length: String
  },
  putIn: [{
    type: Number
  }],
  takeOut: [{
    type: Number
  }],
  obstacles: [
    {
      obstacle: String,
      writein: String,
      coordinates: [{
        type: Number
      }]
    }
  ],
  numCaught: Number,
  fish: [{
    species: String,
    length: Number,
    weight: Number,
    writein: String
  }],
  comment: String,
  score: Number,
  views: Number,
  flags: [
    {
      violation: {
        type: String,
        enum: ['nudity', 'harassment', 'spam', 'inaccurate']
      },
      comment: String
    }
  ],
  images: [
    {
      type: String
    }
  ]
});

reportSchema.index({
  stationNumber: 'text',
  state: 'text'
});

module.exports = mongoose.model('Report', reportSchema);
