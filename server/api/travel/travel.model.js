'use strict';

var Loc = require('../location/location.model');
var Transport = require('../transport/transport.model');
var logger = require('../../config/logger.js');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TravelSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  date_created: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  budget: Number,
  nbTravellers: Number,
  date_departure: Date,
  date_return: Date,
  transports: [{
    type: Schema.Types.ObjectId,
    ref: 'Transport'
  }]
});

module.exports = mongoose.model('Travel', TravelSchema);
