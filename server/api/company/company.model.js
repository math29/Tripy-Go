'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Comparator = require('../comparators/comparators.model');

/**
 * Modèle des types de transports (Velo, Voiture, pieds, ...)
 *
 **/
var CompanySchema = new Schema({
  name: {type: String, index: {unique: true}},
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
  img: String,
  url: String,
  standing: { type: String, default: 'Standart'}
});

CompanySchema.post('remove', function (doc) {
  Comparator.remove({company: doc._id}, function(err){return});
});

module.exports = mongoose.model('Company', CompanySchema);
