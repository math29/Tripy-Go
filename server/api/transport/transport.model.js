'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportSchema = new Schema({
  name: String,
  active: Boolean,
  departure: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },
  arrival: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },
  cost: Number,
  duration: Date,
  departure_time: Date,
  arrival_time: Date,
  travel: {
    type: Schema.Types.ObjectId,
    ref: 'Travel'
  }
});

module.exports = mongoose.model('Transport', TransportSchema);