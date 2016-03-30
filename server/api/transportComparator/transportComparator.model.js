'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Company = require('../company/company.model');
var TransportType = require('../transportType/transportType.model');


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
  }
});

var TransportComparator = mongoose.model('TransportComparator', TransportComparatorSchema);

TransportComparatorSchema.pre('save', function(next){
  var self = this;
  console.log(JSON.stringify(self));
  Company.find({_id:self.company}, function(err, result){
    if(err){
      next(err);
    }
    // on vérifie qu'il existe bien une compagnie qui à cet id
    if(result.length === 0){
      var error = new Error("La compagnie n'éxiste pas");
      next(error);
    }
    TransportType.find({_id:{$in:[self.type]}}, function(err, resultTypes){
      if(err){
        next(err);
      }
      if(resultTypes.length === self.type.length){
        next();
      }
      next(new Error(Math.abs(resultTypes.length - self.type.length)+" moyens de transports sont incorrects"));
    });

  });
})
module.exports = TransportComparator;
