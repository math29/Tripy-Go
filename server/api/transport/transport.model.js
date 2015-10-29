'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };

var TransportSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
},options);

module.exports = mongoose.model('Transport', TransportSchema);