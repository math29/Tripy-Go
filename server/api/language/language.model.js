'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LanguageSchema = new Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  note: {type: String}
  });



module.exports = mongoose.model('Language', LanguageSchema);
