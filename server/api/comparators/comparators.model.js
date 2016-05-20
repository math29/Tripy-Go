'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var Company = require('../company/company.model');
var TransportType = require('../transportType/transportType.model');
var logger = require('../../config/logger');



var ComparatorSchema = new Schema({
  types: [{type: String, required: true}],
  company:{
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: {unique: true}
  },
  transport: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'TransportType',
    }],
    nbCompanies: Number,
    ergo_rate: {type: Schema.Types.ObjectId, ref: 'Rate'},
    content_rate: {type: Schema.Types.ObjectId, ref: 'Rate'},
    comments : [{
        comment: {type: String},
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        rate: {type: Schema.Types.ObjectId, ref: 'Rate'}
      }]
    }
});

var Comparator = mongoose.model('Comparators', ComparatorSchema);

ComparatorSchema.pre('save', function(next){
  var self = this;
  Rate.create(
    {type:'Stars', raters:[], score: 0},
    {type:'Stars', raters:[], score: 0}
    , function(err, r1, r2){
        if(err){
          logger.error('Could not create Rate');
          next(new Error('Impossible de créer le vote'));
        }
        /* To check when add types */
        self[self.type[0]].ergo_rate = r1;
        self[self.type[0]].content_rate = r2;
        next();
  });
});

ComparatorSchema.post('remove', function(doc){
  Rate.remove({_id: {$in: [doc.content_rate, doc.ergo_rate] }}).exec();
});

module.exports = Comparator;
