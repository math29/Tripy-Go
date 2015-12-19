'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RateSchema = new Schema({
  score: Number,
  raters:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Rate', RateSchema);
