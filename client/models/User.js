const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
    unique: true
  },
  origin: {type: String},
  stations: [String],
  sessionToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  photo: {
    data: Buffer,
    contentType: String,
    offsetX: Number,
    offsetY: Number
  },
  reports: [String],
  images: [String],
  notifications: [
    {
      notificationType: {
          type: String,
          enum: ['message', 'comment', 'tag', 'share', 'flag']
      },
      fromUser: String,
      reportId: String,
      commentId: String,
      seen: {
        type: Boolean,
        default: false
      }
    }
  ],
  activity: {
    type: String,
    enum: ['float', 'fish', 'both', 'other']
  },
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
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
