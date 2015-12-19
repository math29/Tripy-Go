'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');

var OperationSchema = new Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  step: {type: String, required: true},
  content: {type: String, required: true},
  rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'}
});

OperationSchema.post('remove', function(doc){
  Rate.findByIdAndRemove(doc.rate, function(err, rate) {
    if(err) {
      logger.error('Could not delete rate', rate);
    }
  });
});

module.exports = mongoose.model('Operation', OperationSchema);
