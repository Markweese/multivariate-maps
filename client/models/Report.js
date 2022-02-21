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
  gnisId: String,
  segmentId: String,
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
      commentId: String,
      date: Date,
      author: String,
      authorId: String,
      replyTo: String,
      score: {
        type: Number,
        default: 0
      },
      comment: String,
      flags: [
        {
          flagger: String,
          violation: {
            type: String,
            enum: ['offensive', 'spam', 'inaccurate', 'needs moderator attention']
          },
          comment: String
        }
      ],
      votes: [
        {
          userId: String,
          vote: Number
        }
      ],
      hashTags: [
        {
          type: String
        }
      ],
      userTags: [
        {
          type: String
        }
      ]
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  votes: [
    {
      userId: String,
      vote: Number
    }
  ],
  views: Number,
  flags: [
    {
      flagger: String,
      violation: {
        type: String,
        enum: ['offensive', 'spam', 'inaccurate', 'unethical', 'needs moderator attention']
      },
      comment: String
    }
  ],
  images: [
    {
      data: Buffer,
      contentType: String,
      caption: String
    }
  ],
  userTags: [
    {
      type: String
    }
  ],
  hashTags: [
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
