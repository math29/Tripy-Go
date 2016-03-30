'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TransportType'
  },
  distance: {type: Number},
  departure: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  arrival: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  class: String,
  cost: Number,
  date_departure: {type: Date, required: true}
});

module.exports = mongoose.model('Transport', TransportSchema);
