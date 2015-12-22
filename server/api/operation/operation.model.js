'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var logger = require('../../config/logger.js');

var OperationSchema = new Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  steps: [{id: {type: String, required: true}, step: {type: Number, required: true}}],
  content: {type: String, required: true},
  rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'}
});

// lorsque l'on supprime une opération, on supprime aussi le vote associé
OperationSchema.post('remove', function(doc){
  Rate.findByIdAndRemove(doc.rate, function(err, rate) {
    if(err) {
      logger.error('Could not delete rate', rate);
    }
  });
});

// on exporte le modéle
module.exports = mongoose.model('Operation', OperationSchema);
