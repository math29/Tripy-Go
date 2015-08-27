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
  }
});

module.exports = mongoose.model('Travel', TravelSchema);