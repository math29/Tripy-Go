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

// chaque nom de type de transport est unique
//TransportTypeSchema.index({ name: 1, unique: true }); // schema level

module.exports = mongoose.model('TransportType', TransportTypeSchema);
