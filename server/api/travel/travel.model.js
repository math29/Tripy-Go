'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TravelSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  date_created: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  budget: Number,
  nbTravellers: Number,
  date_departure: Date,
  date_return: Date,
  month_departure: Date,
  choose_by_dates: Boolean,
  choose_by_month: Boolean,
  region_idea: { type: String, default: "" }
});

module.exports = mongoose.model('Travel', TravelSchema);