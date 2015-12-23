'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var Timeline = require('../timeline/timeline.model');
var logger = require('../../config/logger.js');

var OperationSchema = new Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  steps: [{id: {type: String, required: true}, step: {type: Number, required: true}}],
  content: {type: String, required: true},
  rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'}
});


// crée le vote associé à l'opération
OperationSchema.pre('save', function(next){
  var rate = new Rate({score: 0, raters:[]});
  var self = this;
  rate.save(function(err, r){
    if(err){
      next(err);
    }
    console.log(r);
    self.rate = r._id;
    next();
  });
});

// lorsque l'on supprime une opération, on supprime aussi le vote associé
OperationSchema.post('remove', function(){
  // suppression du vote associé
  Rate.findByIdAndRemove(this.rate, function(err, rate) {
    if(err) {
      logger.error('Could not delete rate', rate);
    }
  });

  Timeline.update({},{$pull: {operations: {$in: [this._id]}}}, function(err, doc){
    if(err){
      logger.error('error while remove operations from timelines: ',err);
    }
  });
});

// on exporte le modéle
module.exports = mongoose.model('Operation', OperationSchema);
