'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  },
  img: { data: Buffer, contentType: String },
  google_place_id: String
});

module.exports = mongoose.model('Location', LocationSchema);