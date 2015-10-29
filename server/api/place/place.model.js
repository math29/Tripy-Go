'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  coords: {
  	longitude: Number,
  	latitude: Number
  }
});

module.exports = mongoose.model('Place', PlaceSchema);