'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var logger = require('../../config/logger.js');

var TimelineSchema = new Schema({
  name: {type: String, required: true},
  operations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Operation', required: true}],
  description: String
});

// on exporte le modéle
module.exports = mongoose.model('Timeline', TimelineSchema);
