'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var Company = require('../company/company.model');
var TransportType = require('../transportType/transportType.model');
var logger = require('../../config/logger');



var TransportComparatorSchema = new Schema({
  type: [{
    type: Schema.Types.ObjectId,
    ref: 'TransportType',
    required: true
  }],
  company:{
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: {unique: true}
  },
  ergo_rate: {type: Schema.Types.ObjectId, ref: 'Rate'},
  content_rate: {type: Schema.Types.ObjectId, ref: 'Rate'},
  comments : [{
      comment: {type: String},
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      rate: {type: Schema.Types.ObjectId, ref: 'Rate'}
    }]
});

var TransportComparator = mongoose.model('TransportComparator', TransportComparatorSchema);

TransportComparatorSchema.pre('save', function(next){
  var self = this;
  Rate.create({type:'Stars', raters:[], score: 0}, function(err, r1){
    if(err){
      logger.error('Could not create Rate');
      next(new Error('Impossible de créer le vote'));
    }
    self.ergo_rate = r1;
    Rate.create({type:'Stars', raters:[], score: 0}, function(err, r2){
      if(err){
        logger.error('Could not create Rate');
        next(new Error('Impossible de créer le vote'));
      }
      self.content_rate = r2;
      Company.find({_id:self.company}, function(err, result){
        if(err){
          next(err);
        }
        // on vérifie qu'il existe bien une compagnie qui à cet id
        if(result.length === 0){
          var error = new Error("La compagnie n'éxiste pas");
          next(error);
        }
        //logger.debug(JSON.parse(JSON.stringify(self)));
        TransportType.find({_id:{$in:self.type}}, function(err, resultTypes){
          if(err){
            logger.error(err);
            next(new Error(err));
          }else{
            if(resultTypes.length === self.type.length){
              next();
            }
            next(new Error(Math.abs(resultTypes.length - self.type.length)+" moyens de transports sont incorrects"));
          }
        });

      });
    });
  });
})

TransportComparatorSchema.post('remove', function(doc){
  Rate.remove({_id: {$in: [doc.content_rate, doc.ergo_rate] }}).exec();
});
module.exports = TransportComparator;
