'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
  message: {type: String, required: true},
  timestamp: {type: Date, required: true},
  level: {type: String},
  meta: {type: Object}
  },{ collection: 'log' });



module.exports = mongoose.model('Log', LogSchema);
