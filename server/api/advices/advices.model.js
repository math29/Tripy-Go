'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdvicesSchema = new Schema({
  url: {type: String},
  img: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  date_creation: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Advices', AdvicesSchema);
