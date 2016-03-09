'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RateSchema = new Schema({
  score: Number,
  raters:[{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},action: Number}]
});

module.exports = mongoose.model('Rate', RateSchema);
