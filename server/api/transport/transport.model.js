'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TransportType'
  },
  distance: Number,
  departure: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  arrival: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  class: String,
  cost: Number,
  departure_time: Date,
});

module.exports = mongoose.model('Transport', TransportSchema);
