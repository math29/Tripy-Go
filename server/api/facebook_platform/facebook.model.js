'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FacebookSchema = new Schema({
  uid:
    { type: String,
    index: { unique: true, dropDups: true}
    }
  });

module.exports = mongoose.model('Facebook', FacebookSchema);
