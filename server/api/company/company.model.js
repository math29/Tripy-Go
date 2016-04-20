'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Modèle des types de transports (Velo, Voiture, pieds, ...)
 *
 **/
var CompanySchema = new Schema({
  name: {type: String, index: {unique: true}},
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
  img: String,
  url: String,
  standing: String
});

module.exports = mongoose.model('Company', CompanySchema);
