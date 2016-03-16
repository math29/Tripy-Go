'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var Timeline = require('../timeline/timeline.model');
var logger = require('../../config/logger.js');

var OperationSchema = new Schema({
  type: {type: String, required: true},
  title: {type: String, required: true},
  steps: [{id: {type: mongoose.Schema.Types.ObjectId, required: true}, step: {type: Number, required: true}}],
  content: {type: String, required: true},
  rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'}
});


// crée le vote associé à l'opération
OperationSchema.pre('save', function(next){
  var rate = new Rate({score: 0, raters:[], type:'Stack'});
  var self = this;
  rate.save(function(err, r){
    if(err){
      next(err);
    }
    self.rate = r._id;
    next();
  });
});

OperationSchema.post('save', function(){
  //si l'opération à des timelines associés
  if(this.steps.length > 0 ){
    var stepsIds = [];
    // on met tous les ids de timelines dans le tibleau
    for(var i = 0; i < this.steps.length; i++){
      stepsIds.push(this.steps[i].id);
    }
    Timeline.update({_id: {$in: stepsIds}, operations: {$nin: [this._id]}}, {$push: {operations: this._id}}, function(err){
      if(err){
        logger.error(err);
      }
    });

  }
});

// lorsque l'on supprime une opération, on supprime aussi le vote associé
OperationSchema.post('remove', function(){
  var operation = this;
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
    decreaseSteps(operation);
  });
});

// on exporte le modéle
module.exports = mongoose.model('Operation', OperationSchema);
var Operation = mongoose.model('Operation', OperationSchema);

function decreaseSteps(operation){
  for(var i = 0; i < operation.steps.length; i++){
    Operation.update({"steps.id":operation.steps[i].id, "steps.step": {$gt: operation.steps[i].step}},{$inc:{"steps.$.step":-1}},{multi: true}).exec();
  }
}
