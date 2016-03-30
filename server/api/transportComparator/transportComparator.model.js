'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransportComparatorSchema = new Schema({
  type: [{
    type: Schema.Types.ObjectId,
    ref: 'TransportType',
    required: true
  }],
  company:{
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
});

module.exports = mongoose.model('TransportComparator', TransportComparatorSchema);
