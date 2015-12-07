'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportSchema = new Schema({
  name: String,
  active: Boolean,
  departure: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  arrival: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  cost: Number,
  duration: {
    start_date: Date,
    end_date: Date
  },
  departure_time: Date,
  arrival_time: Date,
  travel: {
    type: Schema.Types.ObjectId,
    ref: 'Travel'
  },
  walking_time: { // Only for Intern Transports
    start_date: Date,
    end_date: Date
  },
  baggages: String, // Enum SMALL/MEDIUM/LARGE - Only for external Transports
  confort: Number, // 1->5 - Only for external Transports
  type: String
});

module.exports = mongoose.model('Transport', TransportSchema);