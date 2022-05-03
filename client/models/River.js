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
})

const riverSchema = new mongoose.Schema({
  //for indexing and searching by text filter.
  name: {
    type: String
  },
  //lots of identical river names, this allows us to pare down the number of results
  states: [String],
  // hucs, because why not
  hucs: [String],
  //links to all stations, reports, orgs, observations, etc...
  gnisId: {
    type: String
  },
  // array of 2 point arrays - index 1 = start point, index 2 = end point
  segments: geoJsonLineString,
  //geojson for line geometry
  mainLine: geoJsonLineString
});

  riverSchema.index({
    name: 'text',
    gnisId: -1
  });

  module.exports = mongoose.model('River', riverSchema);
