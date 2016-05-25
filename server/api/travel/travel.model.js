'use strict';

var Loc = require('../location/location.model');
var Transport = require('../transport/transport.model');
var logger = require('../../config/logger.js');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

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

TravelSchema.plugin(deepPopulate,
{
  whitelist: [
    'transports.departure.country',
    'transports.arrival.country'
  ]
});

module.exports = mongoose.model('Travel', TravelSchema);
