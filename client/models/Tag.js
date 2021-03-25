const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const tagSchema = new Schema({
  tag: String,
  instances: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Tag', tagSchema);
