const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const geoJsonLineString = new mongoose.Schema({
  type: {
    type: String,
    enum: ['FeatureCollection'],
  },
  features: [
    {
      type: {
        type: String,
        enum: ['Feature'],
        required: true
      },
      geometry: {
        type: {
          type: String,
          enum: ['LineString'],
          required: true
        },
        coordinates: {
          type: [[Number]],
          required: true
        }
      },
      properties: {
        name: {
          type: String
        },
        nhdplus_comid: {
          type: String
        }
      }
    }
  ]
});

const rapidSchema = new mongoose.Schema({
  name: {
    type: String
  },
  state: String,
  gnisId: {
    type: Number
  },
  // TODO:array of n point arrays - allowing people to draw their lines through rapid sections would be cool.
  runs: geoJsonLineString,
  coordinates: [{
    type: Number
  }],
});

  riverSchema.index({
    name: 'text',
    gnisId: -1
  });

  module.exports = mongoose.model('River', riverSchema);
