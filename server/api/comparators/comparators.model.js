'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Rate = require('../rate/rate.model');
var Company = require('../company/company.model');
var TransportType = require('../transportType/transportType.model');
var logger = require('../../config/logger');
var deepPopulate = require('mongoose-deep-populate')(mongoose);



var ComparatorSchema = new Schema({
  types: [{type: String}],
  company:{
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: {unique: true}
  },
  transport: {
    types: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TransportType',
      }
    ],
    nbCompanies: {type: Number, default: 1},
    ergo_rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'},
    content_rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'},
    comments : [{
        comment: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        rate: {type: mongoose.Schema.Types.ObjectId, ref: 'Rate'}
      }]
    }
});

ComparatorSchema.plugin(deepPopulate, {
  whitelist: [
    'company.picture'
  ]
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
        if(self.types[0] === 'transport') {
          self.transport.ergo_rate = r1;
          self.transport.content_rate = r2;
        }
        next();
  });
});

ComparatorSchema.post('remove', function(doc){
  Rate.remove({_id: {$in: [doc.content_rate, doc.ergo_rate] }}).exec();
});

module.exports = Comparator;
