const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const reportSchema = new Schema({
  title: String,
  isPrivate: Boolean,
  startDate: Date,
  endDate: Date,
  photo: {
    data: Buffer,
    contentType: String,
    offsetX: Number,
    offsetY: Number
  },
  stationNumber: {
    type: String
  },
  activity: {
    type: String,
    enum: [null, 'float', 'fish', 'both', 'other']
  },
  activitywritein: String,
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
      enum: [null, 'nymph', 'emerger', 'dry', 'terrestrial', 'streamer', 'stimulator']
    },
    size: Number,
    color: String,
    name: String
  }],
  waterCraft: {
    category: {
      type: String,
      enum: [null, 'drift', 'raft', 'wwkayak', 'ifkayak', 'genkayak', 'canoe', 'motorized', 'other']
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
      name: String,
      obstacle: String,
      writein: String,
      description: String,
      coordinates: [{
        type: Number
      }],
      incidentOccurred: Boolean
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
  comments: [
    {
      type: String,
      date: Date,
      author: String,
      score: Number,
      comment: String,
      flagged: Boolean
    }
  ],
  votes: [
    {
      userId: String,
      vote: Number
    }
  ],
  views: Number,
  flags: [
    {
      violation: {
        type: String,
        enum: ['nudity', 'harassment', 'spam', 'inaccurate', 'other']
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
