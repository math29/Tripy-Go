'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RateSchema = new Schema({
  score: {type: Number, required: true},
  raters:[{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},action: Number}],
  type: {type: String, required: true}
});

module.exports = mongoose.model('Rate', RateSchema);
