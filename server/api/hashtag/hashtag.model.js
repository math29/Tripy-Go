'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HashtagSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  date_created: { type : Date, default: Date.now }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);