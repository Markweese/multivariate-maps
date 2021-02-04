const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const reportSchema = new Schema({
  isPrivate: Boolean,
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
  authorId: String,
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
  putIn: {
    coordinates: [{
      type: Number
    }],
    name: String
},
  takeOut: {
    coordinates: [{
      type: Number
    }],
    name: String
  },
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
  comment: Buffer,
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
      data: Buffer,
      contentType: String
    }
  ]
});

reportSchema.index({
  stationNumber: 'text',
  state: 'text'
});

module.exports = mongoose.model('Report', reportSchema);
