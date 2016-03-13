'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Modèle des types de transports (Velo, Voiture, pieds, ...)
 *
 **/
var TransportTypeSchema = new Schema({
  name: {type: String, index: {unique: true}},
  img: String
});

module.exports = mongoose.model('TransportType', TransportTypeSchema);
